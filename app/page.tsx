"use client";

import Link from "next/link";
import { DAYS, TOTAL_DAYS, getDay, isTestDay } from "@/lib/curriculum";
import { scenarioById } from "@/lib/scenarios";
import { summary, useProgress, warmUpDeck } from "@/lib/progress";

export default function Home() {
  const { progress, ready } = useProgress();
  const dayNumber = Math.min(progress.currentDay, TOTAL_DAYS);
  const day = getDay(dayNumber) ?? DAYS[0];
  const scenario = scenarioById(day.scenario);
  const s = summary(progress);
  const warmup = ready ? warmUpDeck(progress, dayNumber, 8).length : 0;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <section>
        <p className="text-sm text-muted">
          {s.daysDone === 0
            ? "Start here"
            : `Day ${dayNumber} of ${TOTAL_DAYS} · ${s.daysDone} done`}
        </p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight">
          {day.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{day.goal}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/day/${dayNumber}`}
            className="rounded-xl bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:opacity-90"
          >
            Start today — 20 minutes
          </Link>
          <Link
            href="/practice"
            className="rounded-xl border border-line px-6 py-3 text-sm transition hover:border-accent hover:text-accent"
          >
            Just talk to someone
          </Link>
        </div>

        {isTestDay(dayNumber) && (
          <p className="mt-4 text-sm text-accent">
            Test day — you&apos;ll be checked on everything so far at the end.
          </p>
        )}
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-3">
        <Stat
          label="Solid"
          value={s.known}
          hint="phrases you keep getting right"
        />
        <Stat label="Shaky" value={s.shaky} hint="coming back in a warm-up" />
        <Stat label="Minutes" value={s.minutes} hint="spent speaking so far" />
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-panel p-5">
        <h2 className="font-medium">What today looks like</h2>
        <ol className="mt-4 space-y-3 text-sm">
          <Step
            n={1}
            m={3}
            title="Warm-up"
            body={
              warmup
                ? `${warmup} phrases you've got wrong before, back for another go.`
                : "Skipped today — nothing outstanding yet."
            }
            dim={!warmup}
          />
          <Step
            n={2}
            m={6}
            title="Today's phrases"
            body={`${day.items.length} new ones, each with audio, a pronunciation respelling and one real example.`}
          />
          <Step
            n={3}
            m={6}
            title="Speaking drill"
            body="English prompt, you say the French out loud. Marked as you go."
          />
          <Step
            n={4}
            m={5}
            title="Live conversation"
            body={`${scenario.title} — ${scenario.objective}`}
          />
        </ol>
      </section>

      {s.lastTest && (
        <section className="mt-6 rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="font-medium">Last check — week {s.lastTest.week}</h2>
            <span className="text-2xl font-semibold tabular-nums">
              {s.lastTest.score}
              <span className="text-sm text-muted">/100</span>
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{s.lastTest.summary}</p>
        </section>
      )}

      <section className="mt-6 text-sm text-muted">
        <p>
          Twenty minutes, every day, mostly out loud.{" "}
          <Link href="/plan" className="text-accent hover:opacity-80">
            See the whole 90-day plan
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-4">
      <p className="text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-sm font-medium">{label}</p>
      <p className="text-xs text-muted">{hint}</p>
    </div>
  );
}

function Step({
  n,
  m,
  title,
  body,
  dim,
}: {
  n: number;
  m: number;
  title: string;
  body: string;
  dim?: boolean;
}) {
  return (
    <li className={`flex gap-3 ${dim ? "opacity-50" : ""}`}>
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-medium text-accent">
        {n}
      </span>
      <div className="min-w-0">
        <p className="font-medium">
          {title} <span className="text-muted">· {m} min</span>
        </p>
        <p className="text-muted">{body}</p>
      </div>
    </li>
  );
}
