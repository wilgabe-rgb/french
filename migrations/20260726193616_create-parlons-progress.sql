-- Parlons learner state, synced across devices.
--
-- Timestamps are epoch milliseconds (bigint) rather than timestamptz because
-- that is exactly what lib/types.ts already stores and compares. Converting at
-- the boundary would buy nothing and risks off-by-a-timezone bugs in the
-- spaced-repetition maths.
--
-- Every table is owner-only: one user, their own rows, nothing shared. That
-- keeps the policies free of cross-table lookups, so there is no RLS recursion
-- risk and no need for SECURITY DEFINER helpers.

/* ------------------------------------------------------------------ */
/* One row per learner: the small, always-read header                  */
/* ------------------------------------------------------------------ */

CREATE TABLE public.parlons_progress (
  user_id     UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at  BIGINT NOT NULL,
  current_day INTEGER NOT NULL DEFAULT 1 CHECK (current_day BETWEEN 1 AND 90),
  -- small and never queried by field: settings genuinely suits jsonb
  settings    JSONB NOT NULL DEFAULT '{"rate": 0.95, "showEnglish": true}'::jsonb,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

/* ------------------------------------------------------------------ */
/* Spaced repetition: the hot path, one row per item                   */
/* ------------------------------------------------------------------ */

CREATE TABLE public.parlons_item_stats (
  user_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id   TEXT NOT NULL,
  seen      INTEGER NOT NULL DEFAULT 0 CHECK (seen >= 0),
  correct   INTEGER NOT NULL DEFAULT 0 CHECK (correct >= 0),
  wrong     INTEGER NOT NULL DEFAULT 0 CHECK (wrong >= 0),
  last_seen BIGINT NOT NULL DEFAULT 0,
  box       SMALLINT NOT NULL DEFAULT 0 CHECK (box BETWEEN 0 AND 5),
  PRIMARY KEY (user_id, item_id)
);

/* ------------------------------------------------------------------ */
/* Completed days                                                      */
/* ------------------------------------------------------------------ */

CREATE TABLE public.parlons_day_records (
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day          INTEGER NOT NULL CHECK (day BETWEEN 1 AND 90),
  completed_at BIGINT NOT NULL,
  seconds      INTEGER NOT NULL DEFAULT 0 CHECK (seconds >= 0),
  blocks_done  TEXT[] NOT NULL DEFAULT '{}',
  PRIMARY KEY (user_id, day)
);

/* ------------------------------------------------------------------ */
/* Mistakes — append-only, and the table that actually grows           */
/* ------------------------------------------------------------------ */

CREATE TABLE public.parlons_mistakes (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  at       BIGINT NOT NULL,
  item_id  TEXT,
  said     TEXT NOT NULL,
  fixed    TEXT NOT NULL,
  why      TEXT NOT NULL DEFAULT '',
  source   TEXT NOT NULL CHECK (source IN ('drill', 'roleplay', 'test')),
  category TEXT NOT NULL DEFAULT '',
  -- Two devices replaying the same local history must not double-insert.
  -- (at, said) is the natural key: the same words at the same millisecond.
  UNIQUE (user_id, at, said)
);

/* ------------------------------------------------------------------ */
/* Weekly test results                                                 */
/* ------------------------------------------------------------------ */

CREATE TABLE public.parlons_test_results (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week            INTEGER NOT NULL CHECK (week BETWEEN 1 AND 13),
  at              BIGINT NOT NULL,
  score           INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  weak_item_ids   TEXT[] NOT NULL DEFAULT '{}',
  weak_categories TEXT[] NOT NULL DEFAULT '{}',
  summary         TEXT NOT NULL DEFAULT '',
  -- one stored result per sitting, so a re-sync is idempotent
  UNIQUE (user_id, week, at)
);

/* ------------------------------------------------------------------ */
/* Indexes                                                             */
/* ------------------------------------------------------------------ */

-- parlons_progress.user_id is already the primary key.
-- parlons_item_stats and parlons_day_records lead their composite PK with
-- user_id, so that index already serves the RLS predicate.
CREATE INDEX idx_parlons_mistakes_user ON public.parlons_mistakes (user_id, at DESC);
CREATE INDEX idx_parlons_test_results_user ON public.parlons_test_results (user_id, week);

/* ------------------------------------------------------------------ */
/* Row level security — owner-only on every table                      */
/* ------------------------------------------------------------------ */

ALTER TABLE public.parlons_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parlons_item_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parlons_day_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parlons_mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parlons_test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own progress" ON public.parlons_progress
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "own item stats" ON public.parlons_item_stats
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "own day records" ON public.parlons_day_records
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "own mistakes" ON public.parlons_mistakes
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "own test results" ON public.parlons_test_results
  FOR ALL TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

/* ------------------------------------------------------------------ */
/* Privileges                                                          */
/* ------------------------------------------------------------------ */

-- InsForge grants broad DML on public tables to both runtime roles by default
-- so that RLS can decide row access. None of this is for anonymous callers, so
-- take it back from anon outright rather than relying on policy absence alone.
REVOKE ALL ON public.parlons_progress FROM anon;
REVOKE ALL ON public.parlons_item_stats FROM anon;
REVOKE ALL ON public.parlons_day_records FROM anon;
REVOKE ALL ON public.parlons_mistakes FROM anon;
REVOKE ALL ON public.parlons_test_results FROM anon;

GRANT USAGE ON SCHEMA public TO authenticated;

GRANT SELECT, INSERT, DELETE ON public.parlons_progress TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.parlons_item_stats TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.parlons_day_records TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.parlons_mistakes TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.parlons_test_results TO authenticated;

-- UPDATE is granted per column, deliberately omitting user_id (and the
-- identifying columns of each row) so ownership cannot be reassigned by a
-- crafted PATCH. RLS filters which rows you reach; these grants decide which
-- fields you may touch once you are there.
GRANT UPDATE (started_at, current_day, settings, updated_at)
  ON public.parlons_progress TO authenticated;
GRANT UPDATE (seen, correct, wrong, last_seen, box)
  ON public.parlons_item_stats TO authenticated;
GRANT UPDATE (completed_at, seconds, blocks_done)
  ON public.parlons_day_records TO authenticated;
GRANT UPDATE (item_id, said, fixed, why, source, category)
  ON public.parlons_mistakes TO authenticated;
GRANT UPDATE (score, weak_item_ids, weak_categories, summary)
  ON public.parlons_test_results TO authenticated;
