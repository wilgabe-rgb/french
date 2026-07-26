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

export const micAvailable = () => getRecognitionCtor() !== null;

/**
 * Push-to-talk French dictation. Falls back silently when the browser has no
 * SpeechRecognition (Firefox, most of Safari) — the UI offers typing instead.
 */
export function useMic(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const cbRef = useRef(onResult);
  cbRef.current = onResult;

  const stop = useCallback(() => {
    recRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setError("unsupported");
      return;
    }
    setError(null);

    const rec = new Ctor();
    rec.lang = "fr-FR";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e: unknown) => {
      const ev = e as {
        results: ArrayLike<ArrayLike<{ transcript: string }>>;
      };
      const text = ev.results?.[0]?.[0]?.transcript ?? "";
      if (text) cbRef.current(text);
    };
    rec.onerror = (e: unknown) => {
      const ev = e as { error?: string };
      if (ev.error !== "aborted") setError(ev.error ?? "error");
      setListening(false);
    };
    rec.onend = () => setListening(false);

    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, []);

  useEffect(() => () => recRef.current?.abort(), []);

  return { listening, start, stop, error, supported: micAvailable() };
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
