-- Narrow UPDATE down to the columns that are actually meant to change.
--
-- The previous migration granted UPDATE per column but never took away the
-- broad table-level UPDATE that InsForge grants to `authenticated` by default.
-- A table-level grant covers every column, so the narrower grants were
-- redundant and user_id stayed writable. Revoke first, then grant back.
--
-- The RLS WITH CHECK already refuses to store a row whose user_id is not
-- auth.uid(), so this is defence in depth rather than a fix for an open hole:
-- it keeps the invariant true even if a future policy is loosened.

REVOKE UPDATE ON public.parlons_progress FROM authenticated;
REVOKE UPDATE ON public.parlons_item_stats FROM authenticated;
REVOKE UPDATE ON public.parlons_day_records FROM authenticated;
REVOKE UPDATE ON public.parlons_mistakes FROM authenticated;
REVOKE UPDATE ON public.parlons_test_results FROM authenticated;

-- Mutable state only. user_id, and the key columns that identify which row
-- this is (item_id, day), stay immutable — a row that needs a different key is
-- a different row, and the sync layer upserts rather than re-keys.
GRANT UPDATE (started_at, current_day, settings, updated_at)
  ON public.parlons_progress TO authenticated;
GRANT UPDATE (seen, correct, wrong, last_seen, box)
  ON public.parlons_item_stats TO authenticated;
GRANT UPDATE (completed_at, seconds, blocks_done)
  ON public.parlons_day_records TO authenticated;

-- parlons_mistakes and parlons_test_results are append-only: a mistake you
-- made at a given millisecond is a historical fact, and the weak-spot engine
-- trusts it. No UPDATE grant at all. Rows can still be deleted, which is what
-- "reset my progress" needs.
