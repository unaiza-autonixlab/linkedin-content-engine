# Skill: Post Generation

Triggered when you says **"generate this week's posts"**.

Produces exactly 4 posts for the week and appends them to the queue. Not 3, not
6. Four, one per slot.

---

## Read first, in this order

1. `PUBLISHING-RULES.md`, absolute. Overrides everything, including voice.md.
   Build log material contains client secrets and confidential unit economics.
2. `skills/voice.md`, how you sounds. Overrides this file on any style question.
3. `STRATEGY.md`, why each slot exists.

## Inputs

| Slot | Source |
|---|---|
| Mon PAIN | `pain-library.md`, newest entry |
| Wed PROOF | `build-log.md` (first person material, required) |
| Thu MECHANISM | `mechanism-library.md` |
| Fri OPINION | `pain-library.md`, debates section |

If `build-log.md` has no real entries, do NOT generate a PROOF post from Reddit
material or from the mechanism library. Output the slot as BLOCKED and say what
is needed. A missing post is better than a fabricated one.

## Output

Append 4 posts to `output/queue.md`, dated for the week **after** next. Never
generate for the current week. The buffer is the point.

---

## THE GATE, applies to all four slots

Before writing anything, read the SPECIFICITY TEST in `voice.md` and the hook
and structure patterns in `references/craft.md`.

Two rules, and they are not the same rule.

**1. The subject is always the reader's problem.** Reddit decides the topic,
because Reddit is the audience saying out loud what they care about. Topic
selection is what drives engagement.

**2. The post must not be generic.** It needs a sharp angle, a concrete
scenario, a precise number, a real phrase buyers use, or a clear position. See
the SPECIFICITY TEST in `voice.md` for the five ways to get there.

**Build log material is evidence, not subject.** Corrected 2026-07-20 after
build log led posts underperformed. A post about your pipeline is a post about
your, and the audience does not care. Use a mechanism only where it strengthens a
point about the reader's problem, in roughly **one post in three**. Never open
with it. Never make it the topic.

A post built entirely from Reddit is fine and often the best post of the week,
provided it has a real angle rather than a truism. Do NOT block a slot for
lacking build log material.

---

## Slot 1, Monday: PAIN

From the strongest pain in the newest library entry, weighted toward SERVICE
MATCH pains.

- Second person. "You" is the founder or agency operator living it.
- Use the audience's own vocabulary from the exact phrases section. If ten people
  said "the numbers never match", use that, not "cross-platform discrepancy."
- Describe the ritual, not the concept. People recognise a Monday morning. Nobody
  recognises "data fragmentation."
- Do not solve it. Naming it precisely is the entire post. Solving it in the last
  line turns it into an ad and costs you the trust the post just earned.
- **Anchor required.** The post must land on a specific thing you found in your
  own work. Structure: the reader's problem, your specific experience of it, what
  it means for them. Reddit quotes may appear but must never carry the post.

## Slot 2, Wednesday: PROOF

From the freshest `build-log.md` material.

- Outcome first, technology last. What changed for a human. If the tech does not
  fit in one line near the end, cut it.
- Real numbers only where the build log contains them, and only where
  `PUBLISHING-RULES.md` permits. Never estimate a number into existence.
- First person is allowed here and only here, because it actually happened.
- Client stays anonymous. "A DTC client." Never the brand, never a stakeholder.
- Any margin, revenue, spend, churn, LTV or subscriber figure is forbidden even
  if it appears in the build log.

## Slot 3, Thursday: MECHANISM

From `mechanism-library.md`. This is the differentiator pillar.

- One mechanism per post. Never list several. A list is magnet material, not a
  post.
- Structure: the symptom a reader would recognise, then the cause, then what it
  means for their decisions.
- The cause must be specific and technical enough to be unfakeable. Vagueness
  here destroys the entire value of the pillar.
- No pitch. The competence is the pitch.
- Mark the entry used in `mechanism-library.md` so it is not reused.

Every 2nd week this slot is replaced by a LEAD MAGNET post. See below.

## Slot 4, Friday: OPINION

From a debate in the library.

- Take a clear side. No "both sides have a point." A post that refuses to commit
  is a summary, and nobody argues with a summary.
- Reason from real experience: the build log or actual work, not theory and not
  whichever side Reddit upvoted.
- The strongest version takes the less popular side and is right. Check the
  library's "popular side vs correct side" note.
- Argue with a position, never a person. Never quote a Redditor to dunk on them.
- **Anchor required.** The opinion must be earned by something you personally
  hit, not by general industry knowledge. "Retargeting takes credit it did not
  earn" is true and has been written a thousand times. The version anchored to a
  specific thing you found in an account is hers.

---

## The lead magnet post, every 2nd Thursday

Cadence is roughly 1 in 8 posts. See STRATEGY.md for why this is far lower than
the usual advice, and for the honest note that the evidence base is thin.

- The magnet must be a **diagnostic**, not a template. It reveals a problem you
  is uniquely positioned to fix. Checklists give away value and create no
  urgency. Diagnostics create urgency and give away nothing.
- Preferred, in order: the free attribution audit (capped, "four this month"),
  the "13 ways your numbers are lying" document, the existing calculator.
- The post itself still has to earn its place. Lead with the problem, not the
  offer. The ask goes in the last line, once.
- Put any link in the first comment, not the post body. External links are
  deprioritized, and this is one of the better corroborated findings.
- Never run two magnets in the same week under any circumstances.

---

## Format mix, do not make all four text

Text is the lowest engagement format on LinkedIn, 3.95% and falling, while
documents and carousels lead at 7.00% (Socialinsider, 1.3M posts). That is page
level data and you post from a profile, so treat it as directional rather than
absolute. But a week of four text posts is fighting the gradient for no reason.

Target per week: **1 carousel, 1 image, 2 text.**

Assign by content shape using `skills/design.md`, not by slot position:

- MECHANISM is usually the carousel. It has a "here is why" chain, which is
  exactly what the format is for
- PAIN or PROOF often works as a single image, when one number or one line
  carries it
- OPINION is almost always text. Argument and nuance do not survive slides

## Rules for all posts

- Hook works standalone. LinkedIn truncates after 2 to 3 lines.
- Under 150 words.
- Every rule in `voice.md` applies. No em dashes, no motivational ending, no
  "What do you think?", max 3 hashtags.
- The four posts must feel like four different days. If PAIN and MECHANISM circle
  the same point, change one.
- Optimise for saves, not likes. Saves drive roughly 5x the reach of a like, and
  save-worthy material suits your better than engagement mechanics do.

## Anti repetition check, before writing

Read the previous 3 weeks in `/output` plus the current `queue.md`. Extract every
pain angle used. Do not reuse an angle within 3 weeks.

Same broad topic is fine if the angle is genuinely new. "Numbers don't match" can
recur as a topic. "Meta vs Shopify attribution windows" cannot, not within 3
weeks. If the strongest pain is blocked, drop to the next and note the swap.

## Queue format

```markdown
## Week of YYYY-MM-DD

### MON, PAIN
[post text, ready to paste]
**SOURCE:** ...
**CONFIDENCE:** HIGH / NEEDS CHECK, [what to verify]
**STATUS:** [ ] not posted

### WED, PROOF
...
```

## Confidence

- **HIGH.** Every claim is from the build log verbatim, or a general observation
  you can defend without checking. Safe to post as is.
- **NEEDS CHECK.** Contains a number, a client specific, or a technical claim
  about platform behaviour. You reads it first.

Default to NEEDS CHECK. Everything sourced from `mechanism-library.md` is NEEDS
CHECK by default, because those entries were summarised from the log rather than
written by you.

## After generating

Print all 4 posts in chat so you can read them without opening the file. Then ask
which to change. Do not ask if you liked them.
