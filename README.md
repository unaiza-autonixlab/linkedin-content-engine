# LinkedIn Content Engine

Mines Reddit for what your audience actually complains about, turns it into post
ideas in their own words, and renders finished text posts, images and carousels.

Built to run inside [Claude Code](https://claude.com/claude-code).

---

## Why this exists

Most content systems solve the wrong problem.

They assume you cannot think of what to post. Usually you can. The real reason
people stop posting is that they read what they wrote, decide it sounds like
everybody else, and quietly do not publish it.

So this repo is built around one rule:

> **Cover your name. Could a competent stranger have written this?**
> If yes, it does not go out.

Reddit supplies the topic, because your audience is already saying out loud what
they care about, in language you would never invent at a desk. Your own work
supplies the proof. The renderer removes the make-it-look-good tax.

---

## What you get

- **`fetch.js`** pulls top weekly threads from subreddits where your buyers hang
  out, filters to posts matching your pain keywords, and dedupes against
  everything seen before
- **A pain library** of ranked complaints, verbatim quotes, live debates, and
  questions nobody answered well
- **An idea bank** with hooks written out and status tracking, so nothing gets
  suggested twice
- **`render.js`** turns a JSON file into a 1080x1080 image or a carousel PDF at
  1080x1350, rendered at 2x through a browser you already have. No manual
  screenshotting, no Canva
- **Skill files** that encode voice, format choice, and what you must never
  publish from client work

---

## Setup

### 1. Requirements

- Node 18+
- Claude Code
- Chrome or Edge (used for rendering, no download needed)
- A free Apify account for the Reddit scraping

```bash
git clone https://github.com/YOUR-USERNAME/linkedin-content-engine
cd linkedin-content-engine
npm install
```

### 2. Get an Apify token

1. Sign up free at https://console.apify.com/sign-up
2. Copy your token from
   [Settings, API & Integrations](https://console.apify.com/settings/integrations)
3. Set it:

```powershell
# Windows PowerShell, permanent
[Environment]::SetEnvironmentVariable("APIFY_TOKEN", "apify_api_...", "User")
```

```bash
# macOS / Linux
export APIFY_TOKEN="apify_api_..."
```

**Cost warning, measured not estimated.** The free $5 monthly credit covers
roughly **one 5-subreddit run per month** at default settings, about $1 per
subreddit. It does not cover weekly 10-subreddit runs. Either lower
`maxPostsPerSubreddit`, run monthly, or pay for a plan.

### 3. Configure

Edit `config.json`:

- `subreddits`, where your buyers actually post
- `painKeywords`, a post is kept if the title or body contains at least one.
  Avoid generic words. "tracking" will pull in package tracking and drown you
- `brand`, your name, company, and colours for rendered images

### 4. Fill in your voice, this is the important one

Open `skills/voice.md` and fill it in. It is a template.

Everything else finds topics and renders pixels. This file decides whether the
output sounds like you. Budget thirty minutes and write three real example
posts. If you skip this, you will get competent generic output, which is exactly
the thing that stops people publishing.

---

## Daily use

Open Claude Code in this folder:

```
give me post ideas
```

You get 3 ideas, each with the hook written out and a suggested format. Not a
list of 20, because that just recreates the blank page.

Pick one:

```
make idea 2 a carousel
make idea 1 a static image
just write idea 3 as text
```

Text goes to `output/queue.md`. Visuals get a file in `content/` and render to
`output/renders/`.

### Rendering

```bash
node render.js content/your-post.json
```

- **Static** → `output/renders/<slug>.png` (1080x1080 @2x)
- **Carousel** → `output/renders/<slug>.pdf` plus PNGs at 1200x1500

To post a carousel: LinkedIn, new post, choose **Document**, upload the PDF, give
it a title. That title renders above the carousel and is a second hook most
people waste.

### Refilling ideas

```bash
node fetch.js
```

then in Claude Code: `analyze this week's data`

---

## Choosing a format

| Use | When |
|---|---|
| Text | Opinions, timely reactions, short sharp pain |
| Static image | One number or one line that lands alone |
| Carousel | Multi-step explanations, teardowns, lead magnets |

If it takes more than one step to explain, it is a carousel. If it lands in one
sentence, it is a static. If it needs argument and nuance, it is text.

Document/carousel posts lead LinkedIn engagement at 7.00%, versus 6.45%
multi-image and 5.30% single image, against a 5.20% average (Socialinsider,
1.3M posts). Let the content pick the format anyway. A forced carousel loses more than the format gains.

---

## Files

| File | What it is |
|---|---|
| `skills/voice.md` | **Fill this in first.** Your voice and the specificity test |
| `skills/ideation.md` | How ideas get offered to you |
| `skills/design.md` | Format choice and slide rules |
| `skills/pain-analysis.md` | How Reddit dumps become a pain library |
| `skills/post-generation.md` | How posts get written |
| `PUBLISHING-RULES.md` | What you must never publish from client work |
| `build-log.md` | Your messy work notes. Feeds about 1 post in 3 |
| `idea-bank.md` | Topic list with status tracking |
| `output/queue.md` | Finished posts waiting to go out |

---

## Honest limitations

- **Reddit scraping costs money.** Not much, but it is not free at weekly cadence
- **Reddit blocks direct access.** Its public JSON API returns 403 to scripts
  regardless of user agent, which is why this uses Apify
- **The scraper returns 0 for upvote counts** on most posts, so ranking uses
  comment volume instead
- **It cannot write your proof posts for you.** `build-log.md` is the one input
  nothing here can generate. If you do not feed it, roughly a third of your
  content has no source
- **This does not make you consistent.** It removes the work and the blank page.
  Showing up is still yours

---

## Troubleshooting

**`APIFY_TOKEN is not set`**, the variable is missing from this terminal.
Permanent variables do not affect already-open terminals. Open a new one.

**`HTTP 403 actor-is-not-rented`**, the scraper actor became paid. Find another
pay-per-event Reddit actor in the Apify Store and update `apify.actorId`.
`FREE` and `PAY_PER_EVENT` work with free credit; `RENTAL` does not.

**`HTTP 403 Monthly usage hard limit exceeded`**, free credit is gone for the
month. Everything already fetched is saved.

**A run keeps 0 posts**, your keywords are too narrow, or that week was quiet.
Check with `node fetch.js --subreddit YOURSUB --no-filter`.

**Carousel PDF looks tiny or blank**, the renderer warns if the PDF is far
smaller than the slide PNGs, which means the images did not load. Re-run.

---

## License

MIT. Use it, fork it, sell what you make with it.
