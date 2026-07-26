"use client";

import { useMemo, useState } from "react";
import { SCENARIOS } from "@/lib/scenarios";
import { TOTAL_DAYS } from "@/lib/curriculum";
import { useProgress, recordMistake, weakItems } from "@/lib/progress";
import type { Correction, Scenario } from "@/lib/types";
import { Roleplay } from "@/components/Roleplay";

const LEVELS = [
  { level: 1 as const, label: "Short", hint: "One thing, one exchange." },
  { level: 2 as const, label: "Longer", hint: "With a complication." },
  { level: 3 as const, label: "Hard", hint: "They push back." },
];

export default function PracticePage() {
  const { progress, update, ready } = useProgress();
  const [active, setActive] = useState<Scenario | null>(null);

  const weak = useMemo(
    () => (ready ? weakItems(progress, 6).map((i) => `${i.fr} (${i.en})`) : []),
    [progress, ready],
  );

  const onCorrection = (c: Correction, said: string) => {
    if (c.ok) return;
    update((p) =>
      recordMistake(p, {
        at: Date.now(),
        said,
        fixed: c.fixed,
        why: c.why,
        category: c.category || "conversation",
        source: "roleplay",
      }),
    );
  };

  if (active) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        <button
          type="button"
          onClick={() => setActive(null)}
          className="text-sm text-muted hover:text-ink"
        >
          ← All scenarios
        </button>
        <div className="mt-6">
          <Roleplay
            key={active.id}
            scenario={active}
            day={Math.min(progress.currentDay, TOTAL_DAYS)}
            weakSpots={weak}
            onCorrection={onCorrection}
            rate={progress.settings.rate}
            voiceURI={progress.settings.voiceURI}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Talk to someone
        </h1>
        <p className="mt-2 text-muted">
          Real situations you&apos;ll hit living in France. They speak first,
          they wait for you, and they correct you as you go.
        </p>
      </header>

      <div className="mt-8 space-y-8">
        {LEVELS.map(({ level, label, hint }) => (
          <section key={level}>
            <h2 className="font-medium">
              {label} <span className="text-muted">· {hint}</span>
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {SCENARIOS.filter((s) => s.level === level).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(s)}
                    className="h-full w-full rounded-2xl border border-line bg-panel p-4 text-left transition hover:border-accent"
                  >
                    <p className="font-medium">{s.title}</p>
                    <p className="mt-1 text-sm text-muted">{s.setup}</p>
                    <p className="mt-2 text-xs text-muted">
                      <span className="text-ink">Goal: </span>
                      {s.objective}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
