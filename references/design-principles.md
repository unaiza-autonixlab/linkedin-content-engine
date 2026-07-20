# Design Principles

The rules encoded in `templates/` and enforced by the audit in `render.js`.
Written down so the reasoning survives, and so changes are deliberate.

## Epistemic status

- **[SOURCED]** from a primary typographic or standards reference.
- **[CONVENTION]** widely practised, no primary source located.

Research on 2026-07-21 found **no canonical taxonomy of social layout
archetypes**. Grid, margin, emphasis and contrast rules have real sources. The
archetype set is reconstructed practitioner convention, and is labelled so.

---

## Canvas

- Square image **1080x1080** [SOURCED, still LinkedIn's own spec]
- Carousel **1200x1500** (4:5). Vertical occupies the most feed height on a
  phone. 4:5 renders identically at 1080x1350; the larger source just gives
  downscale headroom
- Rendered at **2x**

Note a live conflict: Hootsuite recommends landscape for document posts, against
the mobile-first 4:5 consensus. This repo goes vertical. That is a judgement
call against a credible source.

## The downscale constraint, why type looks huge here

LinkedIn renders a 1080-1200px canvas at roughly **350 to 400 CSS px** in a
phone feed. That is about a **3x reduction**. Type that looks oversized on a
monitor is correct; type that looks comfortable on a monitor is unreadable in
the feed.

**Floor: 44px on canvas** for a 1080 square, 48px on a 1200 carousel. Nothing
smaller ships. The audit fails the render rather than quietly producing it.

## Type scale [SOURCED for method, CONVENTION for count]

Modular scale, ratio **1.333** (perfect fourth), rounded to multiples of 8 so it
stays compatible with the spacing grid.

`48 · 64 · 88 · 112 · 152 · 200 · 264`

- 3 to 4 sizes visible on any one composition. Never interpolate between steps
- 1.333 or 1.5 preferred over 1.25, because adjacent steps in a 1.25 scale stop
  being distinguishable once the feed downscales them
- Tim Brown's caution applies: a scale is a tool, not magic. Deviate when
  judgement warrants, but deviate deliberately

## Margins [SOURCED]

The historical page canons (Van de Graaf, Tschichold) put the smallest margin
inside and the largest at the bottom, with side margins between one ninth and
two ninths of page width. Butterick argues independently that generous margins
carry *more* content, not less, because the text sets better.

Tiers on 1080, all multiples of 8, **bound to the archetype rather than fixed**:

| Tier | px | Used for |
|---|---|---|
| Tight | 96 | list, comparison. Dense compositions |
| Standard | 128 | stat |
| Generous | 152-176 | statement, quote |

**Bottom margin always exceeds top**, at roughly 1.35x. Every canon says so, and
it does double duty: platform UI chrome overlays the bottom 12 to 15% of a feed
image.

## Spacing grid [SOURCED]

8-point grid. All dimensions divisible by 8. Its real benefit is decision
reduction: it removes seven of every eight spacing options.

## Alignment [SOURCED]

Flush left is the default and it is not a stylistic preference. Butterick calls
centred text "safe but boring", permits it for short phrases and titles, and
states plainly that whole text blocks should not be centred, because ragged
edges on both sides impede reading.

**Centre only** the carousel cover, and only at 3 lines or fewer. Everything
else is flush left.

## Emphasis [SOURCED]

Butterick's rules, applied directly:

- Bold and italic are **mutually exclusive**. Never both
- In sans-serif faces, **skip italics entirely** and use weight. Sans italics
  are visually indistinct
- Use emphasis as little as possible. Overuse spends the budget
- **Never underline.** Never bold-italic. Never emphasise a whole block

Ranked mechanisms, safest first:

1. **Size.** The primary tool. Costs nothing, never looks cheap
2. **Position.** Isolation in space emphasises more than any treatment
3. **Weight.** One step, not two
4. **Colour.** A single accent on a phrase, never a whole line
5. **Knockout box.** The legitimate modern replacement for underlining. Pad it
   asymmetrically, more horizontal than vertical, or it looks like a table cell

In content files, `*asterisks*` mark the accent phrase. **One per composition.**
Two highlights compete and neither wins.

## Colour [CONVENTION]

Three values plus one accent: background, primary text, muted text, accent.

- Accent occupies **well under 10%** of the canvas. If it appears in two roles on
  the same composition it stops being an accent
- **Polarity is bound to the archetype, never to slide index.** Cover is accent,
  closing slide is light, interiors are dark. Alternating merely for variety
  reads as inconsistency, because the viewer looks for the rule, fails to find
  one, and registers noise
- Orange on paper is only **2.6:1**. A darkened `--accent-ink` exists for accent
  text on light backgrounds. Use it, never raw accent

## Contrast [SOURCED, W3C normative]

WCAG 2.2 AA: **4.5:1 normal text, 3:1 large** (large = 18pt+, or 14pt+ bold).
Thresholds are exact. 4.499:1 fails.

AAA (7:1) was tried and abandoned: pure black on `#ff6b35` tops out near 6.6:1,
so an AAA gate flags every cover slide with no fix available. The audit enforces
AA, which is the standard and is achievable.

## Occupancy [CONVENTION]

40 to 60% of a typographic graphic should be empty. Statements and quotes sit at
the high end, lists at the low end. Below roughly 30% empty it stops reading as
designed and starts reading as a document.

The audit measures occupancy and warns past 62%.

Note: the frequently cited "whitespace improves comprehension by 20%" figure
could not be verified and is deliberately not relied on here.

## Deck pacing [CONVENTION]

Vary composition, hold the system constant. That distinction is the whole trick.

- Cover: top of the scale, distinct polarity, centred
- Interior: same headline size across all of them, so the deck reads as typeset
  rather than generated
- **Content anchored to a fixed top baseline, not vertically centred.** Centring
  makes every slide sit at a different height and the deck visibly jitters on
  swipe. This is one of the strongest template tells
- 8 to 10 slides. Sourced range is 5 to 15; biased low because completion falls
  with length

## What the audit enforces

Run on every render. Warnings name the fix, not just the fault.

- Overflow of the content box
- Type shrunk below the readability floor
- Headline over 14 words, or over 4 lines
- Body copy over 32 words
- WCAG AA contrast failures, measured against the actual painted background
- Orphan final lines, measured with a Range rather than guessed from word length
- Canvas occupancy over 62%

## Failure modes deliberately designed out [CONVENTION]

- Everything centred
- More than 3 to 4 type sizes
- More than two weights
- Margins that drift between compositions
- Vertically centred variable-length text
- Gradients, drop shadows, glows, strokes on text
- Stock icon soup
- Text near the canvas edge
- Orphans and widows
- Fake precision, "73.4%" where the source said "about three quarters"
- Untracked large type. Headlines carry -2.6% letter-spacing

The meta-rule from the research, worth keeping: **cheapness reads as
inconsistency, not as simplicity.** A plain composition with one font, two
sizes, one colour and perfect margins looks professional. An ornamented one with
3px of margin drift does not.
