"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { insforge, syncConfigured } from "@/lib/insforge";
import { loadProgress, saveProgress } from "@/lib/progress";
import { syncProgress } from "@/lib/sync";
import { restoreSession, signIn, signOut, type Account } from "@/lib/session";

type State = "loading" | "out" | "in";

/**
 * Signing in is just a name. There is no password by design, so this is the
 * whole of it: type who you are and your own days, weak spots and tests follow
 * you to any device. Everything works signed out too — that work stays on this
 * device and is carried into the first account used here.
 */
export function AccountBar() {
  const [state, setState] = useState<State>("loading");
  const [account, setAccount] = useState<Account | null>(null);
  const [name, setName] = useState("");
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

  useEffect(() => {
    if (!syncConfigured) {
      setState("out");
      return;
    }
    void (async () => {
      // Returning from Google is a round-trip, so a first look can honestly
      // show nobody there; give it a moment before concluding that.
      const returning =
        typeof window !== "undefined" &&
        window.location.search.includes("insforge_code");

      for (let i = 0; i < (returning ? 12 : 1); i++) {
        const acct = await restoreSession();
        if (!mounted.current) return;
        if (acct) {
          setAccount(acct);
          setState("in");
          return;
        }
        if (i === 0 && !returning) break;
        await new Promise((r) => setTimeout(r, 250));
      }
      if (mounted.current) setState("out");
    })();
  }, []);

  const enter = async () => {
    if (busy || !name.trim()) return;
    setBusy(true);
    setError("");
    setNote("");
    try {
      const acct = await signIn(name);
      if (!mounted.current) return;
      setAccount(acct);
      setState("in");
      setName("");
      setNote(`Welcome, ${acct.username}. Your progress is saved to that name.`);
    } catch (e) {
      if (mounted.current) {
        setError(e instanceof Error ? e.message : "Could not sign in.");
      }
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  const leaveNow = async () => {
    setBusy(true);
    try {
      await signOut();
      if (!mounted.current) return;
      setAccount(null);
      setState("out");
      setNote("Signed out. Pick a name again to carry on where you left off.");
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  const syncNow = useCallback(async () => {
    setError("");
    setNote("Syncing…");
    try {
      saveProgress(await syncProgress(loadProgress()));
      if (mounted.current) setNote("Synced.");
    } catch (e) {
      if (!mounted.current) return;
      setNote("");
      setError(e instanceof Error ? e.message : "Could not sync.");
    }
  }, []);

  const withGoogle = async () => {
    const c = insforge();
    if (!c || busy) return;
    setBusy(true);
    setError("");
    try {
      const { origin, pathname } = window.location;
      const { error: authError } = await c.auth.signInWithOAuth("google", {
        redirectTo: `${origin}${pathname}`,
        additionalParams: { prompt: "select_account" },
      });
      if (authError && mounted.current) {
        setError("Could not start Google sign-in.");
      }
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  if (!syncConfigured) return null;

  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <h2 className="font-medium">Who&apos;s learning</h2>

      {state === "loading" && (
        <p className="mt-2 text-sm text-muted">Checking…</p>
      )}

      {state === "in" && account && (
        <>
          <p className="mt-1 text-sm text-muted">
            Signed in as{" "}
            <span className="font-medium text-ink">{account.username}</span>.
            Everything below is yours alone, on any device.
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
              onClick={leaveNow}
              disabled={busy}
              className="rounded-lg border border-line px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
            >
              Switch learner
            </button>
          </div>
        </>
      )}

      {state === "out" && (
        <>
          <p className="mt-1 text-sm text-muted">
            Type your name to start, or to pick up exactly where you left off.
            No password — if the name has been used before, you carry on from
            that point.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void enter();
              }}
              placeholder="your name"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={enter}
              disabled={busy || !name.trim()}
              className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-bg transition hover:opacity-90"
            >
              {busy ? "One moment…" : "Start"}
            </button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Anyone who types your name can open your progress, so use this among
            people you trust.{" "}
            <button
              type="button"
              onClick={withGoogle}
              disabled={busy}
              className="underline underline-offset-4 hover:text-ink"
            >
              Use Google instead
            </button>{" "}
            if you would rather it were locked.
          </p>
        </>
      )}

      {note && <p className="mt-3 text-sm text-good">{note}</p>}
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
    </section>
  );
}
