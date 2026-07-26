"use client";

import { useEffect } from "react";
import { syncConfigured } from "@/lib/insforge";
import { keepVisitAlive, sessionSettled } from "@/lib/session";

/**
 * Acts on the "stay signed in" choice, once per page load.
 *
 * Mounted in the layout rather than beside the sign-in box because the next
 * person to open a borrowed laptop may land anywhere — straight into a day,
 * say — and the session has to be gone by then, not whenever they happen to
 * visit the progress page. Screens await the same check before their first
 * read, so this only has to start it and keep the visit marked.
 */
export function SignOutOnClose() {
  useEffect(() => {
    if (!syncConfigured) return;
    void sessionSettled();
    return keepVisitAlive();
  }, []);

  return null;
}
