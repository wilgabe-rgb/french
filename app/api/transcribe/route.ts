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
    if (/audio format|file header/i.test(errorDetail(err))) {
      return Response.json(
        {
          error: `This browser records audio as ${contentType}, which the transcriber can't read. Type your answer instead.`,
        },
        { status: 415 },
      );
    }

    return Response.json({ error: aiErrorMessage(err) }, { status: 502 });
  }
}
