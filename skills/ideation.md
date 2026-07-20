# Skill: Ideation

Triggered when you says **"give me post ideas"**, **"what should I post"**, or
opens the terminal wanting something to publish.

This is the front door of the whole system. You should be able to arrive with no
context loaded and leave with something you can post.

---

## What to do

### 0. Check the other sources first

Reddit is one input. `objections.md` (real sales call objections) outranks it,
because it is pain from people who nearly paid. If it has entries that have not
become posts, offer those first.

See `references/idea-sources.md` for the full ranked list.

### 1. Read the bank

`idea-bank.md` holds every topic mined from Reddit, each with a status:

- `AVAILABLE`, not used yet
- `DRAFTED`, copy written, sitting in `output/queue.md`
- `POSTED`, published, with the date

Never re-offer a `POSTED` idea unless you asks for a rerun with a new angle.

### 2. Offer 3, not 14

Do not paste the bank at you. That recreates the blank page problem in a new
form, which is the thing this system exists to remove.

Pick 3 `AVAILABLE` ideas and lead with the strongest. Weight by:

- **Timeliness.** Anything tied to a live event decays fast. A platform outage
  is worth more this week than any evergreen topic.
- **How many people are living it.** Frequency and comment volume in the source
  threads.
- **Format variety.** If the last two posts were text, lead with a carousel
  candidate.
- **Pillar rotation.** Do not offer three pains in a row.

### Scoring, before you offer anything

Score each candidate. It needs a yes on at least four, and **must** have a yes
on the first two or it does not get offered.

1. **Is someone living this right now?** Frequency and emotional intensity in the
   source threads. One furious post beats five shrugging mentions.
2. **Is there an angle, or only a topic?** "Attribution is hard" is a topic, and
   topics produce generic writing. "Your Google ROAS went up because you turned
   Meta off" is an angle. If you cannot write the hook line, there is no idea yet.
3. **Would a competent stranger write it the same way?** If yes, drop it. See the
   SPECIFICITY TEST in `voice.md`.
4. **Is it save-worthy?** Saves carry roughly 5x the reach of a like. Reference
   material and teardowns get saved. Hot takes do not.
5. **Does it decay?** Anything tied to a live event is worth more this week than
   any evergreen idea. Say so when it applies.
6. **Does it map to what you sell?** Not required for any single post. But a
   week with no SERVICE MATCH idea builds an audience that never buys.
7. **Is there a real position in it?** Summaries get no comments. Sides do.

Hook and structure patterns are in `references/craft.md`. Use them to write the
hook line before offering the idea, not after you pick it.

For each idea give your, in about four lines:

- The hook line, written out, not described
- Why it will land, in one sentence
- The format you would use and why
- Whether it needs a fact check from your

### 3. You pick, you write

Once you pick, generate the actual thing:

- **Text post** → append to `output/queue.md` in the standard format
- **Static image** → write `content/<slug>.json`, run `node render.js`, then
  write the caption into the queue
- **Carousel** → write `content/<slug>.json` with slides, render, write the
  caption and the document title into the queue

Format rules live in `skills/design.md`. Voice rules live in `skills/voice.md`
and they win every disagreement.

### 4. Update state

Flip the idea to `DRAFTED` in `idea-bank.md`. Note the date and the format used.

---

## When the bank runs low

Below about 5 `AVAILABLE` ideas, tell your the bank needs refilling and that it
takes an Apify run plus an analysis pass. Do not silently run it, since it costs
real money against a small monthly credit.

If the credit is exhausted, say so plainly and offer the alternative: pull ideas
from `pain-library.md` entries that were never converted to posts, or from
`mechanism-library.md`.

## What not to do

- Do not offer an idea with no angle. "Post about attribution" is not an idea. A
  hook line is an idea.
- Do not offer more than 3. Choice paralysis is the enemy here.
- Do not ask what you feels like posting about. That is the exact decision this
  system exists to make for you.
- Do not lead with build log material. The subject is always the reader's
  problem. See `voice.md`.
