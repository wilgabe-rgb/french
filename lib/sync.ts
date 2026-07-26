"use client";

import type { DayRecord, ItemStat, Mistake, Progress, TestResult } from "./types";
import { emptyProgress } from "./progress";
import { insforge } from "./insforge";

/**
 * All syncing goes through one database function, parlons_sync, which merges
 * the payload into this user's rows and returns the merged truth in a single
 * transaction.
 *
 * Doing the merge on the client instead would mean read, decide, write — and
 * two devices syncing near each other would race, the slower write silently
 * dropping the other's day. The function also derives the user from auth.uid()
 * rather than the payload, so a hand-crafted request cannot touch other rows.
 */

/** Wire shape — arrays and camelCase, matching what the function reads back. */
type SyncPayload = {
  startedAt: number;
  currentDay: number;
  settings: Progress["settings"];
  stats: ItemStat[];
  days: DayRecord[];
  mistakes: Mistake[];
  tests: TestResult[];
};

function toPayload(p: Progress): SyncPayload {
  // voiceURI names a voice installed on *this* device. Sending it would hand
  // the phone a URI its speech engine has never heard of, and speak() would
  // quietly fall back to the first French voice it can find — overriding the
  // voice actually chosen there. Rate and showEnglish are real preferences and
  // do travel.
  const { voiceURI: _deviceLocal, ...settings } = p.settings;

  return {
    startedAt: p.startedAt,
    currentDay: p.currentDay,
    settings,
    stats: Object.values(p.stats),
    days: Object.values(p.days),
    // (at, said) is unique per user; send each pair once
    mistakes: dedupe(p.mistakes, (m) => `${m.at}|${m.said}`),
    tests: dedupe(p.tests, (t) => `${t.week}|${t.at}`),
  };
}

function dedupe<T>(rows: T[], key: (row: T) => string): T[] {
  const seen = new Set<string>();
  return rows.filter((r) => {
    const k = key(r);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function fromResult(raw: unknown, fallback: Progress): Progress {
  if (!raw || typeof raw !== "object") return fallback;
  const r = raw as Partial<SyncPayload>;

  const stats: Record<string, ItemStat> = {};
  for (const s of r.stats ?? []) stats[s.itemId] = s;

  const days: Record<number, DayRecord> = {};
  for (const d of r.days ?? []) days[d.day] = d;

  return {
    version: 1,
    startedAt: r.startedAt ?? fallback.startedAt,
    currentDay: r.currentDay ?? fallback.currentDay,
    settings: { ...fallback.settings, ...(r.settings ?? {}) },
    stats,
    days,
    // the server returns full history; the local cap is a UI concern
    mistakes: (r.mistakes ?? []).slice(0, 300),
    tests: r.tests ?? [],
  };
}

export type AccountUser = { id: string; email?: string };

/**
 * Who is signed in, or null. On a cold load the SDK has no access token in
 * memory and refreshes from the httpOnly cookie first, so this is a network
 * call and callers should treat "null" as "not yet" until it settles.
 */
export async function currentUser(): Promise<AccountUser | null> {
  const c = insforge();
  if (!c) return null;
  try {
    const { data } = await c.auth.getCurrentUser();
    const user = (data as { user?: { id?: string; email?: string } } | null)
      ?.user;
    return user?.id ? { id: user.id, email: user.email } : null;
  } catch {
    return null;
  }
}

export async function currentUserId(): Promise<string | null> {
  return (await currentUser())?.id ?? null;
}

/**
 * Push local state and adopt whatever the merge produced. Returns the input
 * untouched when there is no backend or nobody is signed in, so callers can
 * treat syncing as a no-op rather than a special case.
 */
export async function syncProgress(local: Progress): Promise<Progress> {
  const c = insforge();
  if (!c) return local;
  if (!(await currentUserId())) return local;

  const { data, error } = await c.database.rpc("parlons_sync", {
    payload: toPayload(local),
  });

  if (error) throw new Error(describeError(error));
  return fromResult(data, local);
}

function describeError(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const e = error as { message?: unknown; error?: unknown };
    if (typeof e.message === "string") return e.message;
    if (typeof e.error === "string") return e.error;
  }
  return "Could not sync.";
}

/** Kept for callers that only need a starting point when signed out. */
export const blankProgress = emptyProgress;
