"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Correction, Day, Item, Scenario } from "@/lib/types";
import {
  completeDay,
  recordMistake,
  scoreItem,
  useProgress,
  warmUpDeck,
  weakItems,
} from "@/lib/progress";
import { TOTAL_DAYS } from "@/lib/curriculum";
import { speak } from "@/lib/speech";
import { PhraseCard } from "@/components/PhraseCard";
import { Drill } from "@/components/Drill";
import { Roleplay } from "@/components/Roleplay";
import { Speaker } from "@/components/Speaker";

type Block = "warmup" | "learn" | "drill" | "roleplay" | "done";

const BLOCK_MINUTES: Record<Exclude<Block, "done">, number> = {
  warmup: 3,
  learn: 6,
  drill: 6,
  roleplay: 5,
};

export function DayRunner({
  day,
  scenario,
  isTestDay,
}: {
  day: Day;
  scenario: Scenario;
  isTestDay: boolean;
}) {
  const { progress, update, ready } = useProgress();
  const [block, setBlock] = useState<Block>("learn");
  const [seconds, setSeconds] = useState(0);
  const [visited, setVisited] = useState<string[]>([]);
  const startedAt = useRef(Date.now());

  const rate = progress.settings.rate;
  const voiceURI = progress.settings.voiceURI;

  // the warm-up deck is computed once, from what you were weak on before today
  const [warmup, setWarmup] = useState<Item[]>([]);
  useEffect(() => {
    if (!ready) return;
    const deck = warmUpDeck(progress, day.day, 8);
    setWarmup(deck);
    setBlock(deck.length ? "warmup" : "learn");
    // deliberately runs once per day page load, not on every progress change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, day.day]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const weak = useMemo(
    () => (ready ? weakItems(progress, 6).map((i) => `${i.fr} (${i.en})`) : []),
    [progress, ready],
  );

  const score = useCallback(
    (item: Item, correct: boolean, v?: { fixed: string; why: string; category: string; said: string }) => {
      update((p) => {
        let next = scoreItem(p, item.id, correct);
        if (!correct && v) {
          next = recordMistake(next, {
            at: Date.now(),
            itemId: item.id,
            said: v.said,
            fixed: v.fixed,
            why: v.why,
            category: v.category,
            source: "drill",
          });
        }
        return next;
      });
    },
    [update],
  );

  const onCorrection = useCallback(
    (c: Correction, said: string) => {
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
    },
    [update],
  );

  const advance = (from: Block, to: Block) => {
    setVisited((v) => (v.includes(from) ? v : [...v, from]));
    setBlock(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finish = useCallback(() => {
    update((p) =>
      completeDay(p, {
        day: day.day,
        completedAt: Date.now(),
        seconds: Math.round((Date.now() - startedAt.current) / 1000),
        blocksDone: [...visited, "roleplay"],
      }),
    );
    advance("roleplay", "done");
  }, [day.day, update, visited]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const over = seconds > 20 * 60;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-8">
      <nav className="flex items-center justify-between text-sm">
        <Link href="/plan" className="-ml-1 px-1 py-2 text-muted hover:text-ink">
          ← All 90 days
        </Link>
        <span
          className={`tabular-nums ${over ? "text-bad" : "text-muted"}`}
          aria-label="time in this session"
        >
          {mm}:{ss} / 20:00
        </span>
      </nav>

      <header className="mt-3">
        <p className="text-sm text-muted">
          Day {day.day} of {TOTAL_DAYS} · Week {day.week}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {day.title}
        </h1>
        <p className="mt-2 text-muted">{day.goal}</p>
      </header>

      <ol className="mt-6 flex gap-1.5" aria-label="today's blocks">
        {(["warmup", "learn", "drill", "roleplay"] as const).map((b) => {
          const skipped = b === "warmup" && !warmup.length;
          const active = block === b;
          const done = visited.includes(b) || block === "done";
          return (
            <li key={b} className="min-w-0 flex-1">
              <div
                className={`h-1.5 rounded-full ${
                  done ? "bg-good" : active ? "bg-accent" : "bg-line"
                } ${skipped ? "opacity-30" : ""}`}
              />
              {/* a quarter of a phone's width won't hold "roleplay · 5m" */}
              <p className="mt-1 truncate text-[11px] capitalize text-muted">
                {b}
                <span className="hidden sm:inline"> · {BLOCK_MINUTES[b]}m</span>
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 space-y-6 sm:mt-8">
        {block === "warmup" && (
          <Drill
            items={warmup}
            title="Warm-up: things you got wrong before"
            subtitle="Straight from your own mistakes. Say each one out loud."
            onScore={score}
            onFinish={() => advance("warmup", "learn")}
            rate={rate}
            voiceURI={voiceURI}
          />
        )}

        {block === "learn" && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-medium">Today&apos;s phrases</h2>
              <button
                type="button"
                onClick={() =>
                  speak(day.items.map((i) => i.fr).join(". "), {
                    rate,
                    voiceURI,
                  })
                }
                className="-mr-1 shrink-0 px-1 py-2 text-sm text-accent hover:opacity-80"
              >
                Play all
              </button>
            </div>
            <p className="text-sm text-muted">
              Say each one out loud twice before you move on. Copy the audio, not
              the spelling.
            </p>
            {day.items.map((item) => (
              <PhraseCard
                key={item.id}
                item={item}
                rate={rate}
                voiceURI={voiceURI}
              />
            ))}
            <button
              type="button"
              onClick={() => advance("learn", "drill")}
              className="h-13 w-full rounded-xl bg-accent px-4 text-sm font-medium text-bg transition hover:opacity-90"
            >
              I&apos;ve said them all — start the drill
            </button>
          </section>
        )}

        {block === "drill" && (
          <Drill
            items={day.items}
            title="Speaking drill"
            subtitle="English prompt, French out loud. No peeking."
            onScore={score}
            onFinish={() => advance("drill", "roleplay")}
            rate={rate}
            voiceURI={voiceURI}
          />
        )}

        {block === "roleplay" && (
          <section className="space-y-4">
            <div>
              <h2 className="font-medium">Live conversation</h2>
              <p className="text-sm text-muted">
                They speak, you answer. You get corrected as you go.
              </p>
            </div>
            <Roleplay
              scenario={scenario}
              day={day.day}
              brief={day.scenarioBrief}
              weakSpots={weak}
              onCorrection={onCorrection}
              rate={rate}
              voiceURI={voiceURI}
            />
            <button
              type="button"
              onClick={finish}
              className="h-13 w-full rounded-xl border border-line px-4 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              Finish day {day.day}
            </button>
          </section>
        )}

        {block === "done" && (
          <section className="rounded-2xl border border-line bg-panel p-5 text-center sm:p-6">
            <h2 className="text-xl font-semibold">Day {day.day} done.</h2>
            <p className="mt-2 text-sm text-muted">
              {mm}:{ss} today. Anything you got wrong will come back in a
              warm-up.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              {isTestDay && (
                <Link
                  href={`/test/${day.week}`}
                  className="grid h-12 place-items-center rounded-xl bg-accent px-5 text-sm font-medium text-bg transition hover:opacity-90"
                >
                  Take the week {day.week} test
                </Link>
              )}
              {day.day < TOTAL_DAYS && (
                <Link
                  href={`/day/${day.day + 1}`}
                  className="grid h-12 place-items-center rounded-xl border border-line px-5 text-sm transition hover:border-accent hover:text-accent"
                >
                  Day {day.day + 1} →
                </Link>
              )}
              <Link
                href="/"
                className="grid h-12 place-items-center rounded-xl border border-line px-5 text-sm transition hover:border-accent hover:text-accent"
              >
                Back to today
              </Link>
            </div>
          </section>
        )}
      </div>

      {block !== "done" && (
        <footer className="mt-8 rounded-2xl border border-line bg-panel p-4 sm:mt-10">
          <h3 className="text-sm font-medium">Today&apos;s scenario</h3>
          <p className="mt-1 text-sm text-muted">
            {scenario.title} — {scenario.setup}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            <Speaker text={scenario.title} rate={rate} voiceURI={voiceURI} />
            <span>You&apos;ll do this at the end of the session.</span>
          </div>
        </footer>
      )}
    </div>
  );
}
