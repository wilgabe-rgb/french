import type { Day, Item, Week } from "../types";

/**
 * Compact authoring format. Order is fixed and deliberate:
 *   [ fr, en, say, example, exampleEn, extra? ]
 *
 * `say` is a respelling for an English speaker, CAPS on the stressed syllable.
 * Every row must have exactly one example — that rule is the whole point.
 */
export type Row = [
  fr: string,
  en: string,
  say: string,
  ex: string,
  exEn: string,
  extra?: { tip?: string; note?: string; tags?: string[] },
];

export function day(
  n: number,
  title: string,
  goal: string,
  scenario: string,
  rows: Row[],
  scenarioBrief?: string,
): Day {
  const items: Item[] = rows.map(([fr, en, say, ex, exEn, extra], i) => ({
    id: `d${String(n).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`,
    fr,
    en,
    say,
    ex,
    exEn,
    tip: extra?.tip,
    note: extra?.note,
    tags: extra?.tags,
  }));

  return {
    day: n,
    week: Math.min(13, Math.ceil(n / 7)),
    title,
    goal,
    items,
    scenario,
    scenarioBrief,
  };
}

export function week(
  n: number,
  title: string,
  outcome: string,
  days: Day[],
): Week {
  return { week: n, title, outcome, days };
}
