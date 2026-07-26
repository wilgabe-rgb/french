/**
 * Content model for the 90-day plan.
 *
 * Rules baked into the shape:
 * - every item carries a pronunciation respelling (`say`) — never optional
 * - every item carries exactly ONE natural example sentence
 * - `note` is a grammar note and is capped at one sentence, and only exists
 *   when getting it wrong would make you say the phrase incorrectly
 */

export type Item = {
  /** stable id, e.g. "d03-04" — used by the weak-spot engine */
  id: string;
  /** the French phrase, as you would actually say it */
  fr: string;
  /** what it means in English (meaning, not word-for-word) */
  en: string;
  /** pronunciation respelling, CAPS = stressed syllable, e.g. "bon-ZHOOR" */
  say: string;
  /** one short tip about the sound that trips English speakers up */
  tip?: string;
  /** one natural example sentence using the phrase */
  ex: string;
  /** translation of the example */
  exEn: string;
  /** one sentence of grammar, only when it changes what you'd say */
  note?: string;
  /** loose grouping used for test generation */
  tags?: string[];
};

export type Day = {
  day: number; // 1..90
  week: number; // 1..13
  title: string;
  /** what you can do at the end of today, in plain English */
  goal: string;
  items: Item[];
  /** id of the scenario used for today's roleplay block */
  scenario: string;
  /** optional extra instruction for the roleplay partner today */
  scenarioBrief?: string;
};

export type Week = {
  week: number;
  title: string;
  /** the real-world capability this week unlocks */
  outcome: string;
  days: Day[];
};

export type Scenario = {
  id: string;
  title: string;
  /** shown to the learner before starting */
  setup: string;
  /** who the AI plays */
  role: string;
  /** where it happens, drives tone and vocabulary */
  place: string;
  /** what counts as finishing the conversation successfully */
  objective: string;
  /** who speaks first */
  opensWith: "partner" | "you";
  /** difficulty 1-3, gates which scenarios appear when */
  level: 1 | 2 | 3;
  tags?: string[];
};

/* ------------------------------------------------------------------ */
/* Learner state (persisted in localStorage)                           */
/* ------------------------------------------------------------------ */

export type ItemStat = {
  itemId: string;
  /** times seen in a drill or test */
  seen: number;
  /** times produced correctly */
  correct: number;
  /** times wrong — drives resurfacing */
  wrong: number;
  /** epoch ms of last review */
  lastSeen: number;
  /** spaced-repetition box 0..5; 0 = due now, 5 = retired */
  box: number;
};

export type Mistake = {
  at: number;
  /** item this mistake maps to, when we can attribute it */
  itemId?: string;
  /** what you said */
  said: string;
  /** what you should have said */
  fixed: string;
  /** one-line reason */
  why: string;
  /** where it happened */
  source: "drill" | "roleplay" | "test";
  /** short label used to cluster weak spots, e.g. "gender", "past tense" */
  category: string;
};

export type DayRecord = {
  day: number;
  completedAt: number;
  /** seconds actually spent */
  seconds: number;
  blocksDone: string[];
};

export type TestResult = {
  week: number;
  at: number;
  score: number; // 0..100
  /** item ids answered wrong, fed back into the plan */
  weakItemIds: string[];
  /** recurring themes, e.g. "verb endings in the past" */
  weakCategories: string[];
  summary: string;
};

export type Progress = {
  version: 1;
  startedAt: number;
  currentDay: number;
  days: Record<number, DayRecord>;
  stats: Record<string, ItemStat>;
  mistakes: Mistake[];
  tests: TestResult[];
  settings: {
    /** speechSynthesis rate for French audio */
    rate: number;
    /** show English translations by default in drills */
    showEnglish: boolean;
    voiceURI?: string;
  };
};

/* ------------------------------------------------------------------ */
/* API payloads                                                        */
/* ------------------------------------------------------------------ */

export type Turn = {
  role: "partner" | "you";
  /** French text */
  fr: string;
  /** English gloss of the partner's line, shown on demand */
  en?: string;
};

export type Correction = {
  /** true when what you said was natural and correct as-is */
  ok: boolean;
  /** the corrected French; equals your text when ok */
  fixed: string;
  /** one line, in English, explaining the fix. empty when ok */
  why: string;
  /** a more natural / more French way to say the same thing, when one exists */
  better?: string;
  /** short cluster label for weak-spot tracking */
  category: string;
};

export type RoleplayResponse = {
  correction: Correction;
  /** the partner's next line, in French */
  reply: string;
  /** English gloss of the reply */
  replyEn: string;
  /** true when the scenario objective has been met */
  done: boolean;
  /** optional nudge shown under the reply, in English */
  hint?: string;
};
