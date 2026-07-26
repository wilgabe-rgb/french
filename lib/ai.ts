import { xai } from "@ai-sdk/xai";
import { z } from "zod";

/**
 * One model for everything, via xAI directly (needs XAI_API_KEY).
 * Non-reasoning is the right call here: these are short turns where latency
 * matters more than deliberation. Override with GROK_MODEL to try another.
 */
export const MODEL = xai(process.env.GROK_MODEL ?? "grok-4.20-non-reasoning");

export const correctionSchema = z.object({
  ok: z
    .boolean()
    .describe("true if the learner's French was correct and natural as written"),
  fixed: z
    .string()
    .describe(
      "the corrected French sentence; repeat their sentence unchanged when ok is true",
    ),
  why: z
    .string()
    .describe(
      "ONE short English sentence explaining the fix, covering only what a listener would hear as wrong. Never mention accents, spelling or punctuation, even alongside a real error. Empty string when ok is true.",
    ),
  better: z
    .string()
    .describe(
      "a more natural French alternative a native would use, or empty string if theirs was already natural",
    ),
  category: z
    .string()
    .describe(
      "two-to-three word label for the type of error, e.g. 'gender agreement', 'past tense', 'word order', 'vocabulary', 'none'",
    ),
});

export const roleplaySchema = z.object({
  correction: correctionSchema,
  reply: z.string().describe("your next line, in French, in character"),
  replyEn: z.string().describe("English translation of your reply"),
  done: z
    .boolean()
    .describe("true only when the scenario objective has actually been met"),
  hint: z
    .string()
    .describe(
      "optional English nudge about what to say next; empty string if not needed",
    ),
});

export const questionSchema = z.object({
  id: z.string(),
  kind: z
    .enum(["recall", "speak", "listen", "fix"])
    .describe(
      "recall = produce the French for an English prompt; speak = respond aloud to a situation; listen = you hear French and answer; fix = correct a wrong sentence",
    ),
  prompt: z.string().describe("the question, in English unless kind is listen"),
  /** French text the learner should hear read aloud, for listen questions */
  audio: z.string().describe("French to be spoken aloud, or empty string"),
  expected: z
    .string()
    .describe("a model answer in French — one acceptable version"),
  itemId: z
    .string()
    .describe("id of the curriculum item this tests, or empty string"),
});

export const testSchema = z.object({
  questions: z.array(questionSchema).min(6).max(12),
});

export const gradeSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      correct: z.boolean(),
      fixed: z.string().describe("the corrected French"),
      why: z
        .string()
        .describe("ONE short English sentence. Empty when correct."),
      category: z.string().describe("two-to-three word error label, or 'none'"),
      itemId: z.string(),
    }),
  ),
  score: z.number().min(0).max(100),
  summary: z
    .string()
    .describe(
      "2–3 sentences in English: what's solid, what's weak, what changes next week",
    ),
  weakCategories: z
    .array(z.string())
    .describe("the recurring error themes, most important first"),
  focus: z
    .array(z.string())
    .describe(
      "3 concrete things to drill in the coming week, phrased as instructions",
    ),
});

/**
 * Surface the real reason instead of a generic 502. The three things that
 * actually go wrong are: no credentials, no card on the Vercel account, and
 * rate limits — and each needs a different fix from the person running this.
 */
/**
 * Flatten everything useful out of a thrown provider error: the message, the
 * HTTP response body (where the API puts the actual reason — the message is
 * often just "Bad Request"), and the same again for any wrapped cause.
 */
export function errorDetail(err: unknown, depth = 0): string {
  if (!err || typeof err !== "object" || depth > 3) return String(err ?? "");
  const o = err as Record<string, unknown>;
  return [
    typeof o.message === "string" ? o.message : "",
    typeof o.responseBody === "string" ? o.responseBody : "",
    o.cause ? errorDetail(o.cause, depth + 1) : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function aiErrorMessage(err: unknown): string {
  const raw = errorDetail(err);

  if (/api key|unauthor|401|invalid.*key|credential/i.test(raw)) {
    return "No valid xAI credentials. Set XAI_API_KEY in .env.local (and in the Vercel project) and restart.";
  }
  if (/credit|billing|payment|quota.*exceed/i.test(raw)) {
    return "Your xAI account is out of credit. Top it up at console.x.ai.";
  }
  if (/rate limit|429/i.test(raw)) {
    return "Rate limited by xAI. Wait a moment and try again.";
  }
  return "The tutor is unavailable right now. Check the server logs for details.";
}

/** Shared voice for every AI role in the app. */
export const TUTOR_RULES = `
You are helping an English speaker become conversational in everyday French for
living and working in France.

Non-negotiable rules:
- THE LEARNER IS SPEAKING, NOT WRITING. Their words reach you through speech
  recognition, so accents, spelling, capitalisation and punctuation are things
  a listener could never hear. Judge only what would be wrong said out loud.
  Never correct or even mention an accent, a spelling or a missing apostrophe —
  write the correction with correct accents, but do not comment on them.
- Read unaccented words charitably. "reserve" after "j'ai" is "réservé", "achete"
  is "acheté", "prefere" is "préfère". When an unaccented word could be several
  accented forms, assume the one that fits the sentence. Never treat a missing
  accent as a different word, a wrong verb form or a wrong tense.
- Correct only what would make a French person misunderstand, wince, or switch
  to English.
- Explanations are ONE sentence, in English, and only about what they got wrong.
  Never give a grammar lecture. Never list rules they didn't ask about.
- Prefer what people actually say over what textbooks teach.
- Never switch to English in your in-character dialogue.
- Keep your French at the level of someone who has studied for the number of
  days given, plus a little stretch. Short sentences. Everyday vocabulary.
`.trim();
