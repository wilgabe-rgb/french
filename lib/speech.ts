"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Text to speech — French audio for every phrase                      */
/* ------------------------------------------------------------------ */

let cachedVoices: SpeechSynthesisVoice[] = [];

function frenchVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  if (!cachedVoices.length) cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices.filter((v) => v.lang.toLowerCase().startsWith("fr"));
}

export function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      setVoices(frenchVoices());
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  return voices;
}

export type SpeakOptions = { rate?: number; voiceURI?: string };

export function speak(text: string, opts: SpeakOptions = {}) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  u.rate = opts.rate ?? 0.95;

  const available = frenchVoices();
  const chosen =
    available.find((v) => v.voiceURI === opts.voiceURI) ?? available[0];
  if (chosen) u.voice = chosen;

  window.speechSynthesis.speak(u);
}

export const speechAvailable = () =>
  typeof window !== "undefined" && !!window.speechSynthesis;

/* ------------------------------------------------------------------ */
/* Speech to text — so the drills are actually spoken, not typed       */
/* ------------------------------------------------------------------ */

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: unknown) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ??
    w.webkitSpeechRecognition ??
    null) as (new () => SpeechRecognitionLike) | null;
}

/** Chrome and Edge transcribe on-device: instant and free. */
export const nativeMicAvailable = () => getRecognitionCtor() !== null;

/** Everyone else records audio and we send it to Grok to transcribe. */
export const recorderMicAvailable = () =>
  typeof window !== "undefined" &&
  typeof MediaRecorder !== "undefined" &&
  !!navigator.mediaDevices?.getUserMedia;

export const micAvailable = () =>
  nativeMicAvailable() || recorderMicAvailable();

/** Ordered by preference — the first one the browser can actually produce wins. */
const RECORDING_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

function pickRecordingType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return RECORDING_TYPES.find((t) => MediaRecorder.isTypeSupported?.(t));
}

/**
 * Push-to-talk French dictation, on every browser.
 *
 * Chrome and Edge use the on-device Web Speech API — no network round trip and
 * no cost. Firefox, Safari and most mobile browsers have no such API, so there
 * we record with MediaRecorder and post the audio to /api/transcribe. Same
 * interface either way; `transcribing` is only ever true on the fallback path.
 */
export function useMic(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const cbRef = useRef(onResult);
  cbRef.current = onResult;

  const releaseStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const stop = useCallback(() => {
    if (recRef.current) recRef.current.stop();
    if (mediaRef.current && mediaRef.current.state === "recording") {
      mediaRef.current.stop();
    }
    setListening(false);
  }, []);

  /* ---- path A: on-device recognition (Chrome, Edge) ---- */
  const startNative = useCallback((Ctor: new () => SpeechRecognitionLike) => {
    const rec = new Ctor();
    rec.lang = "fr-FR";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e: unknown) => {
      const ev = e as { results: ArrayLike<ArrayLike<{ transcript: string }>> };
      const text = ev.results?.[0]?.[0]?.transcript ?? "";
      if (text) cbRef.current(text);
    };
    rec.onerror = (e: unknown) => {
      const ev = e as { error?: string };
      if (ev.error !== "aborted") setError(ev.error ?? "error");
      setListening(false);
    };
    rec.onend = () => {
      recRef.current = null;
      setListening(false);
    };

    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, []);

  /* ---- path B: record and transcribe server-side (everyone else) ---- */
  const startRecorder = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = pickRecordingType();
      const rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];

      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      rec.onstop = async () => {
        releaseStream();
        const blob = new Blob(chunksRef.current, {
          type: rec.mimeType || "audio/webm",
        });
        chunksRef.current = [];
        // a tap rather than a hold — nothing worth sending
        if (blob.size < 1200) return;

        setTranscribing(true);
        try {
          const res = await fetch("/api/transcribe", {
            method: "POST",
            headers: { "content-type": blob.type },
            body: blob,
          });
          const data = (await res.json()) as { text?: string; error?: string };
          if (!res.ok) throw new Error(data.error ?? "Could not transcribe.");
          if (data.text) cbRef.current(data.text);
          else setError("Didn't catch that — try again, a little louder.");
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "Could not transcribe that.",
          );
        } finally {
          setTranscribing(false);
        }
      };

      mediaRef.current = rec;
      rec.start();
      setListening(true);
    } catch {
      releaseStream();
      setError("no-mic-permission");
      setListening(false);
    }
  }, [releaseStream]);

  const start = useCallback(() => {
    setError(null);
    const Ctor = getRecognitionCtor();
    if (Ctor) {
      startNative(Ctor);
      return;
    }
    if (recorderMicAvailable()) {
      void startRecorder();
      return;
    }
    setError("unsupported");
  }, [startNative, startRecorder]);

  useEffect(
    () => () => {
      recRef.current?.abort();
      if (mediaRef.current?.state === "recording") mediaRef.current.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    },
    [],
  );

  return {
    listening,
    transcribing,
    start,
    stop,
    error,
    supported: micAvailable(),
  };
}

/* ------------------------------------------------------------------ */
/* Comparing what you said to what you should have said                */
/* ------------------------------------------------------------------ */

/** Strip accents, punctuation and case so "Ça va !" matches "ca va". */
export function normalise(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * 0..1 similarity. Speech recognition drops accents and mangles liaisons, so
 * anything above ~0.82 is treated as "you said it right".
 */
export function similarity(said: string, target: string): number {
  const a = normalise(said);
  const b = normalise(target);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const d = levenshtein(a, b);
  return 1 - d / Math.max(a.length, b.length);
}

export const PASS_THRESHOLD = 0.82;
