"use client";

import { currentAccount, enterAs, leave, type Account } from "./account";
import type { Progress } from "./types";
import {
  GUEST_ID,
  clearGuestProgress,
  guestProgress,
  loadProgress,
  saveProgress,
  setActiveAccount,
} from "./progress";
import { syncProgress } from "./sync";
import {
  isNewVisit,
  keepVisitAlive,
  markVisit,
  setStaySignedIn,
  staysSignedIn,
} from "./stay";

/**
 * Joins the three things that have to move together when someone signs in:
 * the account, the local slot their work is written to, and the copy on the
 * server. Screens call these rather than orchestrating it themselves.
 */

/**
 * Any trace of having used the app. Corrections count: practising in the
 * conversation simulator logs mistakes without completing a day or scoring an
 * item, and that history is exactly what the warm-ups are built from.
 */
const hasWork = (p: Progress) =>
  Object.keys(p.days).length > 0 ||
  Object.keys(p.stats).length > 0 ||
  p.mistakes.length > 0 ||
  p.tests.length > 0;

export async function signIn(
  username: string,
  stay = staysSignedIn(),
): Promise<Account> {
  // recorded before the round trip, so a sign-in that fails half way still
  // leaves the device set the way they asked
  setStaySignedIn(stay);

  const account = await enterAs(username);
  setActiveAccount(account.id);

  // Start from this account's own slot and let the server fill in anything
  // done elsewhere — on a new device that is the only copy of their history.
  let state = loadProgress(account.id);
  try {
    state = await syncProgress(state);
  } catch {
    // offline or backend down: local still works, the next change retries
  }

  // Work done before signing in is only ever adopted by an account that has
  // no history at all, anywhere. Checking the server rather than just this
  // device is what stops a returning learner inheriting whatever the previous
  // person left in the signed-out slot of a shared laptop.
  if (!hasWork(state)) {
    const guest = guestProgress();
    if (hasWork(guest)) {
      try {
        state = await syncProgress(guest);
      } catch {
        state = guest;
      }
      clearGuestProgress();
    }
  }

  saveProgress(state, account.id);
  return account;
}

export async function signOut(): Promise<void> {
  try {
    await syncProgress(loadProgress());
  } catch {
    // nothing to do; the copy on this device is unchanged
  }
  await leave();
  setActiveAccount(null);
}

/** Reattach on a cold load, and make sure the local slot matches the session. */
export async function restoreSession(): Promise<Account | null> {
  const account = await currentAccount();
  setActiveAccount(account ? account.id : null);
  return account;
}

let settling: Promise<Account | null> | null = null;

/**
 * Who is signed in for this page load — worked out once, and shared.
 *
 * Every screen takes its first answer from here rather than asking for itself.
 * Two reasons, both learned the hard way: a read that leaves before a lapsed
 * session is ended can land after it and paint the departed learner's name back
 * on a shared device; and simultaneous reads on a cold load each try to renew
 * the same token, where the second one loses and reports nobody there.
 */
export function sessionSettled(): Promise<Account | null> {
  settling ??= settle();
  return settling;
}

/**
 * Read the session, honouring "don't stay signed in": if the browser has been
 * closed since that choice was made, the session ends here instead.
 *
 * The two synchronous lines come first on purpose — the visit has to be marked
 * before anything can await, or a second look this same load would judge the
 * visit new all over again.
 */
async function settle(): Promise<Account | null> {
  const lapsed = !staysSignedIn() && isNewVisit();
  markVisit();

  const account = await currentAccount();
  if (account && lapsed) {
    await signOut();
    return null;
  }

  setActiveAccount(account ? account.id : null);
  return account;
}

export { GUEST_ID, keepVisitAlive, setStaySignedIn, staysSignedIn };

export type { Account };
