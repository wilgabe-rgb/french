"use client";

import { useEffect, useRef, useState } from "react";
import { useMic } from "@/lib/speech";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  /** clears the field after submit — off for the drill, on for conversation */
  clearOnSubmit?: boolean;
  autoFocus?: boolean;
};

/**
 * The one input used everywhere: hold the mic and speak, or type if the browser
 * has no speech recognition. Dictation lands in the box so you can fix it before
 * sending — speech recognition mangles enough that blind submission is unfair.
 */
export function SayBox({
  onSubmit,
  disabled,
  placeholder = "Say it, or type it…",
  clearOnSubmit = true,
  autoFocus,
}: Props) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { listening, start, stop, supported, error } = useMic((heard) =>
    setText((t) => (t ? `${t} ${heard}` : heard)),
  );

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const send = () => {
    const value = text.trim();
    if (!value || disabled) return;
    onSubmit(value);
    if (clearOnSubmit) setText("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {supported && (
          <button
            type="button"
            onClick={listening ? stop : start}
            disabled={disabled}
            aria-pressed={listening}
            aria-label={listening ? "Stop recording" : "Start speaking"}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition ${
              listening
                ? "listening border-bad bg-bad-soft text-bad"
                : "border-line text-muted hover:border-accent hover:text-accent"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z"
              />
            </svg>
          </button>
        )}
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          disabled={disabled}
          placeholder={listening ? "Listening…" : placeholder}
          lang="fr"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="fr min-w-0 flex-1 rounded-xl border border-line bg-panel px-4 py-3 text-lg outline-none transition placeholder:font-sans placeholder:text-sm placeholder:text-muted focus:border-accent"
        />
        <button
          type="button"
          onClick={send}
          disabled={disabled || !text.trim()}
          className="shrink-0 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-bg transition hover:opacity-90"
        >
          Send
        </button>
      </div>
      {!supported && (
        <p className="text-xs text-muted">
          Your browser can&apos;t do speech input — say it out loud anyway, then
          type what you said. Chrome and Edge support the mic.
        </p>
      )}
      {error && error !== "unsupported" && (
        <p className="text-xs text-bad">
          Mic problem ({error}). Check the site has microphone permission.
        </p>
      )}
    </div>
  );
}
