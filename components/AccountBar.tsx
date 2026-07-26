"use client";

import { useCallback, useEffect, useState } from "react";
import { insforge, syncConfigured } from "@/lib/insforge";
import { loadProgress, saveProgress } from "@/lib/progress";
import { currentUserId, pushProgress, reconcile } from "@/lib/sync";

type State = "loading" | "out" | "in";

/**
 * Sign in to carry progress between devices. Everything works signed out —
 * this only adds a copy in the cloud, so the failure mode is "not synced",
 * never "lost your place".
 */
export function AccountBar() {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!syncConfigured) {
      setState("out");
      return;
    }
    void (async () => {
      const id = await currentUserId();
      setState(id ? "in" : "out");
      if (id) void syncNow();
    })();
    // one probe on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncNow = useCallback(async () => {
    setError("");
    setNote("Syncing…");
    try {
      const merged = await reconcile(loadProgress());
      saveProgress(merged);
      setNote("Synced.");
    } catch (e) {
      setNote("");
      setError(e instanceof Error ? e.message : "Could not sync.");
    }
  }, []);

  const submit = async () => {
    const c = insforge();
    if (!c || busy) return;
    setBusy(true);
    setError("");
    setNote("");
    try {
      const { error: authError } =
        mode === "up"
          ? await c.auth.signUp({ email, password })
          : await c.auth.signInWithPassword({ email, password });

      if (authError) {
        const msg =
          typeof authError === "object" && authError && "message" in authError
            ? String((authError as { message?: unknown }).message)
            : "Could not sign in.";
        setError(msg);
        return;
      }

      const id = await currentUserId();
      if (!id) {
        setNote("Check your email to confirm the account, then sign in.");
        return;
      }
      setState("in");
      setPassword("");
      await syncNow();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    const c = insforge();
    if (!c) return;
    setBusy(true);
    try {
      // push whatever is local before losing the session
      await pushProgress(loadProgress()).catch(() => {});
      await c.auth.signOut();
      setState("out");
      setNote("Signed out. Progress stays on this device.");
    } finally {
      setBusy(false);
    }
  };

  if (!syncConfigured) return null;

  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <h2 className="font-medium">Across your devices</h2>

      {state === "loading" && (
        <p className="mt-2 text-sm text-muted">Checking…</p>
      )}

      {state === "in" && (
        <>
          <p className="mt-1 text-sm text-muted">
            Signed in. Your progress is saved to your account as you go.
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
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void submit();
              }}
              placeholder="Password"
              autoComplete={
                mode === "up" ? "new-password" : "current-password"
              }
              className="rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={submit}
              disabled={busy || !email || !password}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:opacity-90"
            >
              {mode === "up" ? "Create account" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(mode === "up" ? "in" : "up");
                setError("");
                setNote("");
              }}
              className="text-sm text-muted underline underline-offset-4 hover:text-ink"
            >
              {mode === "up"
                ? "I already have an account"
                : "Create an account instead"}
            </button>
          </div>
        </>
      )}

      {note && <p className="mt-3 text-sm text-good">{note}</p>}
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
    </section>
  );
}
