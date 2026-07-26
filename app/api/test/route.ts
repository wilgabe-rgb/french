import { generateText, Output } from "ai";
import {
  MODEL,
  TUTOR_RULES,
  aiErrorMessage,
  gradeSchema,
  testSchema,
} from "@/lib/ai";

export const maxDuration = 90;

type GenerateBody = {
  mode: "generate";
  week: number;
  day: number;
  /** everything taught so far, as "fr — en" lines */
  pool: string[];
  /** ids + text of things they keep getting wrong */
  weakItems: { id: string; fr: string; en: string }[];
  /** recurring error themes from roleplay and drills */
  weakCategories: string[];
};

type GradeBody = {
  mode: "grade";
  week: number;
  answers: {
    id: string;
    kind: string;
    prompt: string;
    expected: string;
    said: string;
    itemId: string;
  }[];
};

type Body = GenerateBody | GradeBody;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  try {
    if (body.mode === "generate") return await generate(body);
    return await grade(body);
  } catch (err) {
    console.error("test error", err);
    return Response.json({ error: aiErrorMessage(err) }, { status: 502 });
  }
}

async function generate(b: GenerateBody) {
  const system = `${TUTOR_RULES}

You are writing the end-of-week check for week ${b.week} (day ${b.day} of 90).
This is a speaking and recall test, not a grammar quiz.

Write 8 questions:
- 4 of kind "recall": give an everyday English situation, they produce the French.
- 2 of kind "speak": a real situation prompt they must respond to out loud with a
  full sentence, e.g. "The waiter asks if you want the set menu. Turn it down and
  ask for the à la carte."
- 1 of kind "listen": put natural French in the audio field and ask in English
  what they would reply. The prompt must make sense without seeing the audio text.
- 1 of kind "fix": show a sentence with a realistic learner mistake in the prompt
  and ask them to say it correctly.

Rules:
- Only test things from the material below.
- Weight the test towards their weak spots — at least half the questions should
  hit something they've been getting wrong.
- Set itemId when a question maps to one of the supplied items, otherwise "".
- Keep prompts short. No multiple choice.`;

  const prompt = `Material taught so far:
${b.pool.join("\n")}

Things they keep getting wrong (id — French — English):
${b.weakItems.map((i) => `${i.id} — ${i.fr} — ${i.en}`).join("\n") || "nothing recorded yet"}

Recurring error themes: ${b.weakCategories.join(", ") || "none recorded yet"}

Write the test.`;

  const { output } = await generateText({
    model: MODEL,
    system,
    prompt,
    output: Output.object({ schema: testSchema }),
  });

  return Response.json(output);
}

async function grade(b: GradeBody) {
  const system = `${TUTOR_RULES}

You are marking the week ${b.week} test. Input came from speech recognition, so
ignore accents, capitalisation and punctuation completely.

Accept any answer a French person would understand and find natural, even when
it differs from the model answer. Mark wrong only when it would actually cause a
problem in conversation.

For every answer give: correct, the corrected French, ONE English sentence saying
why (empty when correct), and a short category label.

Then: a score out of 100, a 2–3 sentence summary of what's solid and what's weak,
the recurring weak categories, and 3 concrete things to drill next week.`;

  const prompt = b.answers
    .map(
      (a, i) =>
        `Q${i + 1} [id=${a.id}] [itemId=${a.itemId}] (${a.kind})
Asked: ${a.prompt}
Model answer: ${a.expected}
They said: "${a.said || "(no answer)"}"`,
    )
    .join("\n\n");

  const { output } = await generateText({
    model: MODEL,
    system,
    prompt,
    output: Output.object({ schema: gradeSchema }),
  });

  return Response.json(output);
}
