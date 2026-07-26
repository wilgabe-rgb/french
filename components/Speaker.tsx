"use client";

import { useEffect, useState } from "react";
import { speak, speechAvailable } from "@/lib/speech";

type Props = {
  text: string;
  rate?: number;
  voiceURI?: string;
  /** "slow" adds a second button at 0.6× for picking apart the sounds */
  slow?: boolean;
  label?: string;
};

export function Speaker({ text, rate = 0.95, voiceURI, slow, label }: Props) {
  const [ok, setOk] = useState(true);
  useEffect(() => setOk(speechAvailable()), []);

  if (!ok) return null;

  // 40px targets: these get tapped constantly, often one-handed
  return (
    <span className="inline-flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={() => speak(text, { rate, voiceURI })}
        aria-label={label ?? `Play: ${text}`}
        className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent active:bg-accent-soft"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 9v6h4l5 4V5L8 9H4Zm11.5 3a3.5 3.5 0 0 0-2-3.16v6.32A3.5 3.5 0 0 0 15.5 12Zm-2 6.9a7 7 0 0 0 0-13.8v1.55a5.5 5.5 0 0 1 0 10.7v1.55Z"
          />
        </svg>
      </button>
      {slow && (
        <button
          type="button"
          onClick={() => speak(text, { rate: 0.6, voiceURI })}
          aria-label={`Play slowly: ${text}`}
          className="grid h-10 place-items-center rounded-full border border-line px-2.5 text-[11px] text-muted transition hover:border-accent hover:text-accent active:bg-accent-soft"
        >
          slow
        </button>
      )}
    </span>
  );
}
