import { generateText, Output } from "ai";
import { MODEL, TUTOR_RULES, aiErrorMessage, correctionSchema } from "@/lib/ai";

export const maxDuration = 45;

type Body = {
  /** what they were asked to say, in English */
  target: string;
  /** the model answer from the curriculum */
  expected: string;
  /** what they actually said */
  said: string;
};

/**
 * Used by the speaking drill when the learner's answer doesn't string-match the
 * expected one. Plenty of answers are right without being identical, so this
 * decides whether it was actually wrong before we mark it against them.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const system = `${TUTOR_RULES}

You are marking one spoken answer in a drill.
Accept ANY French that a native speaker would find correct and natural for the
task, even when it differs from the model answer. Only mark it wrong if a French
person would misunderstand it or find it clearly incorrect.
Input comes from speech recognition: ignore missing accents, capitalisation and
punctuation entirely.`;

  const prompt = `Task given to the learner (in English): ${body.target}
Model answer: ${body.expected}
What the learner said: "${body.said}"

Was that acceptable?`;

  try {
    const { output } = await generateText({
      model: MODEL,
      system,
      prompt,
      output: Output.object({ schema: correctionSchema }),
    });
    return Response.json(output);
  } catch (err) {
    console.error("check error", err);
    return Response.json({ error: aiErrorMessage(err) }, { status: 502 });
  }
}
