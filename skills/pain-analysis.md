# Skill: Pain Analysis

Triggered when you say **"analyze this week's data"**.

Turns a raw weekly Reddit dump into structured pain material you can write from.

---

## CRITICAL RULE, read before anything else

**Reddit is pain radar and a vocabulary source. Nothing else.**

A Redditor's personal story never becomes your first person story. Ever.

- Allowed: "Agency operators keep describing X." "A founder in r/PPC put it this
  way: [quote]." "The complaint I see every week is Y."
- Forbidden: taking "I lost $40k on Meta last quarter" from a Reddit post and
  writing it as "I watched a client lose $40k last quarter."

your first person stories come from **build-log.md only**. If the build log
does not contain it, you did not live it, and it does not get written in first
person. When in doubt, attribute it to the audience, not to yourself.

Reddit gives you two things: what hurts, and the exact words people use for it.
Take those. Leave the biography.

---

## Inputs

- The newest `data/week-YYYY-MM-DD.json` in `/data`. If several exist, use the
  latest by filename date. If none exist, use `data/sample-week.json` and say so
  clearly in the output header.
- `pain-library.md` at the repo root, for checking what is already recorded.

## Steps

### 1. Read and orient

Load the file. Note the date, post count, and which subreddits are represented.
Read every post body and every comment. Comments carry more raw pain than
titles do, because that is where people vent after the polite question.

### 2. Extract the top 10 recurring complaints

Rank by two axes together, not one:

- **Frequency.** How many separate posts or comments touch this.
- **Emotional intensity.** Swearing, all caps, "I'm losing my mind," resignation,
  a founder saying they have given up on solving it. One furious post about a
  thing beats five shrugging mentions of it.

For each complaint record:

- A one line name for the pain
- Frequency count (how many posts/comments)
- Intensity read (low / medium / high) with the signal you used
- Which subreddits it showed up in

### 3. Pull exact phrases

Quote real people verbatim. This is the single most valuable output of the whole
step, because it is how your posts end up sounding like the reader's own
head instead of like marketing copy.

Rules for quotes:

- Copy the wording exactly. Do not clean up grammar. "the numbers never fucking
  match" is more useful than "the numbers are inconsistent."
- Attribute to subreddit and thread URL, never to the username.
- Prefer phrases that describe a feeling or a ritual, not just a fact.
- Aim for 10 to 20 quotes per week.

### 4. Find the debates

Threads where commenters actively disagree. Look for reply chains with opposing
positions, downvoted-but-argued takes, and "actually that's wrong because"
patterns.

These become OPINION posts, so record:

- The question being argued
- Side A, with its strongest reasoning
- Side B, with its strongest reasoning
- Which side has more support, and which side is more correct (these differ often)

A debate with no real disagreement is not a debate. Skip it.

### 5. Find the unanswered questions

Questions with low comment counts, or high comment counts where every answer is
vague, wrong, or "hire an agency." These become AUTHORITY posts, because you
can answer them properly.

Record the question, why the existing answers fail, and whether you can actually
answer it from real experience.

### 6. Tag against your services

Split every pain into two buckets:

- **SERVICE MATCH.** Maps to dashboards, reporting automation, or data pipelines.
  This is work you could actually be hired for. Writing about it generates
  qualified inbound.
- **AUDIENCE RESONANCE.** Real pain your ICP feels, but not something you sells.
  Creative fatigue, iOS changes, hiring, platform policy. Still worth writing
  about, because it builds trust and reach. Just do not expect leads from it.

Label every single pain. A week that is all resonance and no service match will
build an audience that never buys, so if that happens, flag it out loud.

### 7. Append to pain-library.md

Append. Never overwrite. The library is a longitudinal record, and a pain that
shows up in six consecutive weeks is a far stronger signal than a pain that
spikes once.

If `pain-library.md` does not exist, create it with an `# Pain Library` heading.

Append in this format:

```markdown
## Week of YYYY-MM-DD
Source: data/week-YYYY-MM-DD.json (N posts, subreddits: ...)

### Top complaints
1. **[Pain name]**, freq: N, intensity: high, r/PPC, r/ecommerce, [SERVICE MATCH]
   Summary in one or two lines.
2. ...

### Exact phrases
- "verbatim quote here", r/PPC, https://reddit.com/...
- ...

### Debates
- **Question:** ...
  - Side A: ... 
  - Side B: ...
  - Popular side: A. Correct side: B. Reason: ...

### Unanswered questions
- "question", r/shopify, https://reddit.com/..., existing answers fail because ...

### Notes
- Recurring from previous weeks: [pain names that also appear in earlier entries]
- New this week: ...
```

### 8. Report back

Print a short summary to you: the 3 strongest pains, the best debate, how many
new quotes were captured, and any pain that has now recurred 3 or more weeks in a
row. Recurring pain is the strongest possible signal for what to build and sell.

Do not print the whole library back at yourself. You can read the file.
