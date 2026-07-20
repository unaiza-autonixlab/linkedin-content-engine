# Idea Sources

Reddit is one source. It is anonymous, partly non-buyer, and shared with
everyone else who thinks of scraping it. These are the others, ranked by what
they add that Reddit does not.

Researched 2026-07-21. **[VERIFIED]** means fetched live that day.
**[UNVERIFIED]** means it needs checking before you build on it.

---

## 1. Your own sales calls and cold email replies

**Best signal available to anyone. Free. Structurally unavailable to
competitors.** Start here.

If you have done sales calls with your exact ICP and a live cold email campaign. Reddit
gives you pain from anonymous people who may never buy anything. Your calls give
you pain from people who were considering paying you, with a name, a company
size, and a tone shift telling you which framing landed.

Fifty data points beats fifty thousand, because content needs one sharp insight,
not statistical power.

### How to run it

- Record and transcribe every call. Announce the recording at the top: two-party
  consent states and GDPR both require notice, and it is normal practice anyway
- After each call, append to `objections.md`: the objection **verbatim**, what
  they were actually worried about underneath it, and the moment their tone
  changed
- Do the same for email replies, including the dismissive ones. "We already have
  a dashboard" and "we use Triple Whale" are positioning material, not rejections
- Monthly, cluster the file by frequency. The top 5 clusters are your next 5 posts

**Rule of thumb: an objection heard three times is a post. Heard once, it is a
note.**

Objection-derived posts also end naturally on a question, which is the house
ending, because objections *are* questions.

> Caveat: this recommendation rests on reasoning, not cited practitioner
> evidence. Research could not retrieve a single writeup documenting it. The
> logic stands on its own but it is not sourced.

---

## 2. Job postings via Greenhouse and Lever

**[VERIFIED] Both APIs are public and unauthenticated for reads.**

The strongest verified finding of the research. What a company hires for tells
you what they are spending real money to fix, which is a much stronger buying
signal than what someone complains about on Reddit.

```
GET https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs?content=true
```

Greenhouse's docs state plainly: "Job Board data is publicly available, so
authentication is not required for any GET endpoints." Returns full descriptions,
departments, offices in one call. No documented read rate limits.

Lever's postings API is the same shape. GET needs no key, and responses include
**plaintext** description variants alongside HTML, so there is no parsing step
before handing text to an LLM. The documented 2 req/sec limit applies to
application POSTs, not reads.

### Why it fits this business specifically

A 5 to 15 person agency posting for a "Marketing Analyst, reporting and
attribution", with a description listing "consolidate Meta/Google/Shopify data,
build client dashboards, weekly reporting", is telling you in their own words
that they are about to solve in-house the exact problem you sell.

That is a content angle and a qualified lead from the same fetch.

**Constraint:** you need a board token per company, so this is an enrichment
layer over a list you already have (a lead list you already have), not
open-ended discovery.

**[UNVERIFIED]** Ashby and Workable may expose similar public endpoints. Indeed
and LinkedIn have closed theirs to partners. Do not build on those.

---

## 3. Platform changelogs

**Lowest effort in the whole list. Zero legal ambiguity. Highest
differentiation.**

Meta Marketing API, Google Ads API and Shopify all publish versioned release
notes on a fixed cadence, most with RSS or a stable parseable page.

When Meta changes an attribution setting, deprecates a metric field, or alters
how conversions API data surfaces, that is *directly* your subject matter, and it
arrives timestamped so you can be first.

Most agency content people never read release notes because they are technical.
Most engineers who read them do not write LinkedIn content. You are in the
overlap, and that overlap is the whole definition of "technical content nobody
else covers."

Implementation is a cron job and a diff: poll, compare against last seen, filter
for anything touching attribution or reporting, alert yourself.

**Weakness:** low and bursty volume. Maybe 2 to 4 posts a month. It supplements,
it does not sustain.

**[UNVERIFIED]** specific changelog URLs were not fetched.

---

## 4. YouTube comments

**[VERIFIED] Free, sanctioned, well documented.** The only source combining real
audience voice with explicitly permitted automation.

`commentThreads.list` costs **1 quota unit per call**, the cheapest tier.
**[UNVERIFIED]** default project quota is believed to be 10,000 units/day, which
would be effectively unlimited here.

Noisier than Reddit, but comments on tutorials for the tools your ICP uses
("GA4 ecommerce tracking setup", "Triple Whale review") skew toward genuine
confusion, which is content shaped.

---

## 5. Search data, for phrasing not insight

**[VERIFIED] AlsoAsked** is the cheapest automatable input on this list: $12/mo
for 100 credits, $23/mo for 300, API on all paid tiers. Returns the "People Also
Ask" tree, which is literally question shaped and maps onto hooks directly.

**[VERIFIED] Answer The Public no longer has a free tier.** Starter is $20/mo.

**Caveat that matters:** search data tells you what people type into Google,
which skews informational and top of funnel. It will not surface "my client
asked why Meta says 40 conversions and Shopify says 12." Use it for phrasing and
structure, not for insight.

---

## Deliberately not used

### Software review sites (G2, Capterra, TrustRadius)

Excellent signal. **Do not automate.**

**[VERIFIED]** G2's Terms of Use §9 bans automated access, scraping, and
extraction, bans circumventing bot detection, bans using extracted content to
train or fine-tune any machine learning model, and states these apply
"regardless of whether any portion of the Site or its content is publicly
viewable." That last clause is drafted specifically to defeat the "it's public
data" argument.

**[VERIFIED]** No public review-content API is documented.

For a business selling to agencies, building a pipeline whose input contractually
forbids exactly that pipeline is an asymmetric risk for a marginal gain.

**Legitimate middle path:** reading is not scraping. Pull 30 to 50 reviews by
hand, once a quarter, for the tools your ICP already uses. High yield, no
exposure.

Note Capterra, GetApp and Software Advice are all Gartner Digital Markets. One
owner, one ToS posture, correlated blocking.

### LinkedIn competitor analytics

**[VERIFIED] Shield did not just shut down, it was shut down.** Its founders
state: "Both Google and LinkedIn made it clear that we could not continue
operating Shield as it was built." No successor is named.

Shield was the best known and best funded player in that category and platform
pressure ended it. Anything filling the gap is doing what Shield was told to
stop, which means discontinuation risk **and** risk to the account you connect.

Your content system and your lead gen both depend on account health. Do not
connect the primary account to a scraper-backed analytics tool.

**Manual substitute is nearly as good:** 15 peers, check weekly, note which posts
cleared their baseline. Ten minutes. And there is a strategic argument against
automating it at all, since mining competitor content produces derivative
content.

### Communities (Slack, Discord, Circle, Facebook groups)

High signal, **zero automatability**. Slack's API is workspace scoped and needs
admin install; you cannot programmatically read a community you merely joined.
Circle and most Discord servers restrict bots similarly.

Worth 30 minutes of reading a week, not an integration. The highest signal item
in an agency Slack is usually not the posts, it is **the questions that get no
answer.** An unanswered question in a room of 2,000 practitioners is a content
gap with proof of demand.

### Quora and X

Quora: no usable API, aggressive anti-scraping, quality degraded by AI answers.
Its questions rank in Google anyway, so AlsoAsked surfaces the same signal.

X: read access runs into hundreds per month, and B2B marketing practitioner
density has declined. Poor cost to signal.

---

## Priority

1. **`objections.md`, this week.** No tooling, no budget, no ToS to read. Just
   discipline. Best signal you will ever have
2. **Job postings**, over the lead lists you already have
3. **Changelog watcher**, a cron and a diff

Reddit stays, but it should stop being the only input.
