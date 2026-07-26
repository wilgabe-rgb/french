# Parlons

Ninety days of usable French for travel, work and daily life. Twenty minutes a
day, built around speaking and listening rather than grammar drills or streaks.

## What it does

- **90 days × ~8 phrases** — 720 items, the ones you actually use. Every one has
  a pronunciation respelling, audio, and one natural example sentence. Grammar
  notes appear only when getting the rule wrong would make you say the phrase
  incorrectly, and they are one sentence long.
- **Four blocks a day, twenty minutes:** warm-up (your own past mistakes) →
  today's phrases → speaking drill → live conversation.
- **A conversation partner** that plays a real person in a real situation —
  a baker, a landlord, an SNCF agent, someone at a party — opens the scene,
  waits for you every turn, corrects what you said, and keeps going in character.
- **Weekly checks** on days 7, 14, 21… written from what you have been getting
  wrong, marked, and fed straight back into next week's warm-ups.

## Running it

```bash
npm install
npm run dev
```

The AI features run on xAI Grok. Put your key in `.env.local`:

```
XAI_API_KEY=xai-...
```

Optionally set `GROK_MODEL` to try a different one — the default is
`grok-4.20-non-reasoning`, chosen because these are short conversational turns
where latency matters more than deliberation. To swap providers entirely,
change `MODEL` in `lib/ai.ts` and install the matching `@ai-sdk/*` package.

Everything except the AI routes works offline — the curriculum, audio and
progress tracking are all local.

## Multiple learners

Anyone types a name on the Progress page and starts at day 1 at their own pace.
Type the same name again — on any device — and you carry on from exactly where
you stopped. Each learner's days, weak spots, warm-ups and weekly tests are
built only from their own mistakes; the tables are row-level-security scoped per
account, so one learner cannot read or write another's.

**There is no password: the name is the login.** Anyone who types your name
opens your progress, and two people picking the same name share one account.
That is a deliberate trade for zero friction among people who trust each other —
don't use it for anything you would mind a housemate reading. A "Use Google
instead" link is on the same screen for anyone who wants their account locked.

Because the accounts are addressed by name rather than email, sign-up must not
wait on an emailed code, so `require_email_verification` is off in
`insforge.toml`. Turning it back on will lock every name-based learner out.

Progress is stored per account in the browser as well as on the server, so two
people sharing a laptop never inherit each other's day. Work done before signing
in is adopted only by an account with no history anywhere.

## Syncing across devices

Optional. Signed out, progress lives in `localStorage` and never leaves the
device. Sign in on the Progress page and it is mirrored to InsForge, so your
days, weak spots and test results follow you to a phone.

```
NEXT_PUBLIC_INSFORGE_URL=https://<project>.us-east.insforge.app
NEXT_PUBLIC_INSFORGE_ANON_KEY=anon_...
```

Both are safe in the browser — every table is row-level-security scoped to the
signed-in user, so the anon key alone reaches nothing. With the variables unset
the app simply runs local-only; nothing throws.

Local storage stays the source of truth. Writes are pushed a few seconds after
you stop working, and sign-in reconciles both sides rather than overwriting:
attempt counts take the higher value, the most recent answer decides an item's
review box, and mistakes and test results are unioned on their natural keys. A
failed push is silent and retried by the next change — you cannot lose your
place because the network dropped.

## Where things live

| Path | What |
| --- | --- |
| `lib/curriculum/w01…w13.ts` | The 90 days of content, one file per week |
| `lib/scenarios.ts` | The 29 roleplay situations |
| `lib/progress.ts` | Spaced repetition and the weak-spot engine |
| `lib/speech.ts` | Text-to-speech, microphone input, answer matching |
| `app/api/roleplay` | The conversation partner |
| `app/api/test` | Weekly test generation and marking |
| `app/api/check` | Marks a drill answer that didn't match exactly |

Progress is stored in `localStorage` under `parlons.progress.v1`, so it stays on
your device and needs no account.

## Editing the course

Content is plain data. Each day is a `day(...)` call with rows in a fixed order:

```ts
["je voudrais", "I would like", "zhuh voo-DREH",
 "Je voudrais un croissant, s'il vous plaît.", "I'd like a croissant, please.",
 { note: "Use je voudrais rather than je veux — je veux sounds blunt." }]
```

Add or reorder rows in the week file and the drills, tests and warm-ups pick it
up automatically.

## Browser support

Speech synthesis (the French audio) works everywhere. Microphone input uses the
Web Speech API, which is Chrome and Edge only — elsewhere the app asks you to
say it out loud and then type it, and nothing else changes.
