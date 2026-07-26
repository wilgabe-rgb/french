"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { insforge, syncConfigured } from "@/lib/insforge";
import { loadProgress, saveProgress } from "@/lib/progress";
import { currentUser, syncProgress } from "@/lib/sync";

type State = "loading" | "out" | "in";

/**
 * Sign in to carry progress between devices. Everything works signed out —
 * this only adds a copy in the cloud, so the failure mode is "not synced",
 * never "lost your place".
 *
 * Google is the only way in. There is no password to forget on a phone you
 * picked up to do ten minutes of French on the train, and Google has already
 * verified the address, so there is no confirmation step standing between
 * signing up and using the app.
 */
export function AccountBar() {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const syncNow = useCallback(async () => {
    setError("");
    setNote("Syncing…");
    try {
      const merged = await syncProgress(loadProgress());
      saveProgress(merged);
      if (mounted.current) setNote("Synced.");
    } catch (e) {
      if (!mounted.current) return;
      setNote("");
      setError(e instanceof Error ? e.message : "Could not sync.");
    }
  }, []);

  useEffect(() => {
    if (!syncConfigured) {
      setState("out");
      return;
    }

    void (async () => {
      // Coming back from Google, the SDK exchanges the insforge_code in the URL
      // for a session as it starts up. That is a network round-trip, so the
      // first look can legitimately show nobody signed in — give it a moment
      // before concluding the sign-in failed.
      const returning =
        typeof window !== "undefined" &&
        window.location.search.includes("insforge_code");

      for (let attempt = 0; attempt < (returning ? 12 : 1); attempt++) {
        const user = await currentUser();
        if (!mounted.current) return;
        if (user) {
          setEmail(user.email ?? "");
          setState("in");
          void syncNow();
          return;
        }
        if (attempt === 0 && !returning) break;
        await new Promise((r) => setTimeout(r, 250));
      }

      if (mounted.current) setState("out");
    })();
  }, [syncNow]);

  const signIn = async () => {
    const c = insforge();
    if (!c || busy) return;
    setBusy(true);
    setError("");
    setNote("");
    try {
      // Land back where they started, so signing in from the progress page
      // returns to the progress page rather than dumping them at the top.
      const { origin, pathname } = window.location;
      const { error: authError } = await c.auth.signInWithOAuth("google", {
        redirectTo: `${origin}${pathname}`,
        additionalParams: { prompt: "select_account" },
      });
      // On success the browser has already left for Google; only failures
      // carry on to here.
      if (authError) {
        setError(
          typeof authError === "object" &&
            authError &&
            "message" in authError
            ? String((authError as { message?: unknown }).message)
            : "Could not start sign-in.",
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start sign-in.");
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  const signOut = async () => {
    const c = insforge();
    if (!c) return;
    setBusy(true);
    try {
      // push whatever is local before losing the session
      await syncProgress(loadProgress()).catch(() => null);
      await c.auth.signOut();
      if (!mounted.current) return;
      setState("out");
      setEmail("");
      setNote("Signed out. Progress stays on this device.");
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  if (!syncConfigured) return null;

  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <h2 className="font-medium">Across your devices</h2>

      {state === "loading" && <p className="mt-2 text-sm text-muted">Checking…</p>}

      {state === "in" && (
        <>
          <p className="mt-1 text-sm text-muted">
            Signed in{email ? ` as ${email}` : ""}. Your progress is saved to
            your account as you go.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={syncNow}
              disabled={busy}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:opacity-90"
            >
              Sync now
            </button>
            <button
              type="button"
              onClick={signOut}
              disabled={busy}
              className="rounded-lg border border-line px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
            >
              Sign out
            </button>
          </div>
        </>
      )}

      {state === "out" && (
        <>
          <p className="mt-1 text-sm text-muted">
            Optional. Sign in and your days, weak spots and test results follow
            you to your phone. Without it everything stays on this device.
          </p>
          <button
            type="button"
            onClick={signIn}
            disabled={busy}
            className="mt-4 inline-flex items-center gap-3 rounded-lg border border-line bg-bg px-4 py-2 text-sm font-medium transition hover:border-accent disabled:opacity-60"
          >
            <GoogleMark />
            {busy ? "Opening Google…" : "Continue with Google"}
          </button>
        </>
      )}

      {note && <p className="mt-3 text-sm text-good">{note}</p>}
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
    </section>
  );
}

/** Google's mark, inline so the button works offline and needs no CDN. */
function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
