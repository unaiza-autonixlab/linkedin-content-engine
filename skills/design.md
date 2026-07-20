# Skill: Design

How to turn an idea into a text post, a static image, or a carousel.

Rendering is automated. Write a JSON file into `content/`, run
`node render.js content/<name>.json`, and finished assets land in
`output/renders/`. No manual screenshotting.

---

## Choosing the format

Engagement by format, from Socialinsider's benchmark study of 1.3M posts:
**document/carousel posts lead at 7.00%**, multi-image 6.45%, single image
5.30%, against a 5.20% platform average. Documents were also up 14% year on
year.

Note a conflict in the sources: a smaller Taplio dataset puts single images
ahead of documents. Socialinsider has by far the larger sample, so this repo
weights toward carousels, but treat the ordering as directional rather than
settled.

Content still decides the format. A forced carousel loses more than the format
gains.

| Use | When | Effort |
|---|---|---|
| **Text** | Opinions. Timely reactions. Short sharp pain. Anything where the words are the whole point | 5 min |
| **Static image** | One number or one line that hits hard alone. Quotable claims | 10 min |
| **Carousel** | Multi-step explanations. Teardowns. Anything with a "here is why" chain. Lead magnets | 25 min |

Quick test: if it needs more than one step to explain, it is a carousel. If it
lands in one sentence, it is a static. If it needs argument and nuance, it is
text.

Do not run two carousels in the same week. They read as effortful, and back to
back they start to look like a content machine rather than a person.

---

## Static images

Content file:

```json
{
  "slug": "meta-said-10",
  "type": "static",
  "kicker": "Attribution",
  "headline": "Meta said *10 sales*. Shopify said 6.",
  "sub": "Both were telling the truth. That is the part nobody explains."
}
```

- `kicker`, 1 to 3 words, the category. Optional.
- `headline`, the whole point. Under about 12 words. Wrap one phrase in
  `*asterisks*` to make it orange. One highlight only, two competes with itself.
- `sub`, one supporting line. Optional, and often better left out.
- `stat`, optional, for a single huge number. When used, keep the headline short
  because the number is the hero.

The image is not the post. The caption still does the work. The image earns the
stop, the caption earns the follow.

## Carousels

```json
{
  "slug": "meta-vs-shopify",
  "type": "carousel",
  "slides": [
    { "type": "cover", "kicker": "Attribution", "headline": "Meta said 10 sales. Shopify said 6.", "text": "Nobody was lying." },
    { "kicker": "Reason 1", "headline": "Your pixel fires *twice*.", "text": "Browser sends a purchase. Server sends the same purchase." },
    { "type": "end", "headline": "Shopify is the number your bank agrees with.", "text": "Which one does your team quote in meetings?" }
  ]
}
```

Rules that matter:

- **8 to 10 slides.** Sourced guidance is 5 to 15; biased low because completion rate falls with length.
- **The cover is the entire post.** It renders inverted, orange on black, so it
  stops the scroll. If the cover does not work alone, nothing after it matters.
- **One idea per slide.** If a slide needs two thoughts, it is two slides.
- **Headlines under about 10 words, body under 25.** The renderer measures and
  warns past 14 and 32. LinkedIn downscales roughly 3x in the feed, so nothing
  below 44px on canvas survives.
- **The last slide asks something.** It renders light, so it reads as a natural
  stop. A question that invites disagreement, never "what do you think".
- No slide numbers on the cover. It should read as a headline, not as page 1.

## Captions for visual posts

The caption is not a description of the image. It is a post in its own right
that happens to sit under one.

- Do not repeat the headline verbatim. The reader already saw it.
- Open with a different angle on the same problem.
- Keep it shorter than a standalone text post, around 60 to 100 words.
- End with the same kind of question or flat statement any post ends with.

For carousels, LinkedIn shows a **document title** above the file. That title is
a second hook and most people waste it. Make it the sharpest line you have.

---

## Brand

Set in the templates, do not vary per post:

- Ink `#0d0d0d`, accent orange `#ff6b35`, paper `#f5f5f0`
- Inter, 800 for headlines, 400 for body
- Static 1080x1080. Carousel 1200x1500 (4:5), which occupies the most feed
  height on a phone
- Rendered at 2x so text stays crisp

Consistency is doing more work here than any individual design choice. Someone
should recognise the post before they read the name.

---

## Checks before shipping

- [ ] Cover or headline works with zero context
- [ ] Passes the specificity test in `voice.md`
- [ ] Nothing from `PUBLISHING-RULES.md` leaked in: no client name, no revenue,
      no margins, no screenshots of real data
- [ ] Zero em dashes, including inside images
- [ ] Caption is not a description of the image
- [ ] Rendered PNGs actually opened and eyeballed, not assumed
