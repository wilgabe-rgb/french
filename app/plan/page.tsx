"use client";

import Link from "next/link";
import { WEEKS, isTestDay } from "@/lib/curriculum";
import { scenarioById } from "@/lib/scenarios";
import { useProgress } from "@/lib/progress";

export default function PlanPage() {
  const { progress } = useProgress();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          The 90 days
        </h1>
        <p className="mt-2 text-muted">
          Thirteen weeks, each one ending in a spoken check. Every day is four
          blocks and twenty minutes.
        </p>
      </header>

      <div className="mt-8 space-y-8">
        {WEEKS.map((w) => (
          <section key={w.week}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-medium">
                <span className="text-muted">Week {w.week} · </span>
                {w.title}
              </h2>
              <Link
                href={`/test/${w.week}`}
                className="-mr-1 shrink-0 px-1 py-1.5 text-xs text-muted hover:text-accent"
              >
                test →
              </Link>
            </div>
            <p className="mt-1 text-sm text-muted">{w.outcome}</p>

            <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
              {w.days.map((d) => {
                const done = Boolean(progress.days[d.day]);
                const current = progress.currentDay === d.day;
                return (
                  <li key={d.day}>
                    <Link
                      href={`/day/${d.day}`}
                      className={`flex min-h-14 items-center gap-3 px-4 py-3 transition hover:bg-accent-soft active:bg-accent-soft ${
                        current ? "bg-accent-soft" : ""
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs tabular-nums ${
                          done
                            ? "bg-good-soft text-good"
                            : "border border-line text-muted"
                        }`}
                      >
                        {done ? "✓" : d.day}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {d.title}
                        </span>
                        <span className="block truncate text-xs text-muted">
                          {scenarioById(d.scenario).title}
                        </span>
                      </span>
                      {isTestDay(d.day) && (
                        <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] text-accent">
                          test
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
