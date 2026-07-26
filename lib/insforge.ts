"use client";

import { createClient } from "@insforge/sdk";

const url = process.env.NEXT_PUBLIC_INSFORGE_URL;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

/**
 * Sync is optional. With no backend configured the app still works completely —
 * it just keeps progress on this device — so never throw at import time.
 */
export const syncConfigured = Boolean(url && anonKey);

let client: ReturnType<typeof createClient> | null = null;

export function insforge() {
  if (!syncConfigured) return null;
  if (!client) client = createClient({ baseUrl: url!, anonKey: anonKey! });
  return client;
}
