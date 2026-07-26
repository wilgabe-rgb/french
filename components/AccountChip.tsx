"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { syncConfigured } from "@/lib/insforge";
import { restoreSession, type Account } from "@/lib/session";

/**
 * Who is on this device, visible from every page. On a shared laptop the
 * important question is "whose day am I about to do?", and the answer should
 * never require opening a settings page to find.
 */
export function AccountChip() {
  const [account, setAccount] = useState<Account | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!syncConfigured) {
      setChecked(true);
      return;
    }
    let alive = true;
    const read = async () => {
      const acct = await restoreSession();
      if (alive) {
        setAccount(acct);
        setChecked(true);
      }
    };
    void read();
    window.addEventListener("parlons:account", read);
    return () => {
      alive = false;
      window.removeEventListener("parlons:account", read);
    };
  }, []);

  if (!syncConfigured || !checked) return null;

  return (
    <Link
      href="/progress"
      className="rounded-full border border-line px-3 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
      title={account ? "Signed in — tap to switch learner" : "Tap to sign in"}
    >
      {account ? account.username : "Sign in"}
    </Link>
  );
}
