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

/**
 * Joins the three things that have to move together when someone signs in:
 * the account, the local slot their work is written to, and the copy on the
 * server. Screens call these rather than orchestrating it themselves.
 */

const hasWork = (p: Progress) =>
  Object.keys(p.days).length > 0 || Object.keys(p.stats).length > 0;

export async function signIn(username: string): Promise<Account> {
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

export { GUEST_ID };
export type { Account };
