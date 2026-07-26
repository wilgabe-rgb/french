"use client";

import { insforge } from "./insforge";

/**
 * Username-only accounts.
 *
 * Each learner types a name and is in. There is no password by deliberate
 * choice, so the username IS the credential: anyone who types "sarah" opens
 * Sarah's progress, and two people choosing the same name share one account.
 * That is the accepted trade for zero friction among a few trusted people.
 *
 * Underneath, the backend still wants a real credential pair, so we derive one
 * deterministically from the username. The derivation is not a secret and is
 * not pretending to be — it exists so the account system works, not to keep
 * anyone out. Adding a PIN later means mixing it into `derivePassword` and
 * nothing else changes.
 */

/** Where derived accounts live. Never receives mail; it only has to parse. */
const DOMAIN = "users.parlons.app";
const DERIVATION_VERSION = "v1";

export type Account = { id: string; username: string };

/** Lowercase, trimmed, spaces to hyphens — so "Marie C" and "marie-c" are one. */
export function normaliseUsername(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9._-]/g, "")
    .replace(/^[.\-_]+|[.\-_]+$/g, "")
    .slice(0, 32);
}

export function usernameProblem(raw: string): string | null {
  const u = normaliseUsername(raw);
  if (u.length < 2) return "Pick a name with at least 2 letters.";
  if (!/^[a-z0-9]/.test(u)) return "Names should start with a letter or number.";
  return null;
}

const emailFor = (username: string) => `${username}@${DOMAIN}`;

/** Username back out of the address we signed them in with. */
export function usernameFromEmail(email: string | undefined): string {
  if (!email) return "";
  const [local, domain] = email.split("@");
  return domain === DOMAIN ? local : email;
}

async function derivePassword(username: string): Promise<string> {
  const material = `parlons:${DERIVATION_VERSION}:${username}`;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(material),
  );
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // capital and symbol included so this satisfies any future password policy
  return `Pa1!${hex.slice(0, 40)}`;
}

function messageOf(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null) {
    const e = error as { message?: unknown; error?: unknown };
    if (typeof e.message === "string") return e.message;
    if (typeof e.error === "string") return e.error;
  }
  return fallback;
}

/**
 * Sign in, creating the account the first time that name is used. One entry
 * point rather than separate sign-up and sign-in: with no password there is no
 * meaningful difference to the learner, and asking them to pick would only
 * invite "I already have one, don't I?".
 */
export async function enterAs(rawUsername: string): Promise<Account> {
  const c = insforge();
  if (!c) throw new Error("Accounts are not configured for this site.");

  const username = normaliseUsername(rawUsername);
  const problem = usernameProblem(rawUsername);
  if (problem) throw new Error(problem);

  const email = emailFor(username);
  const password = await derivePassword(username);

  const first = await c.auth.signInWithPassword({ email, password });
  if (!first.error) return { id: await requireId(), username };

  // No such account yet: make it, then take whichever path signs us in.
  const created = await c.auth.signUp({ email, password });
  if (created.error) {
    const both = `${messageOf(first.error, "")} ${messageOf(created.error, "")}`;
    // Existing account whose sign-in failed is the one case worth naming: it
    // means the stored password predates the current derivation.
    if (/already|exists|registered/i.test(both)) {
      throw new Error(
        `The name "${username}" exists but could not be opened. Try a different name.`,
      );
    }
    throw new Error(messageOf(created.error, "Could not create that account."));
  }

  // Some configurations return a session straight from signUp, some do not.
  if (!(await currentAccount())) {
    const retry = await c.auth.signInWithPassword({ email, password });
    if (retry.error) {
      throw new Error(messageOf(retry.error, "Account made, but sign-in failed."));
    }
  }
  return { id: await requireId(), username };
}

async function requireId(): Promise<string> {
  const acct = await currentAccount();
  if (!acct) throw new Error("Signed in, but no session came back.");
  return acct.id;
}

export async function currentAccount(): Promise<Account | null> {
  const c = insforge();
  if (!c) return null;
  try {
    const { data } = await c.auth.getCurrentUser();
    const user = (data as { user?: { id?: string; email?: string } } | null)
      ?.user;
    if (!user?.id) return null;
    return { id: user.id, username: usernameFromEmail(user.email) };
  } catch {
    return null;
  }
}

export async function leave(): Promise<void> {
  const c = insforge();
  if (!c) return;
  await c.auth.signOut();
}
