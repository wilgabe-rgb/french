"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  DayRecord,
  Item,
  ItemStat,
  Mistake,
  Progress,
  TestResult,
} from "./types";
import { ALL_ITEMS, getItem, itemsUpTo } from "./curriculum";

/**
 * Progress is stored per account, not per browser.
 *
 * A single shared key would mean the second person to use a family laptop
 * inherits the first person's days and then syncs them into their own account.
 * Signed out, work goes to the "guest" slot; signing in switches to that
 * account's slot, so two learners on one device never see each other's state.
 */
const BASE = "parlons.progress.v1";
const ACTIVE = "parlons.active-account";
const GUEST = "guest";

const keyFor = (accountId: string) => `${BASE}:${accountId}`;

export function activeAccountId(): string {
  if (typeof window === "undefined") return GUEST;
  return window.localStorage.getItem(ACTIVE) || GUEST;
}

export const emptyProgress = (): Progress => ({
  version: 1,
  startedAt: Date.now(),
  currentDay: 1,
  days: {},
  stats: {},
  mistakes: [],
  tests: [],
  settings: { rate: 0.95, showEnglish: true },
});

export function loadProgress(accountId = activeAccountId()): Progress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    let raw = window.localStorage.getItem(keyFor(accountId));

    // One-time carry-over from before accounts existed, so the person who has
    // been practising on this device keeps their days.
    if (!raw && accountId === GUEST) {
      const legacy = window.localStorage.getItem(BASE);
      if (legacy) {
        window.localStorage.setItem(keyFor(GUEST), legacy);
        window.localStorage.removeItem(BASE);
        raw = legacy;
      }
    }

    if (!raw) return emptyProgress();
    return { ...emptyProgress(), ...(JSON.parse(raw) as Progress) };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: Progress, accountId = activeAccountId()) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(keyFor(accountId), JSON.stringify(p));
  window.dispatchEvent(new Event("parlons:progress"));
}

/**
 * Point the app at an account's slot. Pass null when signing out.
 *
 * Announcing only real changes is load-bearing, not an optimisation: anything
 * that re-reads the session in response to "parlons:account" would otherwise
 * set it again, announce again, and spin — with a network call each turn.
 */
export function setActiveAccount(accountId: string | null) {
  if (typeof window === "undefined") return;

  const current = window.localStorage.getItem(ACTIVE);
  const next = accountId ?? null;
  if (current === next) return;

  if (next) window.localStorage.setItem(ACTIVE, next);
  else window.localStorage.removeItem(ACTIVE);

  window.dispatchEvent(new Event("parlons:account"));
  window.dispatchEvent(new Event("parlons:progress"));
}

/** Whether this account has ever been used on this device. */
export function hasLocalProgress(accountId: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(keyFor(accountId)) !== null;
}

export function guestProgress(): Progress {
  return loadProgress(GUEST);
}

export function clearGuestProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(keyFor(GUEST));
}

export const GUEST_ID = GUEST;

/* ------------------------------------------------------------------ */
/* Spaced repetition — deliberately simple, five boxes                 */
/* ------------------------------------------------------------------ */

/** How long an item rests before it's due again, per box, in days. */
const BOX_DELAY_DAYS = [0, 1, 3, 7, 16, 35];

const DAY_MS = 86_400_000;

export function isDue(stat: ItemStat, now = Date.now()): boolean {
  if (stat.box >= BOX_DELAY_DAYS.length) return false;
  return now - stat.lastSeen >= BOX_DELAY_DAYS[stat.box] * DAY_MS;
}

function blankStat(itemId: string): ItemStat {
  return { itemId, seen: 0, correct: 0, wrong: 0, lastSeen: 0, box: 0 };
}

/** Record one attempt. Right answers promote a box, wrong ones reset to 0. */
export function scoreItem(
  p: Progress,
  itemId: string,
  correct: boolean,
): Progress {
  const prev = p.stats[itemId] ?? blankStat(itemId);
  const next: ItemStat = {
    ...prev,
    seen: prev.seen + 1,
    correct: prev.correct + (correct ? 1 : 0),
    wrong: prev.wrong + (correct ? 0 : 1),
    lastSeen: Date.now(),
    box: correct ? Math.min(5, prev.box + 1) : 0,
  };
  return { ...p, stats: { ...p.stats, [itemId]: next } };
}

/**
 * The warm-up deck for a given day: everything you've got wrong before,
 * hardest first, topped up with anything due for review.
 * This is what makes the plan adjust to you rather than to a calendar.
 */
export function warmUpDeck(p: Progress, dayNumber: number, size = 8): Item[] {
  const pool = itemsUpTo(dayNumber - 1);
  if (!pool.length) return [];

  const scored = pool.map((item) => {
    const s = p.stats[item.id];
    if (!s) return { item, priority: 1, due: true };

    const failRate = s.seen ? s.wrong / s.seen : 0;
    const due = isDue(s);
    // never-right items float to the top, then high fail rate, then due items
    const priority =
      (s.correct === 0 && s.seen > 0 ? 4 : 0) +
      failRate * 3 +
      (due ? 1 : 0) +
      (s.box === 0 ? 1 : 0);

    return { item, priority, due };
  });

  return scored
    .filter((x) => x.priority > 0)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, size)
    .map((x) => x.item);
}

/** Items you are currently worst at, used to brief the AI examiner. */
export function weakItems(p: Progress, limit = 12): Item[] {
  return Object.values(p.stats)
    .filter((s) => s.wrong > 0)
    .sort((a, b) => b.wrong / (b.seen || 1) - a.wrong / (a.seen || 1))
    .slice(0, limit)
    .map((s) => getItem(s.itemId))
    .filter((i): i is Item => Boolean(i));
}

/** Recurring error themes across everything you've said, most common first. */
export function weakCategories(p: Progress, limit = 5): string[] {
  const counts = new Map<string, number>();
  for (const m of p.mistakes) {
    if (!m.category) continue;
    counts.set(m.category, (counts.get(m.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([c]) => c);
}

export function recordMistake(p: Progress, m: Mistake): Progress {
  // keep the log bounded; the categories are what matter long term
  const mistakes = [m, ...p.mistakes].slice(0, 300);
  return { ...p, mistakes };
}

export function completeDay(p: Progress, rec: DayRecord): Progress {
  return {
    ...p,
    days: { ...p.days, [rec.day]: rec },
    currentDay: Math.max(p.currentDay, Math.min(90, rec.day + 1)),
  };
}

export function recordTest(p: Progress, t: TestResult): Progress {
  return { ...p, tests: [...p.tests.filter((x) => x.week !== t.week), t] };
}

/* ------------------------------------------------------------------ */
/* Stats for the dashboard                                             */
/* ------------------------------------------------------------------ */

export function summary(p: Progress) {
  const stats = Object.values(p.stats);
  const known = stats.filter((s) => s.box >= 3).length;
  const learning = stats.filter((s) => s.box > 0 && s.box < 3).length;
  const shaky = stats.filter((s) => s.seen > 0 && s.box === 0).length;
  const daysDone = Object.keys(p.days).length;
  const minutes = Math.round(
    Object.values(p.days).reduce((n, d) => n + d.seconds, 0) / 60,
  );
  return {
    known,
    learning,
    shaky,
    daysDone,
    minutes,
    total: ALL_ITEMS.length,
    lastTest: p.tests[p.tests.length - 1],
  };
}

/* ------------------------------------------------------------------ */
/* React binding                                                       */
/* ------------------------------------------------------------------ */

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
    // "parlons:account" fires when the signed-in learner changes, so every
    // screen re-reads from that account's slot instead of showing the last
    // person's day.
    const sync = () => setProgress(loadProgress());
    window.addEventListener("parlons:progress", sync);
    window.addEventListener("parlons:account", sync);
    return () => {
      window.removeEventListener("parlons:progress", sync);
      window.removeEventListener("parlons:account", sync);
    };
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev);
      // resolve the slot at write time: a switch mid-session must not write
      // one learner's answer into another's history
      saveProgress(next, activeAccountId());
      return next;
    });
  }, []);

  return { progress, update, ready };
}
