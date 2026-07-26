"use client";

import type { DayRecord, ItemStat, Mistake, Progress, TestResult } from "./types";
import { emptyProgress } from "./progress";
import { insforge } from "./insforge";

/* ------------------------------------------------------------------ */
/* Row shapes — snake_case, exactly as the tables are defined          */
/* ------------------------------------------------------------------ */

type ProgressRow = {
  user_id: string;
  started_at: number;
  current_day: number;
  settings: Progress["settings"];
};
type ItemStatRow = {
  user_id: string;
  item_id: string;
  seen: number;
  correct: number;
  wrong: number;
  last_seen: number;
  box: number;
};
type DayRow = {
  user_id: string;
  day: number;
  completed_at: number;
  seconds: number;
  blocks_done: string[];
};
type MistakeRow = {
  user_id: string;
  at: number;
  item_id: string | null;
  said: string;
  fixed: string;
  why: string;
  source: Mistake["source"];
  category: string;
};
type TestRow = {
  user_id: string;
  week: number;
  at: number;
  score: number;
  weak_item_ids: string[];
  weak_categories: string[];
  summary: string;
};

/* ------------------------------------------------------------------ */
/* Merge — every field here is monotonic or append-only, which is why  */
/* two devices can be reconciled without asking anyone to choose       */
/* ------------------------------------------------------------------ */

/** The further through the boxes and the more recently seen, the better. */
function mergeStat(a: ItemStat, b: ItemStat): ItemStat {
  const newer = a.lastSeen >= b.lastSeen ? a : b;
  const older = newer === a ? b : a;
  return {
    itemId: newer.itemId,
    // attempts happened on both devices; neither count is wrong
    seen: Math.max(newer.seen, older.seen),
    correct: Math.max(newer.correct, older.correct),
    wrong: Math.max(newer.wrong, older.wrong),
    lastSeen: newer.lastSeen,
    // the most recent answer decides the box — that is what scheduling follows
    box: newer.box,
  };
}

export function mergeProgress(local: Progress, remote: Progress): Progress {
  const stats: Record<string, ItemStat> = { ...remote.stats };
  for (const [id, s] of Object.entries(local.stats)) {
    stats[id] = stats[id] ? mergeStat(stats[id], s) : s;
  }

  const days: Record<number, DayRecord> = { ...remote.days };
  for (const [n, d] of Object.entries(local.days)) {
    const key = Number(n);
    const existing = days[key];
    // a day done twice keeps the longer session — the fuller record
    days[key] = !existing || d.seconds > existing.seconds ? d : existing;
  }

  const seen = new Set<string>();
  const mistakes = [...local.mistakes, ...remote.mistakes]
    .filter((m) => {
      const k = `${m.at}|${m.said}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => b.at - a.at)
    .slice(0, 300);

  const testKey = new Set<string>();
  const tests = [...local.tests, ...remote.tests]
    .filter((t) => {
      const k = `${t.week}|${t.at}`;
      if (testKey.has(k)) return false;
      testKey.add(k);
      return true;
    })
    .sort((a, b) => a.week - b.week);

  return {
    version: 1,
    startedAt: Math.min(local.startedAt, remote.startedAt),
    currentDay: Math.max(local.currentDay, remote.currentDay),
    days,
    stats,
    mistakes,
    tests,
    // whichever device touched settings last is the one the learner was using
    settings:
      local.currentDay >= remote.currentDay ? local.settings : remote.settings,
  };
}

/* ------------------------------------------------------------------ */
/* Pull / push                                                         */
/* ------------------------------------------------------------------ */

export async function currentUserId(): Promise<string | null> {
  const c = insforge();
  if (!c) return null;
  const { data } = await c.auth.getCurrentUser();
  const user = (data as { user?: { id?: string } } | null)?.user;
  return user?.id ?? null;
}

export async function pullProgress(): Promise<Progress | null> {
  const c = insforge();
  if (!c) return null;

  const [head, stats, days, mistakes, tests] = await Promise.all([
    c.database.from("parlons_progress").select(),
    c.database.from("parlons_item_stats").select(),
    c.database.from("parlons_day_records").select(),
    c.database.from("parlons_mistakes").select(),
    c.database.from("parlons_test_results").select(),
  ]);

  // Nothing stored yet is not a failure — it is a first sign-in.
  const headRow = (head.data as ProgressRow[] | null)?.[0];
  const base = emptyProgress();

  const out: Progress = {
    ...base,
    startedAt: headRow?.started_at ?? base.startedAt,
    currentDay: headRow?.current_day ?? base.currentDay,
    settings: headRow?.settings ?? base.settings,
    stats: {},
    days: {},
    mistakes: [],
    tests: [],
  };

  for (const r of (stats.data as ItemStatRow[] | null) ?? []) {
    out.stats[r.item_id] = {
      itemId: r.item_id,
      seen: r.seen,
      correct: r.correct,
      wrong: r.wrong,
      lastSeen: r.last_seen,
      box: r.box,
    };
  }
  for (const r of (days.data as DayRow[] | null) ?? []) {
    out.days[r.day] = {
      day: r.day,
      completedAt: r.completed_at,
      seconds: r.seconds,
      blocksDone: r.blocks_done ?? [],
    };
  }
  out.mistakes = ((mistakes.data as MistakeRow[] | null) ?? [])
    .map((r) => ({
      at: r.at,
      itemId: r.item_id ?? undefined,
      said: r.said,
      fixed: r.fixed,
      why: r.why,
      source: r.source,
      category: r.category,
    }))
    .sort((a, b) => b.at - a.at);
  out.tests = ((tests.data as TestRow[] | null) ?? []).map((r) => ({
    week: r.week,
    at: r.at,
    score: r.score,
    weakItemIds: r.weak_item_ids ?? [],
    weakCategories: r.weak_categories ?? [],
    summary: r.summary,
  }));

  return out;
}

/** Chunked so a long history doesn't become one oversized request. */
async function insertAll<T>(
  table: string,
  rows: T[],
  chunk = 200,
): Promise<void> {
  const c = insforge();
  if (!c || !rows.length) return;
  for (let i = 0; i < rows.length; i += chunk) {
    const { error } = await c.database
      .from(table)
      .insert(rows.slice(i, i + chunk));
    if (error) throw new Error(`${table}: ${JSON.stringify(error)}`);
  }
}

/**
 * Replace this user's rows with the current state. The SDK has no row upsert,
 * and RLS already scopes every statement to the signed-in user, so a delete
 * followed by an insert is both the simplest and the most predictable write.
 */
export async function pushProgress(p: Progress): Promise<void> {
  const c = insforge();
  if (!c) return;
  const userId = await currentUserId();
  if (!userId) return;

  const tables = [
    "parlons_item_stats",
    "parlons_day_records",
    "parlons_mistakes",
    "parlons_test_results",
    "parlons_progress",
  ];
  for (const t of tables) {
    await c.database.from(t).delete().eq("user_id", userId);
  }

  await insertAll<ProgressRow>("parlons_progress", [
    {
      user_id: userId,
      started_at: p.startedAt,
      current_day: p.currentDay,
      settings: p.settings,
    },
  ]);

  await insertAll<ItemStatRow>(
    "parlons_item_stats",
    Object.values(p.stats).map((s) => ({
      user_id: userId,
      item_id: s.itemId,
      seen: s.seen,
      correct: s.correct,
      wrong: s.wrong,
      last_seen: s.lastSeen,
      box: s.box,
    })),
  );

  await insertAll<DayRow>(
    "parlons_day_records",
    Object.values(p.days).map((d) => ({
      user_id: userId,
      day: d.day,
      completed_at: d.completedAt,
      seconds: d.seconds,
      blocks_done: d.blocksDone ?? [],
    })),
  );

  // (at, said) is unique per user, so dedupe before sending rather than
  // letting the constraint reject the whole batch.
  const seen = new Set<string>();
  await insertAll<MistakeRow>(
    "parlons_mistakes",
    p.mistakes
      .filter((m) => {
        const k = `${m.at}|${m.said}`;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .map((m) => ({
        user_id: userId,
        at: m.at,
        item_id: m.itemId ?? null,
        said: m.said,
        fixed: m.fixed,
        why: m.why,
        source: m.source,
        category: m.category,
      })),
  );

  await insertAll<TestRow>(
    "parlons_test_results",
    p.tests.map((t) => ({
      user_id: userId,
      week: t.week,
      at: t.at,
      score: t.score,
      weak_item_ids: t.weakItemIds ?? [],
      weak_categories: t.weakCategories ?? [],
      summary: t.summary,
    })),
  );
}

/** Sign-in and first-load path: reconcile both sides, then store the result. */
export async function reconcile(local: Progress): Promise<Progress> {
  const remote = await pullProgress();
  if (!remote) return local;
  const merged = mergeProgress(local, remote);
  await pushProgress(merged);
  return merged;
}

export type { TestResult };
