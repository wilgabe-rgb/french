"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Correction, RoleplayResponse, Scenario, Turn } from "@/lib/types";
import { speak } from "@/lib/speech";
import { Speaker } from "./Speaker";
import { SayBox } from "./SayBox";

type Line = Turn & { correction?: Correction };

type Props = {
  scenario: Scenario;
  day: number;
  brief?: string;
  weakSpots?: string[];
  /** every correction is reported up so the weak-spot engine can log it */
  onCorrection?: (c: Correction, said: string) => void;
  onDone?: () => void;
  /** speak the partner's lines automatically — on by default */
  autoPlay?: boolean;
  rate?: number;
  voiceURI?: string;
};

export function Roleplay({
  scenario,
  day,
  brief,
  weakSpots,
  onCorrection,
  onDone,
  autoPlay = true,
  rate = 0.95,
  voiceURI,
}: Props) {
  const [lines, setLines] = useState<Line[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [hint, setHint] = useState("");
  const [error, setError] = useState("");
  const [showEnglish, setShowEnglish] = useState(false);
  const [started, setStarted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // scroll the transcript itself rather than scrollIntoView, which drags the
    // whole page around underneath you on a phone
    const box = endRef.current?.parentElement;
    box?.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [lines, busy]);

  const turn = useCallback(
    async (said: string, history: Line[]) => {
      setBusy(true);
      setError("");
      setHint("");
      try {
        const res = await fetch("/api/roleplay", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            scenarioId: scenario.id,
            day,
            brief,
            weakSpots,
            said,
            history: history.map(({ role, fr }) => ({ role, fr })),
          }),
        });

        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error ?? "Something went wrong.");
        }

        const data = (await res.json()) as RoleplayResponse;

        setLines((prev) => {
          const next = [...prev];
          // attach the correction to the learner's line we just sent
          if (said) {
            const i = next.findLastIndex((l) => l.role === "you");
            if (i >= 0) next[i] = { ...next[i], correction: data.correction };
          }
          next.push({ role: "partner", fr: data.reply, en: data.replyEn });
          return next;
        });

        if (said && onCorrection) onCorrection(data.correction, said);
        if (data.hint) setHint(data.hint);
        if (autoPlay) speak(data.reply, { rate, voiceURI });
        if (data.done) {
          setDone(true);
          onDone?.();
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        setBusy(false);
      }
    },
    [scenario.id, day, brief, weakSpots, onCorrection, onDone, autoPlay, rate, voiceURI],
  );

  const begin = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    if (scenario.opensWith === "partner") void turn("", []);
  }, [scenario.opensWith, turn]);

  const send = (said: string) => {
    const next: Line[] = [...lines, { role: "you", fr: said }];
    setLines(next);
    void turn(said, next);
  };

  const restart = () => {
    startedRef.current = false;
    setLines([]);
    setDone(false);
    setHint("");
    setError("");
    begin();
  };

  return (
    <div className="rounded-2xl border border-line bg-panel">
      <header className="flex items-start justify-between gap-3 border-b border-line p-4">
        <div className="min-w-0">
          <h3 className="font-medium">{scenario.title}</h3>
          <p className="mt-0.5 text-sm text-muted">{scenario.setup}</p>
          <p className="mt-2 text-xs text-muted">
            <span className="font-medium text-ink">Your goal: </span>
            {scenario.objective}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowEnglish((v) => !v)}
          aria-pressed={showEnglish}
          className="grid h-9 shrink-0 place-items-center rounded-lg border border-line px-2.5 text-xs text-muted transition hover:border-accent hover:text-accent"
        >
          <span className="sm:hidden">{showEnglish ? "FR only" : "English"}</span>
          <span className="hidden sm:inline">
            {showEnglish ? "Hide English" : "Show English"}
          </span>
        </button>
      </header>

      {!started ? (
        <div className="p-6 text-center">
          <p className="text-sm text-muted">
            {scenario.opensWith === "partner"
              ? "They'll speak first. Answer out loud, then send."
              : "You start. Open the conversation."}
          </p>
          <button
            type="button"
            onClick={begin}
            className="mt-4 h-12 w-full rounded-xl bg-accent px-5 text-sm font-medium text-bg transition hover:opacity-90 sm:w-auto"
          >
            Start the conversation
          </button>
        </div>
      ) : (
        <>
          <div className="max-h-[50vh] space-y-4 overflow-y-auto overscroll-contain p-4 sm:max-h-[26rem]">
            {lines.map((line, i) =>
              line.role === "partner" ? (
                // play and slow sit under the bubble, not beside it — side by
                // side they take a third of a phone's width off the French
                <div key={i} className="flex flex-col items-start gap-1.5">
                  <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-accent-soft px-4 py-3 sm:max-w-[85%]">
                    <p className="fr text-lg leading-snug">{line.fr}</p>
                    {showEnglish && line.en && (
                      <p className="mt-1 text-sm text-muted">{line.en}</p>
                    )}
                  </div>
                  <Speaker text={line.fr} rate={rate} voiceURI={voiceURI} slow />
                </div>
              ) : (
                <div key={i} className="flex flex-col items-end gap-1">
                  <div className="max-w-[90%] rounded-2xl rounded-tr-sm border border-line px-4 py-3 sm:max-w-[85%]">
                    <p className="fr text-lg leading-snug">{line.fr}</p>
                  </div>
                  {line.correction && !line.correction.ok && (
                    <div className="max-w-[85%] rounded-xl bg-bad-soft px-3 py-2 text-right">
                      <p className="fr text-sm text-bad">
                        {line.correction.fixed}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {line.correction.why}
                      </p>
                    </div>
                  )}
                  {line.correction?.ok && line.correction.better && (
                    <p className="max-w-[85%] text-right text-xs text-muted">
                      Even better:{" "}
                      <span className="fr text-ink">
                        {line.correction.better}
                      </span>
                    </p>
                  )}
                </div>
              ),
            )}

            {busy && (
              <p className="text-sm text-muted" role="status">
                …
              </p>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-line p-4">
            {error && <p className="mb-2 text-sm text-bad">{error}</p>}
            {hint && !done && (
              <p className="mb-2 text-xs text-muted">
                <span className="font-medium text-ink">Nudge: </span>
                {hint}
              </p>
            )}

            {done ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-good">
                  Done — you got what you came for.
                </p>
                <button
                  type="button"
                  onClick={restart}
                  className="h-11 shrink-0 rounded-xl border border-line px-4 text-sm text-muted transition hover:border-accent hover:text-accent"
                >
                  Run it again
                </button>
              </div>
            ) : (
              <SayBox onSubmit={send} disabled={busy} autoFocus />
            )}
          </div>
        </>
      )}
    </div>
  );
}
