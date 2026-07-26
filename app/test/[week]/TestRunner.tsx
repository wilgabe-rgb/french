"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { itemsUpTo } from "@/lib/curriculum";
import {
  recordMistake,
  recordTest,
  scoreItem,
  useProgress,
  weakCategories,
  weakItems,
} from "@/lib/progress";
import { speak } from "@/lib/speech";
import { SayBox } from "@/components/SayBox";
import { Speaker } from "@/components/Speaker";

type Question = {
  id: string;
  kind: "recall" | "speak" | "listen" | "fix";
  prompt: string;
  audio: string;
  expected: string;
  itemId: string;
};

type Grade = {
  results: {
    id: string;
    correct: boolean;
    fixed: string;
    why: string;
    category: string;
    itemId: string;
  }[];
  score: number;
  summary: string;
  weakCategories: string[];
  focus: string[];
};

type Phase = "intro" | "loading" | "asking" | "grading" | "result";

const KIND_LABEL: Record<Question["kind"], string> = {
  recall: "Say it in French",
  speak: "Respond out loud",
  listen: "Listen, then answer",
  fix: "Fix the mistake",
};

export function TestRunner({
  week,
  title,
  outcome,
  day,
}: {
  week: number;
  title: string;
  outcome: string;
  day: number;
}) {
  const { progress, update, ready } = useProgress();
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [i, setI] = useState(0);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [error, setError] = useState("");

  const rate = progress.settings.rate;
  const voiceURI = progress.settings.voiceURI;

  const begin = useCallback(async () => {
    setPhase("loading");
    setError("");
    try {
      const pool = itemsUpTo(day).map((it) => `${it.fr} — ${it.en}`);
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode: "generate",
          week,
          day,
          pool,
          weakItems: weakItems(progress, 12).map((it) => ({
            id: it.id,
            fr: it.fr,
            en: it.en,
          })),
          weakCategories: weakCategories(progress),
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Could not build the test.");
      }
      const data = (await res.json()) as { questions: Question[] };
      setQuestions(data.questions);
      setI(0);
      setPhase("asking");
      const first = data.questions[0];
      if (first?.kind === "listen" && first.audio) {
        setTimeout(() => speak(first.audio, { rate, voiceURI }), 350);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not build the test.");
      setPhase("intro");
    }
  }, [day, week, progress, rate, voiceURI]);

  const submitAnswer = (text: string) => {
    const q = questions[i];
    const next = { ...answers, [q.id]: text };
    setAnswers(next);

    if (i + 1 < questions.length) {
      const nq = questions[i + 1];
      setI(i + 1);
      if (nq.kind === "listen" && nq.audio) {
        setTimeout(() => speak(nq.audio, { rate, voiceURI }), 300);
      }
    } else {
      void submitTest(next);
    }
  };

  const submitTest = async (finalAnswers: Record<string, string>) => {
    setPhase("grading");
    setError("");
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode: "grade",
          week,
          answers: questions.map((q) => ({
            id: q.id,
            kind: q.kind,
            prompt: q.kind === "listen" ? `${q.prompt} (heard: ${q.audio})` : q.prompt,
            expected: q.expected,
            said: finalAnswers[q.id] ?? "",
            itemId: q.itemId,
          })),
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Could not mark the test.");
      }
      const g = (await res.json()) as Grade;
      setGrade(g);
      setPhase("result");

      // this is the bit that changes the plan: every wrong answer is written
      // back against its item, so it resurfaces in future warm-ups
      update((p) => {
        let next = p;
        for (const r of g.results) {
          if (r.itemId) next = scoreItem(next, r.itemId, r.correct);
          if (!r.correct) {
            const q = questions.find((x) => x.id === r.id);
            next = recordMistake(next, {
              at: Date.now(),
              itemId: r.itemId || undefined,
              said: finalAnswers[r.id] ?? "",
              fixed: r.fixed,
              why: r.why,
              category: r.category || "recall",
              source: "test",
            });
            void q;
          }
        }
        return recordTest(next, {
          week,
          at: Date.now(),
          score: g.score,
          weakItemIds: g.results.filter((r) => !r.correct && r.itemId).map((r) => r.itemId),
          weakCategories: g.weakCategories,
          summary: g.summary,
        });
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not mark the test.");
      setPhase("asking");
    }
  };

  const q = questions[i];

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:py-8">
      <nav className="text-sm">
        <Link href="/plan" className="-ml-1 px-1 py-2 text-muted hover:text-ink">
          ← All 90 days
        </Link>
      </nav>

      <header className="mt-3">
        <p className="text-sm text-muted">Week {week} check</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-muted">{outcome}</p>
      </header>

      {error && (
        <p className="mt-6 rounded-xl bg-bad-soft px-4 py-3 text-sm text-bad">
          {error}
        </p>
      )}

      {phase === "intro" && (
        <section className="mt-8 rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <h2 className="font-medium">Eight questions, spoken.</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            <li>· Four recall prompts — English in, French out.</li>
            <li>· Two situations you respond to out loud.</li>
            <li>· One listening question.</li>
            <li>· One sentence to correct.</li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            The questions are written around what you&apos;ve been getting wrong,
            and what you miss here goes back into next week&apos;s warm-ups.
          </p>
          <button
            type="button"
            onClick={begin}
            disabled={!ready}
            className="mt-6 h-13 w-full rounded-xl bg-accent px-4 text-sm font-medium text-bg transition hover:opacity-90"
          >
            Start the test
          </button>
        </section>
      )}

      {phase === "loading" && (
        <p className="mt-8 text-sm text-muted">
          Writing your test from your weak spots…
        </p>
      )}

      {phase === "asking" && q && (
        <section className="mt-8 rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <div className="flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-wide text-accent">
              {KIND_LABEL[q.kind]}
            </p>
            <span className="text-sm text-muted tabular-nums">
              {i + 1} / {questions.length}
            </span>
          </div>

          <p className="mt-3 text-lg leading-snug sm:text-xl">{q.prompt}</p>

          {q.kind === "listen" && q.audio && (
            <div className="mt-4 flex items-center gap-2">
              <Speaker
                text={q.audio}
                rate={rate}
                voiceURI={voiceURI}
                slow
                label="Play the French again"
              />
              <span className="text-sm text-muted">
                Play it again as many times as you need.
              </span>
            </div>
          )}

          <div className="mt-6">
            <SayBox onSubmit={submitAnswer} autoFocus />
          </div>

          <button
            type="button"
            onClick={() => submitAnswer("")}
            className="-ml-1 mt-3 px-1 py-2 text-sm text-muted underline underline-offset-4 hover:text-ink"
          >
            Skip — I don&apos;t know this one
          </button>
        </section>
      )}

      {phase === "grading" && (
        <p className="mt-8 text-sm text-muted">Marking…</p>
      )}

      {phase === "result" && grade && (
        <section className="mt-8 space-y-6">
          <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
            <p className="text-sm text-muted">Week {week} score</p>
            <p className="mt-1 text-5xl font-semibold tabular-nums">
              {grade.score}
              <span className="text-2xl text-muted">/100</span>
            </p>
            <p className="mt-4 text-sm">{grade.summary}</p>
          </div>

          {grade.focus.length > 0 && (
            <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
              <h2 className="font-medium">What changes next week</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {grade.focus.map((f, n) => (
                  <li key={n}>· {f}</li>
                ))}
              </ul>
              {grade.weakCategories.length > 0 && (
                <p className="mt-4 flex flex-wrap gap-1.5">
                  {grade.weakCategories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-bad-soft px-2.5 py-1 text-xs text-bad"
                    >
                      {c}
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
            <h2 className="font-medium">Question by question</h2>
            <ol className="mt-4 space-y-4">
              {grade.results.map((r, n) => {
                const question = questions.find((x) => x.id === r.id);
                return (
                  <li key={r.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 text-sm ${r.correct ? "text-good" : "text-bad"}`}
                        aria-hidden="true"
                      >
                        {r.correct ? "✓" : "✕"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-muted">
                          {n + 1}. {question?.prompt}
                        </p>
                        <p className="fr mt-1">
                          {answers[r.id] || (
                            <span className="font-sans text-sm text-muted">
                              (skipped)
                            </span>
                          )}
                        </p>
                        {!r.correct && (
                          <>
                            <p className="fr mt-1 text-good">{r.fixed}</p>
                            {r.why && (
                              <p className="mt-0.5 text-xs text-muted">{r.why}</p>
                            )}
                          </>
                        )}
                      </div>
                      {!r.correct && r.fixed && (
                        <Speaker text={r.fixed} rate={rate} voiceURI={voiceURI} />
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/day/${Math.min(90, day + 1)}`}
              className="grid h-13 flex-1 place-items-center rounded-xl bg-accent px-5 text-sm font-medium text-bg transition hover:opacity-90"
            >
              Carry on to day {Math.min(90, day + 1)}
            </Link>
            <Link
              href="/progress"
              className="grid h-13 flex-1 place-items-center rounded-xl border border-line px-5 text-sm transition hover:border-accent hover:text-accent"
            >
              See your weak spots
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
