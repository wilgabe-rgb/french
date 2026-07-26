-- One round-trip, atomic sync.
--
-- The SDK has no upsert, and doing this as a read-modify-write from the client
-- would race whenever two devices sync near each other: both read, both decide,
-- the slower write wins and the other device's day silently disappears. Doing
-- the whole merge inside one function makes it a single transaction, so the
-- rules below are the only thing that decides an outcome.
--
-- SECURITY INVOKER (the default) is deliberate: every statement here runs as
-- the caller, so RLS and the column grants still apply. The function derives
-- user_id from auth.uid() and never takes it from the payload, so a caller
-- cannot write to someone else's rows even if they craft the JSON by hand.

CREATE OR REPLACE FUNCTION public.parlons_sync(payload JSONB)
RETURNS JSONB
LANGUAGE plpgsql
VOLATILE
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  uid UUID := auth.uid();
  result JSONB;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'parlons_sync requires an authenticated caller';
  END IF;

  /* -------------------------------------------------------------- */
  /* Header. started_at goes backwards only (the true first day),    */
  /* current_day forwards only (the furthest you have reached).      */
  /* -------------------------------------------------------------- */
  INSERT INTO public.parlons_progress (user_id, started_at, current_day, settings, updated_at)
  VALUES (
    uid,
    COALESCE((payload->>'startedAt')::BIGINT, (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT),
    COALESCE((payload->>'currentDay')::INTEGER, 1),
    COALESCE(payload->'settings', '{}'::JSONB),
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    started_at  = LEAST(public.parlons_progress.started_at, EXCLUDED.started_at),
    current_day = GREATEST(public.parlons_progress.current_day, EXCLUDED.current_day),
    -- settings are a device preference, not history: newest write wins
    settings    = EXCLUDED.settings,
    updated_at  = NOW();

  /* -------------------------------------------------------------- */
  /* Item stats. Counters take the max rather than the newer row's   */
  /* value: two devices drilling offline each hold a partial count,  */
  /* and the larger one is the one that actually happened. box and   */
  /* last_seen come from whichever side reviewed most recently,      */
  /* because those two describe a moment, not a total.               */
  /* -------------------------------------------------------------- */
  INSERT INTO public.parlons_item_stats (user_id, item_id, seen, correct, wrong, last_seen, box)
  SELECT
    uid,
    s->>'itemId',
    COALESCE((s->>'seen')::INTEGER, 0),
    COALESCE((s->>'correct')::INTEGER, 0),
    COALESCE((s->>'wrong')::INTEGER, 0),
    COALESCE((s->>'lastSeen')::BIGINT, 0),
    LEAST(GREATEST(COALESCE((s->>'box')::SMALLINT, 0), 0), 5)
  FROM jsonb_array_elements(COALESCE(payload->'stats', '[]'::JSONB)) AS s
  WHERE s->>'itemId' IS NOT NULL
  ON CONFLICT (user_id, item_id) DO UPDATE SET
    seen      = GREATEST(public.parlons_item_stats.seen, EXCLUDED.seen),
    correct   = GREATEST(public.parlons_item_stats.correct, EXCLUDED.correct),
    wrong     = GREATEST(public.parlons_item_stats.wrong, EXCLUDED.wrong),
    box       = CASE WHEN EXCLUDED.last_seen >= public.parlons_item_stats.last_seen
                     THEN EXCLUDED.box ELSE public.parlons_item_stats.box END,
    last_seen = GREATEST(public.parlons_item_stats.last_seen, EXCLUDED.last_seen);

  /* -------------------------------------------------------------- */
  /* Day records. A day is completed once; keep the first completion */
  /* and the union of the blocks done on either device.              */
  /* -------------------------------------------------------------- */
  INSERT INTO public.parlons_day_records (user_id, day, completed_at, seconds, blocks_done)
  SELECT
    uid,
    (d->>'day')::INTEGER,
    COALESCE((d->>'completedAt')::BIGINT, 0),
    COALESCE((d->>'seconds')::INTEGER, 0),
    COALESCE(
      ARRAY(SELECT jsonb_array_elements_text(COALESCE(d->'blocksDone', '[]'::JSONB))),
      '{}'::TEXT[]
    )
  FROM jsonb_array_elements(COALESCE(payload->'days', '[]'::JSONB)) AS d
  WHERE (d->>'day') IS NOT NULL
    AND (d->>'day')::INTEGER BETWEEN 1 AND 90
  ON CONFLICT (user_id, day) DO UPDATE SET
    completed_at = LEAST(public.parlons_day_records.completed_at, EXCLUDED.completed_at),
    seconds      = GREATEST(public.parlons_day_records.seconds, EXCLUDED.seconds),
    blocks_done  = ARRAY(
      SELECT DISTINCT unnest(public.parlons_day_records.blocks_done || EXCLUDED.blocks_done)
    );

  /* -------------------------------------------------------------- */
  /* Mistakes and tests are history: insert what is new, never       */
  /* rewrite what is already recorded.                               */
  /* -------------------------------------------------------------- */
  INSERT INTO public.parlons_mistakes (user_id, at, item_id, said, fixed, why, source, category)
  SELECT
    uid,
    (m->>'at')::BIGINT,
    NULLIF(m->>'itemId', ''),
    m->>'said',
    COALESCE(m->>'fixed', ''),
    COALESCE(m->>'why', ''),
    m->>'source',
    COALESCE(m->>'category', '')
  FROM jsonb_array_elements(COALESCE(payload->'mistakes', '[]'::JSONB)) AS m
  WHERE (m->>'at') IS NOT NULL
    AND (m->>'said') IS NOT NULL
    AND (m->>'source') IN ('drill', 'roleplay', 'test')
  ON CONFLICT (user_id, at, said) DO NOTHING;

  INSERT INTO public.parlons_test_results
    (user_id, week, at, score, weak_item_ids, weak_categories, summary)
  SELECT
    uid,
    (t->>'week')::INTEGER,
    (t->>'at')::BIGINT,
    LEAST(GREATEST(COALESCE((t->>'score')::INTEGER, 0), 0), 100),
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(COALESCE(t->'weakItemIds', '[]'::JSONB))), '{}'::TEXT[]),
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(COALESCE(t->'weakCategories', '[]'::JSONB))), '{}'::TEXT[]),
    COALESCE(t->>'summary', '')
  FROM jsonb_array_elements(COALESCE(payload->'tests', '[]'::JSONB)) AS t
  WHERE (t->>'week') IS NOT NULL
    AND (t->>'at') IS NOT NULL
    AND (t->>'week')::INTEGER BETWEEN 1 AND 13
  ON CONFLICT (user_id, week, at) DO NOTHING;

  /* -------------------------------------------------------------- */
  /* Hand back the merged truth, shaped exactly like the Progress    */
  /* type in lib/types.ts so the client can adopt it wholesale.      */
  /* -------------------------------------------------------------- */
  SELECT jsonb_build_object(
    'startedAt',  p.started_at,
    'currentDay', p.current_day,
    'settings',   p.settings,
    'stats', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'itemId', st.item_id, 'seen', st.seen, 'correct', st.correct,
        'wrong', st.wrong, 'lastSeen', st.last_seen, 'box', st.box))
      FROM public.parlons_item_stats st WHERE st.user_id = uid
    ), '[]'::JSONB),
    'days', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'day', dr.day, 'completedAt', dr.completed_at,
        'seconds', dr.seconds, 'blocksDone', to_jsonb(dr.blocks_done)))
      FROM public.parlons_day_records dr WHERE dr.user_id = uid
    ), '[]'::JSONB),
    'mistakes', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'at', mi.at, 'itemId', mi.item_id, 'said', mi.said, 'fixed', mi.fixed,
        'why', mi.why, 'source', mi.source, 'category', mi.category)
        ORDER BY mi.at DESC)
      FROM public.parlons_mistakes mi WHERE mi.user_id = uid
    ), '[]'::JSONB),
    'tests', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'week', tr.week, 'at', tr.at, 'score', tr.score,
        'weakItemIds', to_jsonb(tr.weak_item_ids),
        'weakCategories', to_jsonb(tr.weak_categories),
        'summary', tr.summary) ORDER BY tr.at)
      FROM public.parlons_test_results tr WHERE tr.user_id = uid
    ), '[]'::JSONB)
  )
  INTO result
  FROM public.parlons_progress p
  WHERE p.user_id = uid;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.parlons_sync(JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.parlons_sync(JSONB) TO authenticated;
