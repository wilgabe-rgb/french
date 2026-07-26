"use client";

import { useEffect, useRef } from "react";
import { syncConfigured } from "@/lib/insforge";
import { loadProgress } from "@/lib/progress";
import { currentUserId, pushProgress } from "@/lib/sync";

/**
 * Pushes progress to the account a few seconds after it stops changing.
 *
 * Mounted once in the layout so a lesson finished on any page is saved without
 * that page knowing sync exists. Lives here rather than inside the progress
 * store to keep the store free of a circular import — sync already reads it.
 * Failures are deliberately silent: local storage is the source of truth and a
 * dropped push is retried by the next change or the next sign-in.
 */
export function SyncOnChange({ delayMs = 4000 }: { delayMs?: number }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!syncConfigured) return;

    const flush = async () => {
      if (inFlight.current) return;
      inFlight.current = true;
      try {
        if (await currentUserId()) await pushProgress(loadProgress());
      } catch {
        // keep quiet — see note above
      } finally {
        inFlight.current = false;
      }
    };

    const onChange = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), delayMs);
    };

    window.addEventListener("parlons:progress", onChange);
    return () => {
      window.removeEventListener("parlons:progress", onChange);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [delayMs]);

  return null;
}
