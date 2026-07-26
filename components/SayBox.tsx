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
  const { listening, transcribing, start, stop, supported, error } = useMic(
    (heard) => setText((t) => (t ? `${t} ${heard}` : heard)),
  );

  useEffect(() => {
    // On a phone, focusing throws up the keyboard and buries the very prompt
    // you're meant to be answering. Touch users open it themselves, or — the
    // point of the exercise — just talk.
    if (!autoFocus) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    inputRef.current?.focus();
  }, [autoFocus]);

  const send = () => {
    const value = text.trim();
    if (!value || disabled) return;
    onSubmit(value);
    if (clearOnSubmit) setText("");
  };

  return (
    <div className="space-y-2">
      {/*
       * Three controls will not sit side by side on a 360px screen without
       * squeezing the field down to nothing, so on a phone the field takes the
       * full width and the mic — the button you actually want — gets a whole
       * row and a name. `sm:contents` folds it all back into one row further up.
       */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          disabled={disabled}
          placeholder={
            listening
              ? "Listening… tap the mic again when you're done"
              : transcribing
                ? "Working out what you said…"
                : placeholder
          }
          lang="fr"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="sentences"
          spellCheck={false}
          enterKeyHint="send"
          className="fr w-full min-w-0 rounded-xl border border-line bg-panel px-4 py-3 text-lg outline-none transition placeholder:font-sans placeholder:text-sm placeholder:text-muted focus:border-accent sm:order-2 sm:flex-1"
        />
        <div className="flex gap-2 sm:contents">
          {supported && (
            <button
              type="button"
              onClick={listening ? stop : start}
              disabled={disabled || transcribing}
              aria-pressed={listening}
              aria-label={listening ? "Stop recording" : "Start speaking"}
              className={`flex h-13 flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition sm:order-1 sm:h-11 sm:w-11 sm:flex-none sm:rounded-full ${
                listening
                  ? "listening border-bad bg-bad-soft text-bad"
                  : "border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z"
                />
              </svg>
              <span className="sm:hidden">
                {listening ? "Stop" : transcribing ? "Working…" : "Speak"}
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={send}
            disabled={disabled || !text.trim()}
            className="h-13 shrink-0 rounded-xl bg-accent px-6 text-sm font-medium text-bg transition hover:opacity-90 sm:order-3 sm:h-auto sm:px-4 sm:py-3"
          >
            Send
          </button>
        </div>
      </div>
      {!supported && (
        <p className="text-xs text-muted">
          This browser has no microphone access — say it out loud anyway, then
          type what you said.
        </p>
      )}
      {error === "no-mic-permission" && (
        <p className="text-xs text-bad">
          The mic is blocked. Allow microphone access for this site, then try
          again.
        </p>
      )}
      {error && error !== "unsupported" && error !== "no-mic-permission" && (
        <p className="text-xs text-bad">{error}</p>
      )}
    </div>
  );
}
