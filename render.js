#!/usr/bin/env node
/**
 * render.js, turns a content JSON file into LinkedIn ready assets.
 *
 *   node render.js content/meta-vs-shopify.json
 *   node render.js content/meta-vs-shopify.json --open
 *
 * Static posts  -> output/renders/<slug>.png            (1080x1080)
 * Carousels     -> output/renders/<slug>/slide-01.png   (1200x1500 each)
 *                  output/renders/<slug>.pdf            (upload this one)
 *
 * LinkedIn wants a PDF for document/carousel posts. The PNGs are there so you
 * can eyeball slides without opening the PDF.
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'output', 'renders');

// Reuse a browser that is already on this machine rather than downloading one.
function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }

  // fall back to any playwright-managed chromium already cached
  const cache = path.join(
    process.env.LOCALAPPDATA || '', 'ms-playwright'
  );
  if (fs.existsSync(cache)) {
    const dirs = fs.readdirSync(cache).filter((d) => d.startsWith('chromium-'));
    for (const d of dirs.sort().reverse()) {
      const exe = path.join(cache, d, 'chrome-win', 'chrome.exe');
      if (fs.existsSync(exe)) return exe;
    }
  }
  return null;
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node render.js content/<name>.json');
    console.error('');
    console.error('Content files live in content/. See content/_example-static.json');
    process.exit(1);
  }

  const jsonPath = path.isAbsolute(file) ? file : path.join(ROOT, file);
  if (!fs.existsSync(jsonPath)) {
    console.error(`Not found: ${jsonPath}`);
    process.exit(1);
  }

  let content;
  try {
    content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (e) {
    console.error(`That file is not valid JSON: ${e.message}`);
    process.exit(1);
  }

  const slug = content.slug || path.basename(jsonPath, '.json');
  const type = content.type || (content.slides ? 'carousel' : 'static');

  // Branding lives in config.json so nobody has to edit templates.
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config.json'), 'utf8'));
    const b = cfg.brand || {};
    content.handle = content.handle || b.name;
    content.tag = content.tag || b.company;
    content.colors = Object.assign({ ink: b.ink, accent: b.accent, paper: b.paper }, content.colors || {});
  } catch {}

  const browserPath = findBrowser();
  if (!browserPath) {
    console.error('No Chrome, Edge, or cached Chromium found.');
    console.error('Set CHROME_PATH to a browser executable and re-run.');
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ executablePath: browserPath });

  try {
    if (type === 'carousel') {
      await renderCarousel(browser, content, slug);
    } else {
      await renderStatic(browser, content, slug);
    }
  } finally {
    await browser.close();
  }
}

async function newPage(browser, w, h) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2, // retina, so text stays crisp on LinkedIn
  });
  return page;
}

/**
 * Catches the mechanical faults that make a template look cheap: text spilling
 * its box, type shrunk past readability, or copy so long it had to be crushed.
 * Better to fail loudly here than to publish a bad slide.
 */
async function audit(page, label) {
  const issues = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.stage').forEach((s, i) => {
      if (s.scrollHeight > s.clientHeight + 2) {
        out.push(`content overflows its box on ${i + 1}`);
      }
    });
    document.querySelectorAll('h1, h2').forEach((h, i) => {
      const px = parseFloat(getComputedStyle(h).fontSize);
      // LinkedIn downscales roughly 3x in the feed, so 44px here is ~15px on a phone.
      if (px && px < 44) out.push(`headline ${i + 1} shrank to ${Math.round(px)}px, copy is too long`);
    });
    if (document.body.scrollWidth > document.body.clientWidth + 2) {
      out.push('content is wider than the canvas');
    }

    // Geometry alone is not enough. Copy can fit perfectly and still read as a
    // wall of text, which is the single most common way a template looks cheap.
    const words = (el) => el.textContent.trim().split(/\s+/).filter(Boolean).length;
    const lines = (el) => {
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      return lh ? Math.round(el.getBoundingClientRect().height / lh) : 0;
    };

    document.querySelectorAll('h1, h2').forEach((h, i) => {
      if (!h.textContent.trim()) return;
      const w = words(h), l = lines(h);
      if (w > 14) out.push(`headline ${i + 1} is ${w} words, cut it to about 10`);
      else if (l > 4) out.push(`headline ${i + 1} runs to ${l} lines, aim for 2 or 3`);
    });

    document.querySelectorAll('.sub, p.text').forEach((p, i) => {
      if (!p.textContent.trim()) return;
      const w = words(p);
      if (w > 32) out.push(`body copy ${i + 1} is ${w} words, cut it to about 25`);
    });

    // WCAG 2.2 AA: 4.5:1 for normal text, 3:1 for large.
    //
    // AAA (7:1) is tempting for feed images, which are glanced at and small, but
    // it is unreachable on a saturated brand field. Pure black on #ff6b35 tops
    // out near 6.6:1, so an AAA gate would flag every cover slide forever with
    // no fix available. AA is the standard, and it is achievable.
    const lum = (c) => {
      const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => {
      const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
      return (x + 0.05) / (y + 0.05);
    };
    // Walk up for the nearest painted background.
    const bgOf = (el) => {
      let n = el;
      while (n && n !== document.documentElement) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && !/rgba?\(0, 0, 0, 0\)|transparent/.test(bg)) return bg;
        n = n.parentElement;
      }
      return 'rgb(255,255,255)';
    };

    document.querySelectorAll('h1, h2, .sub, p.text, .kicker, footer span').forEach((el) => {
      if (!el.textContent.trim()) return;
      const st = getComputedStyle(el);
      const px = parseFloat(st.fontSize);
      const large = px >= 60 || (px >= 48 && +st.fontWeight >= 700);
      const need = large ? 3 : 4.5;
      const r = ratio(st.color, bgOf(el));
      if (r < need) {
        out.push(`low contrast on "${el.textContent.trim().slice(0, 28)}" (${r.toFixed(1)}:1, needs ${need}:1)`);
      }
    });

    // A single short word alone on the final line reads as sloppy typesetting.
    //
    // Measure the real last line with a Range rather than guessing from word
    // length. Guessing flags any headline ending in a short word, even when it
    // sits comfortably mid-line.
    document.querySelectorAll('h1, h2').forEach((h, i) => {
      if (lines(h) < 2) return;
      const range = document.createRange();
      range.selectNodeContents(h);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0);
      if (rects.length < 2) return;
      const last = rects[rects.length - 1];
      const widest = Math.max(...rects.map((r) => r.width));
      if (last.width < widest * 0.22) {
        const tail = h.textContent.trim().split(/\s+/).pop();
        out.push(`headline ${i + 1} ends on an orphan line ("${tail}"), reword or shorten`);
      }
    });

    // Occupancy. A typographic graphic should read as designed, not as a
    // document. Convention is 40-60% of the canvas empty.
    const canvas = document.body.getBoundingClientRect();
    let ink = 0;
    document.querySelectorAll('h1, h2, .sub, p.text, .stat, .items, .rows, .kicker, .stat-label')
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0) ink += r.width * r.height;
      });
    const occupancy = ink / (canvas.width * canvas.height);
    if (occupancy > 0.62) {
      out.push(`content fills ${Math.round(occupancy * 100)}% of the canvas, aim under 60%`);
    }

    return out;
  });

  if (issues.length) {
    console.warn('');
    console.warn(`  ! ${label} needs shorter copy:`);
    issues.forEach((i) => console.warn(`      ${i}`));
  }
  return issues;
}

async function loadTemplate(page, templateFile, content) {
  const tpl = path.join(ROOT, 'templates', templateFile);
  // Inject content before the template's own script runs.
  await page.addInitScript((c) => { window.__CONTENT__ = c; }, content);
  await page.goto('file://' + tpl.replace(/\\/g, '/'));
  // Webfonts must finish or the first render uses fallback metrics.
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready);
}

async function renderStatic(browser, content, slug) {
  const page = await newPage(browser, 1080, 1080);
  await loadTemplate(page, 'static.html', content);

  await audit(page, 'Image');

  const file = path.join(OUT, `${slug}.png`);
  await page.screenshot({ path: file });
  await page.close();

  console.log('');
  console.log('  Static image');
  console.log(`  ${path.relative(ROOT, file)}   1080x1080 @2x`);
  console.log('');
  console.log('  Post it with the caption from your queue. Image first, caption second.');
}

async function renderCarousel(browser, content, slug) {
  if (!Array.isArray(content.slides) || content.slides.length === 0) {
    console.error('Carousel content needs a non-empty "slides" array.');
    process.exit(1);
  }
  if (content.slides.length > 12) {
    console.warn(`  ! ${content.slides.length} slides. Past about 10 people stop swiping.`);
  }

  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });

  const page = await newPage(browser, 1200, 1500);
  await loadTemplate(page, 'carousel.html', content);

  await audit(page, 'Carousel');

  const slides = await page.$$('.slide');
  if (slides.length !== content.slides.length) {
    console.warn(`  ! Rendered ${slides.length} slides but content had ${content.slides.length}.`);
  }

  const files = [];
  for (let i = 0; i < slides.length; i++) {
    const f = path.join(dir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: f });
    files.push(f);
  }

  // A PDF of the slides is what LinkedIn actually accepts as a document post.
  //
  // The images must be referenced from a real file:// page. setContent() runs on
  // an about:blank origin, which silently blocks file:// images and yields a PDF
  // of broken-image icons that still looks superficially valid.
  const imgs = files
    .map((f) => `<img src="${path.basename(f)}">`)
    .join('');
  const shim = path.join(dir, '_pdf.html');
  fs.writeFileSync(
    shim,
    `<style>
       @page { size: 1200px 1500px; margin: 0 }
       html, body { margin: 0; padding: 0 }
       img { width: 1200px; height: 1500px; display: block; page-break-after: always }
       img:last-child { page-break-after: auto }
     </style>${imgs}`
  );

  const pdfPage = await browser.newPage();
  await pdfPage.goto('file://' + shim.replace(/\\/g, '/'));
  // Wait for every slide to actually decode, otherwise the PDF races the images.
  await pdfPage.waitForFunction(
    () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
    null,
    { timeout: 30000 }
  );

  const pdf = path.join(OUT, `${slug}.pdf`);
  await pdfPage.pdf({ path: pdf, width: '1200px', height: '1500px', printBackground: true });
  await pdfPage.close();
  await page.close();
  fs.unlinkSync(shim);

  // Verify rather than assume. A PDF of broken icons is still a valid PDF.
  const bytes = fs.statSync(pdf).size;
  const pngBytes = files.reduce((a, f) => a + fs.statSync(f).size, 0);
  if (bytes < pngBytes * 0.2) {
    console.warn('');
    console.warn(`  ! PDF is ${(bytes / 1024).toFixed(0)}KB but the slides total ` +
                 `${(pngBytes / 1024).toFixed(0)}KB.`);
    console.warn('  ! The images probably did not load. Check the PDF before posting.');
  }

  console.log('');
  console.log(`  Carousel, ${files.length} slides`);
  console.log(`  ${path.relative(ROOT, pdf)}    <- upload this to LinkedIn`);
  console.log(`  ${path.relative(ROOT, dir)}\\   PNGs, for checking slides`);
  console.log('');
  console.log('  LinkedIn: start a post, choose Document, upload the PDF, give it a title.');
  console.log('  The title shows above the carousel, so make it the hook.');
}

main().catch((e) => {
  console.error(`Render failed: ${e.message}`);
  process.exit(1);
});
