#!/usr/bin/env node
/**
 * fetch.js, pulls this week's top posts from the configured subreddits via the
 * Apify Reddit scraper, filters them down to posts that mention a pain keyword,
 * drops anything already seen in a previous run, and writes the survivors to
 * data/week-YYYY-MM-DD.json
 *
 * Usage:
 *   APIFY_TOKEN=apify_api_xxx node fetch.js
 *   node fetch.js --subreddit PPC        # single subreddit, for testing
 *   node fetch.js --no-filter            # keep every post, skip keyword filter
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));

// ---------------------------------------------------------------- args ----

const args = process.argv.slice(2);
const argValue = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};
const onlySubreddit = argValue('--subreddit');
const skipFilter = args.includes('--no-filter');

// ------------------------------------------------------------- helpers ----

const log = {
  info: (m) => console.log(`   ${m}`),
  step: (m) => console.log(`\n>> ${m}`),
  ok: (m) => console.log(`   OK  ${m}`),
  warn: (m) => console.warn(`   !   ${m}`),
  err: (m) => console.error(`   X   ${m}`),
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function resolve(p) {
  return path.join(ROOT, p);
}

// --------------------------------------------------------------- token ----

const TOKEN = process.env[CONFIG.apify.tokenEnvVar];

if (!TOKEN) {
  log.err(`Environment variable ${CONFIG.apify.tokenEnvVar} is not set.`);
  log.info('');
  log.info('Set it for this terminal session and re-run:');
  log.info('  PowerShell:  $env:APIFY_TOKEN = "apify_api_your_token_here"');
  log.info('  Git Bash:    export APIFY_TOKEN="apify_api_your_token_here"');
  log.info('');
  log.info('No token yet? See the "Apify setup" section of README.md.');
  log.info('You can still test the rest of the pipeline against data/sample-week.json.');
  process.exit(1);
}

// ----------------------------------------------------------- apify call ----

/**
 * Runs the actor synchronously and returns its dataset items.
 * Uses run-sync-get-dataset-items so we get results in one request instead of
 * starting a run and polling for it.
 */
async function scrapeSubreddit(subreddit) {
  const { actorId, baseUrl, runTimeoutSecs } = CONFIG.apify;
  const s = CONFIG.scrape;

  const url =
    `${baseUrl}/acts/${actorId}/run-sync-get-dataset-items` +
    `?token=${encodeURIComponent(TOKEN)}&timeout=${runTimeoutSecs}`;

  const input = {
    startUrls: [
      { url: `https://www.reddit.com/r/${subreddit}/top/?t=${s.time}` },
    ],
    sort: s.sort,
    time: s.time,
    maxPostCount: s.maxPostsPerSubreddit,
    maxItems: s.maxPostsPerSubreddit * (s.maxCommentsPerPost + 1),
    maxComments: s.maxCommentsPerPost,
    maxCommunitiesCount: 1,
    maxUserCount: 0,
    skipComments: s.skipComments,
    skipUserPosts: s.skipUserPosts,
    skipCommunity: true,
    searchPosts: true,
    searchComments: false,
    searchCommunities: false,
    searchUsers: false,
    proxy: { useApifyProxy: true },
  };

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch (e) {
    throw new Error(`network error reaching Apify (${e.message})`);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const hint = {
      401: 'token rejected. Check APIFY_TOKEN is the full token from console.apify.com/settings/integrations',
      402: 'Apify account is out of compute units for this month.',
      404: `actor "${actorId}" not found. Check the actorId in config.json.`,
      408: 'the run timed out. Lower maxPostsPerSubreddit in config.json.',
      429: 'rate limited by Apify. Wait a minute and re-run.',
    }[res.status];
    throw new Error(
      `Apify returned HTTP ${res.status}${hint ? `, ${hint}` : ''}` +
        (body ? `\n       ${body.slice(0, 300)}` : '')
    );
  }

  const items = await res.json().catch(() => {
    throw new Error('Apify returned a response that was not valid JSON');
  });

  if (!Array.isArray(items)) {
    throw new Error('Apify returned an unexpected payload shape (expected an array)');
  }

  return items;
}

// -------------------------------------------------------------- shaping ----

/**
 * The actor returns posts and comments as a flat list. Fold the comments into
 * their parent posts and normalise the field names we care about.
 */
function shape(items, subreddit) {
  const posts = [];
  const commentsByPost = new Map();

  for (const item of items) {
    const type = item.dataType || (item.title ? 'post' : 'comment');

    if (type === 'post') {
      posts.push(item);
    } else if (type === 'comment') {
      const parent = item.postId || item.parentId || item.parsedPostId;
      if (!parent) continue;
      if (!commentsByPost.has(parent)) commentsByPost.set(parent, []);
      commentsByPost.get(parent).push(item);
    }
  }

  return posts.map((p) => {
    const id = p.id || p.parsedId || p.url;
    const raw = commentsByPost.get(id) || commentsByPost.get(p.parsedId) || [];

    const top_comments = raw
      .sort((a, b) => (b.upVotes || 0) - (a.upVotes || 0))
      .slice(0, CONFIG.scrape.maxCommentsPerPost)
      .map((c) => ({
        body: decodeEntities(c.body || ''),
        upvotes: c.upVotes || 0,
      }))
      .filter((c) => c.body.length > 0);

    return {
      id,
      subreddit: p.communityName ? p.communityName.replace(/^r\//, '') : subreddit,
      title: decodeEntities(p.title || ''),
      body: decodeEntities(p.body || p.text || ''),
      top_comments,
      upvotes: p.upVotes ?? p.score ?? 0,
      num_comments: p.numberOfComments ?? p.numComments ?? 0,
      url: p.url || '',
      created_at: p.createdAt || null,
    };
  });
}

// ------------------------------------------------------------- filtering ----

/**
 * Reddit returns HTML entities in post and comment bodies. Left raw, quotes
 * pulled for the pain library come out as "don&#39;t" and read as broken.
 */
function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s*&#32;\s*/g, ' ')
    .trim();
}

function matchedKeywords(post) {
  const haystack = `${post.title} ${post.body}`.toLowerCase();
  return CONFIG.painKeywords.filter((kw) => haystack.includes(kw.toLowerCase()));
}

// ------------------------------------------------------------ seen ids ----

function loadSeenIds() {
  const file = resolve(CONFIG.paths.seenIdsFile);
  if (!fs.existsSync(file)) return new Set();
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return new Set(Array.isArray(parsed) ? parsed : parsed.ids || []);
  } catch {
    log.warn('seen-ids.json was unreadable, starting a fresh list');
    return new Set();
  }
}

function saveSeenIds(seen) {
  fs.writeFileSync(
    resolve(CONFIG.paths.seenIdsFile),
    JSON.stringify([...seen], null, 2)
  );
}

// ----------------------------------------------------------------- main ----

async function main() {
  const subreddits = onlySubreddit ? [onlySubreddit] : CONFIG.subreddits;

  console.log('Reddit engine, weekly fetch');
  console.log(`Subreddits: ${subreddits.length}   Keywords: ${CONFIG.painKeywords.length}`);

  const seen = loadSeenIds();
  log.info(`${seen.size} post ids already seen in previous runs`);

  const kept = [];
  const failed = [];
  let totalScraped = 0;
  let totalFiltered = 0;
  let totalDuplicate = 0;

  for (const sub of subreddits) {
    log.step(`r/${sub}`);
    let items;
    try {
      items = await scrapeSubreddit(sub);
    } catch (e) {
      log.err(e.message);
      failed.push(sub);
      continue;
    }

    const posts = shape(items, sub);
    totalScraped += posts.length;

    let keptHere = 0;
    for (const post of posts) {
      const hits = skipFilter ? ['(filter off)'] : matchedKeywords(post);
      if (hits.length === 0) {
        totalFiltered++;
        continue;
      }
      if (seen.has(post.id)) {
        totalDuplicate++;
        continue;
      }
      seen.add(post.id);
      kept.push({ ...post, matched_keywords: hits });
      keptHere++;
    }

    log.ok(`${posts.length} posts scraped, ${keptHere} kept`);

    // Be polite to the API between actor runs.
    if (sub !== subreddits[subreddits.length - 1]) {
      await sleep(1000);
    }
  }

  if (kept.length === 0) {
    log.step('Nothing new to save');
    log.info(`${totalScraped} posts scraped, ${totalFiltered} missed the keyword filter, ${totalDuplicate} already seen.`);
    if (failed.length === subreddits.length) {
      log.err('Every subreddit failed. See errors above and the README troubleshooting section.');
      process.exit(1);
    }
    return;
  }

  // The lite actor returns 0 for upvotes and num_comments on most posts, so
  // ranking by score is meaningless. Number of comments actually retrieved is
  // the only engagement signal we reliably get, and a thread people argued in
  // is what we want at the top anyway.
  kept.sort(
    (a, b) =>
      b.top_comments.length - a.top_comments.length ||
      b.upvotes - a.upvotes
  );

  const outFile = resolve(path.join(CONFIG.paths.dataDir, `week-${today()}.json`));
  fs.writeFileSync(
    outFile,
    JSON.stringify(
      {
        fetched_at: new Date().toISOString(),
        subreddits: subreddits,
        post_count: kept.length,
        posts: kept,
      },
      null,
      2
    )
  );
  saveSeenIds(seen);

  log.step('Done');
  log.info(`Scraped:    ${totalScraped}`);
  log.info(`Filtered:   ${totalFiltered} (no pain keyword)`);
  log.info(`Duplicate:  ${totalDuplicate} (seen in an earlier week)`);
  log.info(`Saved:      ${kept.length} -> ${path.relative(ROOT, outFile)}`);
  if (failed.length) {
    log.warn(`Failed subreddits: ${failed.join(', ')}`);
  }
  log.info('');
  log.info('Next: ask Claude Code "analyze this week\'s data"');
}

main().catch((e) => {
  log.err(`Unexpected failure: ${e.message}`);
  process.exit(1);
});
