import { generateText, Output } from "ai";
import { MODEL, TUTOR_RULES, aiErrorMessage, roleplaySchema } from "@/lib/ai";
import { scenarioById } from "@/lib/scenarios";
import { getDay } from "@/lib/curriculum";

export const maxDuration = 60;

type Body = {
  scenarioId: string;
  day: number;
  /** conversation so far, oldest first */
  history: { role: "partner" | "you"; fr: string }[];
  /** what the learner just said; empty string means "open the scene" */
  said: string;
  /** extra instruction for this particular run */
  brief?: string;
  /** things they keep getting wrong, so the partner can probe them */
  weakSpots?: string[];
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  const scenario = scenarioById(body.scenarioId);
  const day = getDay(body.day);
  const taughtToday = day?.items.map((i) => i.fr).join(", ") ?? "";

  const transcript = body.history
    .map((t) => `${t.role === "partner" ? "YOU(character)" : "LEARNER"}: ${t.fr}`)
    .join("\n");

  const opening = !body.said.trim();

  const system = `${TUTOR_RULES}

You are roleplaying a real situation in France. You play: ${scenario.role}.
Place: ${scenario.place}.
Situation: ${scenario.setup}
The learner's goal: ${scenario.objective}
${body.brief ? `Extra direction for this scene: ${body.brief}` : ""}

The learner is on day ${body.day} of 90. Phrases taught today: ${taughtToday}
${
  body.weakSpots?.length
    ? `They keep getting these wrong — work at least one into the scene naturally so they have to use it: ${body.weakSpots.join("; ")}`
    : ""
}

How to behave:
- Stay in character. Be a real person: impatient, chatty, distracted, whatever
  fits. Do not be a teacher inside the dialogue.
- ONE short turn at a time. Two sentences maximum. Then stop and wait.
- Ask something or say something that requires a response. Never monologue.
- Do not narrate, do not use stage directions, do not use emoji.
- If they say something correct, do not praise it — just react as the character
  would and move the conversation forward.
- Set done=true only once the learner has actually achieved the objective.
- Use hint only if they are stuck or silent — one short English nudge.

Correction:
- Judge only the learner's most recent line.
- Speech-to-text will drop accents and punctuation; never correct those.
- If their line is fine, ok=true, fixed = their line, why = "", category = "none".`;

  const prompt = opening
    ? `Open the scene. Speak first, in character, in French.`
    : `Conversation so far:
${transcript}

The learner just said: "${body.said}"

Correct that line if needed, then give your next in-character line.`;

  try {
    const { output } = await generateText({
      model: MODEL,
      system,
      prompt,
      output: Output.object({ schema: roleplaySchema }),
    });

    return Response.json(output);
  } catch (err) {
    console.error("roleplay error", err);
    return Response.json({ error: aiErrorMessage(err) }, { status: 502 });
  }
}
