"use client";

/**
 * Whether a session outlives the browser — and how we tell that it has.
 *
 * The backend keeps the session in a cookie that survives closing the browser.
 * That is right on your own phone and wrong on a borrowed laptop, and there is
 * no server-side switch for it, so the choice is kept here and enforced on the
 * next cold load: someone who asked not to stay signed in is signed out before
 * the app shows anything of theirs.
 *
 * Nothing fires reliably when a browser closes, so it is inferred instead. A
 * marker in sessionStorage dies with the tab; a timestamp in localStorage,
 * kept fresh while the app is open, covers what the marker cannot — a second
 * tab starts with empty sessionStorage, but a timestamp from seconds ago says
 * the browser never went away. Reopening within the grace window therefore
 * leaves you signed in, which is the harmless side of that trade.
 */

const CHOICE = "parlons.stay-signed-in";
const VISIT = "parlons.visit";
const LAST_SEEN = "parlons.last-seen";

/** How recently the app must have been open for this to count as one visit. */
const SAME_VISIT_MS = 90_000;
const HEARTBEAT_MS = 20_000;

/** Staying is the default: most people are on a device only they use. */
export function staysSignedIn(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(CHOICE) !== "no";
}

/** Remembered per device, so the box comes back the way they last left it. */
export function setStaySignedIn(stay: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CHOICE, stay ? "yes" : "no");
}

function touch() {
  window.localStorage.setItem(LAST_SEEN, String(Date.now()));
}

/** True when this page load opens a browser visit we have not seen before. */
export function isNewVisit(): boolean {
  if (typeof window === "undefined") return false;
  if (window.sessionStorage.getItem(VISIT)) return false;
  const seen = Number(window.localStorage.getItem(LAST_SEEN) ?? 0);
  return Date.now() - seen > SAME_VISIT_MS;
}

export function markVisit() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(VISIT, "1");
  touch();
}

/**
 * Keep the timestamp current for as long as the app is open. Returns the
 * cleanup, so a caller can hand it straight back from an effect.
 */
export function keepVisitAlive(): () => void {
  if (typeof window === "undefined") return () => {};
  markVisit();

  const beat = setInterval(touch, HEARTBEAT_MS);
  // a backgrounded tab may never get another interval, so stamp the moment it
  // goes away — that reading is the one the next load will judge us on
  const onLeaving = () => touch();
  window.addEventListener("pagehide", onLeaving);
  document.addEventListener("visibilitychange", onLeaving);

  return () => {
    clearInterval(beat);
    window.removeEventListener("pagehide", onLeaving);
    document.removeEventListener("visibilitychange", onLeaving);
  };
}
