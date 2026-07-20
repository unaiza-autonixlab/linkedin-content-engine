# Craft Reference

Patterns for writing posts. Read alongside `skills/voice.md`, which overrides
anything here on style.

## Epistemic status, read this first

Two kinds of claim live in this file and they are labelled throughout.

- **[EVIDENCE]** comes from a cited study with a real sample.
- **[CRAFT]** is accumulated practitioner convention. Useful, widely believed,
  and unproven.

Research on 2026-07-21 looked hard for measured data on hook archetypes, post
endings, and optimal word counts, and **found none**. Not weak evidence, none.
Anyone publishing "the 7 hooks that get 10x reach" is sharing craft, not data.
So most of this file is [CRAFT], and it is marked that way rather than dressed
up as research.

Also worth knowing: Shield, the main public source of LinkedIn post-level
benchmarks, has shut down. Public evidence on this topic is getting thinner,
not richer.

---

## Format mix [EVIDENCE]

Socialinsider, 1.3M posts, Jan 2024 to Dec 2025:

| Format | Engagement |
|---|---|
| Native documents (carousels) | **7.00%** |
| Multi-image | 6.90% |
| Video | 5.90% |
| Single image | 5.20% |
| Poll | 4.50% |
| **Text only** | **3.95%**, down from 4.50% |
| Link | 3.30% |

Platform average 5.20%. Buffer separately reports carousels at roughly 6x
text-only engagement.

**Caveat that matters:** this is page-level data. Solo consultants post from
personal profiles, where text historically performs better than it does for
company pages. Treat the ordering as directional and the absolute numbers as
not transferable.

**What this changes:** a week of four text posts is fighting the format
gradient. Aim for at least one carousel and one image per week. Text is still
right for opinions and timely reactions, where words are the whole point.

## Signals worth optimising for [EVIDENCE]

From Hootsuite's algorithm analysis:

- **Saves are worth roughly 5x a like** in reach terms
- **Comments are worth roughly 2x a like**
- **Dwell time** is a major passive signal, so a post someone stops to read
  beats a post someone reflexively likes
- **Replying to comments lifts engagement about 30%.** The hour after posting is
  not optional
- ~~Posts resurface 2 to 3 weeks later~~ **RETRACTED 2026-07-21.** No dataset
  supports this and the measured picture contradicts it: Metricool finds 50% of
  a post's impressions land in the first 48 hours, and van der Blom puts most
  reach inside the first 90 minutes. Treat as folklore
- The algorithm parses meaning semantically now rather than matching hashtags

Practical read: write things people save and stop to read. That favours
reference material, teardowns, and specific mechanisms over hot takes.

---

## Hooks [CRAFT]

LinkedIn truncates the post behind "see more". The visible portion is the entire
advertisement for the rest.

**Unverified:** the commonly quoted truncation points are ~210 characters on
desktop and ~140 on mobile. Research could not confirm either, and both predate
recent interface changes. **Ten minute test worth doing once:** publish a post,
screenshot it on desktop and phone, count the characters shown. That single
measurement beats every blog citation on this subject.

Until then, the safe assumption is that **the first two lines are all you get**.

### Patterns that work

Each of these is a shape, not a formula to fill in mechanically.

**The correction.** State the thing everyone believes, then deny it.
> "Your Google ROAS did not go up because Google got better."

**The specific number.** A precise, strange figure implies a real story.
> "Exactly 22 orders were ever attributable to Meta."

**The plain confession.** Admit the thing practitioners feel and do not say.
> "Nobody can tell if it was them or the platform."

**The reframe.** Take the reader's question and reject its premise.
> "You are optimising the wrong number and you cannot see the right one."

**The consequence.** Lead with what it cost, not what happened.
> "That meeting cost me the account."

**Cold open.** Start mid-scene with no setup.
> "For weeks, a client believed their tracking was broken."

### Hooks that read as parody in 2026

- "Unpopular opinion:" followed by an entirely popular opinion
- "I'll say what nobody else will:"
- "Let me be blunt."
- "Here's the thing nobody tells you about X"
- Any hook promising a thread of secrets
- Rhetorical questions with obvious answers ("Want more clients?")
- "X changed my life. Here's why."

The test: if the hook would work equally well above any post in the category,
it is decoration. A good hook could only sit above this specific post.

---

## Structures [CRAFT]

Pick one deliberately. Drifting between structures is what makes a post feel
shapeless.

**Correction.** Belief, denial, mechanism, implication.
> Everyone thinks X. It is not X. Here is what is actually happening. So the
> decision you are about to make is wrong.

Best for opinion posts and contrarian takes.

**Scene to principle.** One concrete moment, then what it generalises to.
> A specific thing happened. Here is the detail that made it happen. This is
> not a one-off, it is structural.

Best for proof posts. Keeps the story short and the lesson earned.

**Recognition.** Describe the reader's ritual in detail, name why it hurts,
stop.
> Every Monday you do this. Then this breaks. Then you do it again. The problem
> is not the work, it is that a person is the integration layer.

Best for pain posts. Do not solve it. Naming it precisely is the post.

**Mechanism.** Symptom, cause, consequence.
> Here is what you see. Here is what is actually causing it. Here is what that
> means for your decisions.

Best for teardowns and the strongest carousel structure.

**Comparison.** Two things that should agree, do not, and why.
> A says 10. B says 6. Neither is lying. Here is the difference.

Best for stat images and short carousels.

---

## What kills a post [CRAFT]

- **Burying the point.** The best line is in paragraph four. Move it to line one.
- **Broetry taken to absurdity.** One line per paragraph is fine. One *word* per
  paragraph is a tell.
- **Humblebrag.** "Grateful to announce" doing the work of "look at me."
- **Fake vulnerability.** The "I failed for three years and then" arc, deployed
  as a device rather than remembered.
- **Over-explaining.** Trusting the reader is what makes writing feel confident.
- **Engagement bait.** "Comment YES if you agree." [EVIDENCE] LinkedIn's
  detection of this is explicitly improving, and its own policy prohibits
  artificially inflating engagement.
- **The summary ending.** Restating what you just said, in shorter words.
- **Generic.** The single biggest one. See the specificity test in `voice.md`.

---

## Endings [CRAFT]

No measured evidence exists on what generates comments. What follows is
reasoning, not data.

Two endings work:

1. **A question that invites disagreement.** It must be answerable "no". "Is
   there a single agency whose Meta number matches GA4?" invites an answer.
   "What do you think?" invites nothing.
2. **A flat contestable claim.** Something a reader wants to argue with. "Most
   agency reporting exists to survive the call, not to inform it."

Never a call to action. Never a summary.

The mechanism, if there is one: people comment when they have something to add
or something to dispute. Give them a specific position to react to.

---

## Length [CRAFT]

No measured optimum found. The 1,300 character personal post limit is real but
comes from a stale 2021 source.

House rule stays 150 words. Reasoning: dwell time is a real ranking signal
[EVIDENCE], but so is finishing. A short post that gets read fully beats a long
one that gets abandoned, and brevity forces the specificity that makes a post
worth reading.

---

## Formatting [EVIDENCE where marked]

- **Max 3 hashtags** [EVIDENCE, Buffer]. Zero is usually fine now that the
  algorithm parses semantically rather than matching tags.
- Line break every 1 to 2 sentences. White space is the format.
- No emoji bullets. No unicode bold. Both read as growth-hacking.

### The link penalty is bigger than "reduces engagement" [EVIDENCE]

Measured on **personal profiles**: **-27% impressions and -20% interactions**
(Metricool, 673k posts). An independent smaller test found roughly **-60% reach**
(River Editor, 300 posts). Two samples, same direction.

Note the asymmetry: company **pages** see the opposite, +51% impressions. You
posts from a profile, so the penalty applies.

**This is a strategy constraint, not a formatting tip.** LinkedIn structurally
cannot be a click-to-landing-page channel for a solo profile. Everything has to
route through the profile or a DM. Which makes the profile the conversion point
by default, whether or not it has been designed as one.

Links in the first comment remain the workaround. No performance data exists on
how well it still works.

### Frequency: posting more is not the lever [EVIDENCE]

- van der Blom: **1 to 3 posts per week** is the sweet spot, diminishing returns
  above it
- River Editor: 3 to 4, and daily posting without sustained engagement rates
  triggers suppression
- Buffer, 2M+ posts: 2 to 5 per week

Four posts a week sits at the top of every credible range. Treat it as a
ceiling, not a target. If time is short, cut posts before cutting comment
replies.

### Timing is folklore [EVIDENCE, by contradiction]

Four datasets, four incompatible answers:

| Source | Sample | Best days | Best times |
|---|---|---|---|
| Buffer | 4.8M posts | Wed, Thu, Fri. Mon/Tue worst | 3-8pm |
| van der Blom | 1.3M posts | Tue, Thu | 7-8am, 10-11am, 12-2pm, 4-6pm |
| River Editor | 300 posts | Tue-Thu. Mon/Fri worst | 7-9am, avoid 12-2pm |
| Metricool | 673k posts | - | 9am-12pm |

Buffer's 4.8M sample says Tuesday is worst; van der Blom says it is best.
Agorapulse says 12-2pm is optimal; River Editor says avoid exactly that window.

**Stop optimising this.** Three of four agree that your own engagement in the
first 60 to 90 minutes matters more than the clock. Pick a slot you can
reliably be online for, and hold it.

### The platform is getting harder [EVIDENCE]

Worth knowing so results are judged against the right baseline:

- Follower growth for 1,000 to 5,000 follower accounts fell from **40.75% to
  24.50%** year on year (Socialinsider)
- Average post reach fell from 15-20% of followers to **8-12%** (van der Blom)
- Video views down 36% year on year

The same effort buys materially less than it did in 2024. That is the
environment, not a failure of the content.

### Also worth knowing

- **Personal profiles beat company pages by 6 to 8x** on reach. Post as
  yourself, not as the company
- **Engagement pods are detected and penalised** [single source, but the
  downside is asymmetric]
- **Post reactivation:** commenting on your own post after 8 or 24 hours pushes
  it back into feeds [van der Blom via Agorapulse, recommended tactic rather
  than measured result]
