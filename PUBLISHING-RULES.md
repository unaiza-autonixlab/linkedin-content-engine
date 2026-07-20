# Publishing Rules

**Template. Edit before you generate posts from client work.**

If you write about work you did for clients, this file is what stops a good post
from ending a client relationship. Read it before any post sourced from your own
project notes.

If you only post about your own products or opinions, you can delete this file.

---

## Never publish

### Credentials and infrastructure
- API keys, tokens, secrets, project references, internal UUIDs
- Account IDs of any kind
- Internal domains and deployment URLs

Worth checking your own notes for these before you start. Build logs and session
notes collect credentials, and a screenshot of one publishes it.

### Client identity
- Company name, brand names, product names, SKUs
- Any individual's name
- The client's website

Safe framing: "a DTC client", "an agency running 6 platforms". Note that
category plus revenue plus platform mix is often enough to identify a company
even without the name, so do not combine those.

### Confidential commercial data
This is the category that turns a post into a legal problem.

- Gross margins, blended or per product
- Revenue, in any currency, for any channel or period
- Ad spend by platform or month
- Absolute performance figures tied to a client
- Customer counts, churn, LTV, AOV values
- Operational facts: what was paused when, launch dates, list imports

### Screenshots
Assume every screenshot leaks more than intended. Column headers, tab names, URL
bars and browser history all identify clients. If you need a visual, rebuild it
with synthetic numbers rather than blurring real ones. Blurring gets reversed and
half defeats itself anyway.

---

## Safe to publish

**The mechanism, not the magnitude.**

- How a vendor platform behaves. That is a fact about the vendor, not your client
- Ratios and percentages with no dollar anchor: "23% below", "a 12x gap",
  "roughly 6% unattributed"
- Counts of your own work: audit checks, build duration, pipeline runtime
- Generic outcomes: "reporting went from weekly to daily"
- Lessons and methodology insight

Rule of thumb: *"Google reassigns conversions up to 90 days back, and we found 34
days of silent undercounting"* is safe. Adding *"...worth $4,694"* is not.

---

## Numbers that are yours

Some numbers describe your work rather than your client's business. These are
safe, and they are the most persuasive proof you have:

- Build duration, platforms integrated, systems replaced
- Runtime, refresh frequency, error rates
- Bugs found and fixed

Watch for numbers that imply client scale. Row counts and order volumes can
reveal revenue indirectly. Round them or drop them.

---

## Pre-publish checklist

- [ ] No client name, brand, product, or individual named
- [ ] No dollar figure belonging to a client
- [ ] No margin, churn, LTV, or revenue figure
- [ ] No credential, ID, or internal URL
- [ ] No screenshot of real data
- [ ] Could a competitor of your client derive anything useful from this?

If any item is uncertain, do not publish until you have checked. A delayed post
costs nothing.

---

## If a client agrees to be named

Written permission relaxes the identity rules. It does not relax the commercial
data rules. Named case studies still exclude margins, revenue and unit economics
unless the client signs off on each specific figure.
