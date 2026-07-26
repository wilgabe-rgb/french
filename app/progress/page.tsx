"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getItem } from "@/lib/curriculum";
import {
  emptyProgress,
  saveProgress,
  summary,
  useProgress,
  weakCategories,
  weakItems,
} from "@/lib/progress";
import { useVoices } from "@/lib/speech";
import { Speaker } from "@/components/Speaker";
import { AccountBar } from "@/components/AccountBar";

export default function ProgressPage() {
  const { progress, update, ready } = useProgress();
  const voices = useVoices();
  const s = summary(progress);

  const weak = useMemo(
    () => (ready ? weakItems(progress, 15) : []),
    [progress, ready],
  );
  const categories = useMemo(
    () => (ready ? weakCategories(progress, 6) : []),
    [progress, ready],
  );
  const recent = progress.mistakes.slice(0, 12);

  const reset = () => {
    if (!window.confirm("Delete all progress and start again from day 1?")) return;
    saveProgress(emptyProgress());
    window.location.reload();
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Where you actually are
        </h1>
        <p className="mt-2 text-muted">
          Not a streak. What you can say, what you can&apos;t, and what the plan
          is doing about it.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-4">
        <Stat value={s.daysDone} label="days done" />
        <Stat value={s.known} label="solid" />
        <Stat value={s.learning} label="getting there" />
        <Stat value={s.shaky} label="shaky" />
      </section>

      {categories.length > 0 && (
        <section className="mt-8 rounded-2xl border border-line bg-panel p-5">
          <h2 className="font-medium">Your recurring mistakes</h2>
          <p className="mt-1 text-sm text-muted">
            Patterns across your drills, conversations and tests.
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <li
                key={c}
                className="rounded-full bg-bad-soft px-3 py-1 text-sm text-bad"
              >
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {weak.length > 0 && (
        <section className="mt-6 rounded-2xl border border-line bg-panel p-5">
          <h2 className="font-medium">Coming back in your warm-ups</h2>
          <ul className="mt-3 divide-y divide-line">
            {weak.map((item) => {
              const st = progress.stats[item.id];
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="fr truncate">{item.fr}</p>
                    <p className="truncate text-sm text-muted">{item.en}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-xs text-muted tabular-nums">
                      {st ? `${st.correct}/${st.seen}` : ""}
                    </span>
                    <Speaker
                      text={item.fr}
                      rate={progress.settings.rate}
                      voiceURI={progress.settings.voiceURI}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {recent.length > 0 && (
        <section className="mt-6 rounded-2xl border border-line bg-panel p-5">
          <h2 className="font-medium">Recent corrections</h2>
          <ul className="mt-3 space-y-3">
            {recent.map((m, i) => (
              <li key={i} className="border-b border-line pb-3 last:border-0 last:pb-0">
                <p className="fr text-sm text-bad line-through decoration-bad/40">
                  {m.said}
                </p>
                <p className="fr text-good">{m.fixed}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {m.why}
                  {m.itemId && getItem(m.itemId) ? ` · ${getItem(m.itemId)!.en}` : ""}
                  {m.category ? ` · ${m.category}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {progress.tests.length > 0 && (
        <section className="mt-6 rounded-2xl border border-line bg-panel p-5">
          <h2 className="font-medium">Weekly checks</h2>
          <ul className="mt-3 space-y-3">
            {progress.tests
              .slice()
              .sort((a, b) => a.week - b.week)
              .map((t) => (
                <li key={t.week} className="flex gap-3">
                  <span className="w-16 shrink-0 text-sm text-muted">
                    Week {t.week}
                  </span>
                  <span className="w-12 shrink-0 font-medium tabular-nums">
                    {t.score}
                  </span>
                  <span className="text-sm text-muted">{t.summary}</span>
                </li>
              ))}
          </ul>
        </section>
      )}

      <div className="mt-6">
        <AccountBar />
      </div>

      <section className="mt-6 rounded-2xl border border-line bg-panel p-5">
        <h2 className="font-medium">Audio</h2>
        <label className="mt-4 block text-sm">
          Speed
          <input
            type="range"
            min={0.5}
            max={1.2}
            step={0.05}
            value={progress.settings.rate}
            onChange={(e) =>
              update((p) => ({
                ...p,
                settings: { ...p.settings, rate: Number(e.target.value) },
              }))
            }
            className="mt-2 block w-full accent-[var(--accent)]"
          />
          <span className="text-xs text-muted tabular-nums">
            {progress.settings.rate.toFixed(2)}×
          </span>
        </label>

        {voices.length > 0 && (
          <label className="mt-4 block text-sm">
            French voice
            <select
              value={progress.settings.voiceURI ?? voices[0]?.voiceURI ?? ""}
              onChange={(e) =>
                update((p) => ({
                  ...p,
                  settings: { ...p.settings, voiceURI: e.target.value },
                }))
              }
              className="mt-2 block w-full rounded-xl border border-line bg-bg px-3 py-2"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="mt-4 flex items-center gap-2">
          <Speaker
            text="Bonjour, je voudrais un café s'il vous plaît."
            rate={progress.settings.rate}
            voiceURI={progress.settings.voiceURI}
          />
          <span className="text-sm text-muted">Test the voice</span>
        </div>
      </section>

      <section className="mt-6 flex items-center justify-between gap-3 text-sm">
        <Link href="/" className="text-accent hover:opacity-80">
          ← Back to today
        </Link>
        <button
          type="button"
          onClick={reset}
          className="text-muted underline underline-offset-4 hover:text-bad"
        >
          Reset all progress
        </button>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-4">
      <p className="text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
