"use client";

import type { Item } from "@/lib/types";
import { Speaker } from "./Speaker";

export function PhraseCard({
  item,
  rate,
  voiceURI,
}: {
  item: Item;
  rate?: number;
  voiceURI?: string;
}) {
  return (
    <article className="rounded-2xl border border-line bg-panel p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="fr text-xl leading-tight sm:text-2xl">{item.fr}</h3>
          <p className="mt-1 text-sm text-muted">{item.en}</p>
        </div>
        <Speaker text={item.fr} rate={rate} voiceURI={voiceURI} slow />
      </div>

      <p className="say mt-3 text-accent">{item.say}</p>
      {item.tip && <p className="mt-1 text-xs text-muted">{item.tip}</p>}

      <div className="mt-4 border-t border-line pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="fr text-base">{item.ex}</p>
            <p className="mt-0.5 text-sm text-muted">{item.exEn}</p>
          </div>
          <Speaker text={item.ex} rate={rate} voiceURI={voiceURI} />
        </div>
      </div>

      {item.note && (
        <p className="mt-3 rounded-lg bg-accent-soft px-3 py-2 text-xs text-ink">
          <span className="font-medium">Grammar, once: </span>
          {item.note}
        </p>
      )}
    </article>
  );
}
