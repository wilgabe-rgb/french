import { transcribe } from "ai";
import { xai } from "@ai-sdk/xai";
import { aiErrorMessage, errorDetail } from "@/lib/ai";

export const maxDuration = 60;

/** Roughly 60s of speech. Anything larger is a stuck recorder, not a sentence. */
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Speech-to-text for browsers without the Web Speech API (Firefox, Safari,
 * most of mobile). Chrome and Edge never reach this route — they transcribe
 * on-device for free. Everyone else records audio and we send it to Grok.
 */
export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.startsWith("audio/") && !contentType.startsWith("video/")) {
    return Response.json(
      { error: "Send raw audio with an audio/* content-type." },
      { status: 400 },
    );
  }

  const buf = await req.arrayBuffer();
  if (buf.byteLength === 0) {
    return Response.json({ error: "Empty recording." }, { status: 400 });
  }
  if (buf.byteLength > MAX_BYTES) {
    return Response.json({ error: "Recording too long." }, { status: 413 });
  }

  try {
    const result = await transcribe({
      model: xai.transcription(),
      audio: new Uint8Array(buf),
      providerOptions: { xai: { language: "fr" } },
    });

    return Response.json({ text: result.text.trim() });
  } catch (err) {
    console.error("transcribe error", err, "content-type:", contentType);

    // The API sniffs the container from the file header and rejects some
    // outright (WAV among them). Say so plainly — it is the one failure here
    // that depends on which browser the learner happens to be using. The
    // detail lives in responseBody, not in the error message ("Bad Request").
    // Account-level failures need the learner to do something different from a
    // format failure, so those keep their specific message. Everything else
    // that reaches here means we could not turn this recording into text, and
    // the only useful thing to say is which container it was and to type.
    const detail = errorDetail(err);
    const accountProblem =
      /api key|unauthor|401|credential|credit|billing|payment|quota|rate limit|429/i.test(
        detail,
      );

    if (accountProblem) {
      return Response.json({ error: aiErrorMessage(err) }, { status: 502 });
    }

    return Response.json(
      {
        error: `Couldn't read the audio this browser produced (${contentType}). Type your answer instead.`,
      },
      { status: 415 },
    );
  }
}
