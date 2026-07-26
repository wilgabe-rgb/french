"use client";

import { useMemo, useState } from "react";
import type { Correction, Item } from "@/lib/types";
import { PASS_THRESHOLD, similarity, speak } from "@/lib/speech";
import { Speaker } from "./Speaker";
import { SayBox } from "./SayBox";

type Verdict = {
  correct: boolean;
  fixed: string;
  why: string;
  category: string;
  said: string;
};

type Props = {
  items: Item[];
  title: string;
  subtitle?: string;
  /** called once per item with the outcome, for the weak-spot engine */
  onScore: (item: Item, correct: boolean, v?: Verdict) => void;
  onFinish: () => void;
  rate?: number;
  voiceURI?: string;
};

/**
 * Say the French for an English prompt. Local string comparison first — instant
 * and free — and only when that fails do we ask the model, because plenty of
 * correct answers don't match the model answer word for word.
 */
export function Drill({
  items,
  title,
  subtitle,
  onScore,
  onFinish,
  rate,
  voiceURI,
}: Props) {
  const [i, setI] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [checking, setChecking] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const item = items[i];
  const progress = useMemo(
    () => `${Math.min(i + 1, items.length)} / ${items.length}`,
    [i, items.length],
  );

  if (!item) return null;

  const commit = (v: Verdict) => {
    setVerdict(v);
    onScore(item, v.correct, v);
    if (v.correct) speak(item.fr, { rate, voiceURI });
  };

  const submit = async (said: string) => {
    if (similarity(said, item.fr) >= PASS_THRESHOLD) {
      commit({
        correct: true,
        fixed: item.fr,
        why: "",
        category: "none",
        said,
      });
      return;
    }

    setChecking(true);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ target: item.en, expected: item.fr, said }),
      });
      if (!res.ok) throw new Error("offline");
      const c = (await res.json()) as Correction;
      commit({
        correct: c.ok,
        fixed: c.ok ? said : c.fixed || item.fr,
        why: c.why,
        category: c.category || "vocabulary",
        said,
      });
    } catch {
      // no network / no key: fall back to the strict local comparison
      commit({
        correct: false,
        fixed: item.fr,
        why: "Not quite — compare it with the answer above.",
        category: "vocabulary",
        said,
      });
    } finally {
      setChecking(false);
    }
  };

  const next = () => {
    setVerdict(null);
    setRevealed(false);
    if (i + 1 >= items.length) onFinish();
    else setI(i + 1);
  };

  const skip = () => {
    setRevealed(true);
    onScore(item, false);
  };

  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <header className="flex items-baseline justify-between">
        <div>
          <h2 className="font-medium">{title}</h2>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        <span className="text-sm text-muted tabular-nums">{progress}</span>
      </header>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wide text-muted">
          Say this in French
        </p>
        <p className="mt-1 text-2xl leading-snug">{item.en}</p>
      </div>

      {!verdict && !revealed && (
        <div className="mt-6 space-y-3">
          <SayBox onSubmit={submit} disabled={checking} autoFocus />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={skip}
              className="text-sm text-muted underline underline-offset-4 hover:text-ink"
            >
              I don&apos;t know
            </button>
            {checking && <span className="text-sm text-muted">checking…</span>}
          </div>
        </div>
      )}

      {(verdict || revealed) && (
        <div className="mt-6 space-y-4">
          <div
            className={`rounded-xl px-4 py-3 ${
              verdict?.correct ? "bg-good-soft" : "bg-bad-soft"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                verdict?.correct ? "text-good" : "text-bad"
              }`}
            >
              {verdict?.correct ? "That works." : "Not quite."}
            </p>
            {verdict && !verdict.correct && verdict.why && (
              <p className="mt-1 text-sm text-muted">{verdict.why}</p>
            )}
          </div>

          <div className="flex items-start justify-between gap-3 rounded-xl border border-line p-4">
            <div className="min-w-0">
              <p className="fr text-xl">{item.fr}</p>
              <p className="say mt-1 text-accent">{item.say}</p>
              <p className="fr mt-3 text-sm">{item.ex}</p>
              <p className="text-xs text-muted">{item.exEn}</p>
            </div>
            <Speaker text={item.fr} rate={rate} voiceURI={voiceURI} slow />
          </div>

          <button
            type="button"
            onClick={next}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-bg transition hover:opacity-90"
          >
            {i + 1 >= items.length ? "Finish this block" : "Next"}
          </button>
        </div>
      )}
    </section>
  );
}
