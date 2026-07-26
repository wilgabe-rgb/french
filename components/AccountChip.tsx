"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { currentAccount, type Account } from "@/lib/account";
import { syncConfigured } from "@/lib/insforge";
import { sessionSettled } from "@/lib/session";

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
    // reads can overlap — a slow one must not repaint over a newer answer
    let latest = 0;
    const show = async (look: Promise<Account | null>) => {
      const ticket = ++latest;
      const acct = await look;
      if (alive && ticket === latest) {
        setAccount(acct);
        setChecked(true);
      }
    };

    // The first answer comes from the shared read, so this and the sign-in box
    // agree and only ask once between them. After that currentAccount only
    // reads — restoreSession would write the active account back and
    // re-announce the very change this handler listens for.
    const read = () => show(currentAccount());
    void show(sessionSettled());
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
      className="grid h-9 max-w-32 place-items-center truncate rounded-full border border-line px-3 text-xs text-muted transition hover:border-accent hover:text-accent"
      title={account ? "Signed in — tap to sign out or switch" : "Tap to sign in"}
    >
      {account ? account.username : "Sign in"}
    </Link>
  );
}
