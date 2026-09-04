#!/usr/bin/env node
/**
 * Render 1000x1500 (2:3) Pinterest pins for the guides.
 *
 *   node scripts/make-pins.mjs            # all pins
 *   node scripts/make-pins.mjs lavender   # one, by slug
 *
 * Why this exists: the site ranks 52-85 in Google because it is ten days old
 * with zero referring domains, and no amount of on-page work moves that. Pinterest
 * ranks pins by engagement rather than domain age, so it is the one channel where
 * this site competes on equal terms with RHS and Gardener's World today.
 *
 * Every fact printed on a pin is read from herbs.js -- the same source the guides
 * render from. Nothing here is written by hand, so a pin cannot drift away from
 * what the page actually says.
 */
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { pathToFileURL } from "node:url";

const PORT = 9224;
const OUT_DIR = "public/img/pins";
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const { HERBS } = await import(pathToFileURL("src/lib/herbs.js").href);
const only = process.argv[2];

// Photo per slug. Some herbs have several files; the plain <slug>.webp is the
// portrait-friendly one in every case.
const photo = (slug) => `public/img/herbs/${slug}.webp`;

const dataUri = (file) => {
  const ext = file.split(".").pop();
  const mime = ext === "webp" ? "image/webp" : `image/${ext}`;
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Template A -- editorial. Headline first, photo below, data strip.
 *
 * Two templates exist because Pinterest suppresses near-duplicate images, and a
 * board needs steady output rather than one upload. Two visually distinct pins
 * per guide is a month of scheduling from one command.
 *
 * Inline everything -- the renderer loads no network.
 */
function templateA({ eyebrow, title, facts, img, footnote }) {
  return `<!doctype html><meta charset="utf-8">
<style>
  @page { margin: 0 }
  * { box-sizing: border-box; margin: 0; padding: 0 }
  body {
    width: 1000px; height: 1500px; overflow: hidden;
    background: #fbf8f1; color: #1a1815;
    font-family: "Segoe UI", system-ui, sans-serif;
    display: flex; flex-direction: column;
  }
  .top { padding: 66px 70px 0 }
  .eyebrow {
    font-size: 27px; font-weight: 700; letter-spacing: .17em;
    text-transform: uppercase; color: #1f4a34;
  }
  .rule { width: 92px; height: 5px; background: #c08a2e; margin: 26px 0 30px }
  h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 86px; line-height: 1.03; font-weight: 700;
    letter-spacing: -.018em; color: #12291d;
  }
  .photo {
    margin: 46px 70px 0; height: 560px; border-radius: 22px;
    background-size: cover; background-position: center;
    box-shadow: 0 18px 44px -12px rgba(26,24,21,.28);
  }
  .facts {
    margin: 0 70px; padding: 40px 0 0;
    display: flex; gap: 18px;
  }
  .fact {
    flex: 1; background: #fff; border: 2px solid #e6dece;
    border-radius: 16px; padding: 22px 20px; min-width: 0;
  }
  .fact .k {
    font-size: 20px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: #6b6459;
  }
  .fact .v {
    font-size: 31px; font-weight: 700; color: #1f4a34;
    margin-top: 9px; line-height: 1.16;
  }
  .foot {
    margin-top: auto; background: #1f4a34; color: #fbf8f1;
    padding: 36px 70px 40px;
    display: flex; align-items: baseline; justify-content: space-between;
  }
  .foot .site { font-size: 35px; font-weight: 700; letter-spacing: -.01em }
  .foot .note { font-size: 25px; color: #cfe0d4 }
</style>
<div class="top">
  <div class="eyebrow">${esc(eyebrow)}</div>
  <div class="rule"></div>
  <h1>${esc(title)}</h1>
</div>
<div class="photo" style="background-image:url('${img}')"></div>
<div class="facts">
  ${facts
    .map(
      (f) =>
        `<div class="fact"><div class="k">${esc(f.k)}</div><div class="v">${esc(f.v)}</div></div>`,
    )
    .join("")}
</div>
<div class="foot">
  <div class="site">thehomesteadshelf.com</div>
  <div class="note">${esc(footnote)}</div>
</div>`;
}

/** Template B -- photo-led. Full-bleed image, headline reversed out of it. */
function templateB({ eyebrow, title, facts, img, footnote }) {
  // The eyebrow already carries difficulty here, so the badge shows the next
  // fact along rather than saying the same thing twice.
  const hero = facts[1] ?? facts[0];
  return `<!doctype html><meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0 }
  body {
    width: 1000px; height: 1500px; overflow: hidden; position: relative;
    background: #12291d url('${img}') center/cover no-repeat;
    font-family: "Segoe UI", system-ui, sans-serif; color: #fff;
  }
  .scrim {
    position: absolute; inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10,20,14,.82) 0%, rgba(10,20,14,.42) 34%,
      rgba(10,20,14,.55) 62%, rgba(10,20,14,.93) 100%);
  }
  .inner {
    position: relative; height: 100%;
    display: flex; flex-direction: column; padding: 74px 68px 64px;
  }
  .eyebrow {
    font-size: 26px; font-weight: 700; letter-spacing: .19em;
    text-transform: uppercase; color: #e2c98a;
  }
  h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 92px; line-height: 1.02; font-weight: 700;
    letter-spacing: -.02em; margin-top: 26px;
    text-shadow: 0 3px 26px rgba(0,0,0,.5);
  }
  .badge {
    margin-top: auto; align-self: flex-start;
    background: #fbf8f1; color: #12291d;
    border-radius: 15px; padding: 24px 32px;
    box-shadow: 0 14px 38px -10px rgba(0,0,0,.55);
  }
  .badge .k {
    font-size: 20px; font-weight: 700; letter-spacing: .11em;
    text-transform: uppercase; color: #6b6459;
  }
  .badge .v {
    font-size: 46px; font-weight: 700; color: #1f4a34; margin-top: 6px;
  }
  .foot {
    margin-top: 46px; padding-top: 30px;
    border-top: 2px solid rgba(255,255,255,.28);
    display: flex; align-items: baseline; justify-content: space-between;
  }
  .foot .site { font-size: 34px; font-weight: 700 }
  .foot .note { font-size: 24px; color: #d7e2da }
</style>
<div class="scrim"></div>
<div class="inner">
  <div class="eyebrow">${esc(eyebrow)}</div>
  <h1>${esc(title)}</h1>
  <div class="badge">
    <div class="k">${esc(hero.k)}</div>
    <div class="v">${esc(hero.v)}</div>
  </div>
  <div class="foot">
    <div class="site">thehomesteadshelf.com</div>
    <div class="note">${esc(footnote)}</div>
  </div>
</div>`;
}

const TEMPLATES = { a: templateA, b: templateB };

/** Pin specs. Facts come straight from herbs.js. */
function specs() {
  const list = HERBS.filter((h) => existsSync(photo(h.slug))).map((h) => ({
    slug: h.slug,
    eyebrow: "Growing from seed",
    // Template B leads on difficulty because that is the honest hook and it is
    // already in the data. Only six of the ten guides have a "when to sow"
    // section, so a timing headline would be false on the other four.
    eyebrowB: `${h.difficulty} from seed`,
    title: `How to Grow ${h.name.split(" (")[0]} From Seed`,
    img: dataUri(photo(h.slug)),
    facts: [
      { k: "Difficulty", v: h.difficulty },
      { k: "Germinates", v: h.germDays.replace(/,.*$/, "") },
      { k: "Cold start", v: h.timing.stratWeeks > 0 ? `${h.timing.stratWeeks} weeks` : "Not needed" },
    ],
    footnote: "Honest growing guides",
  }));

  const strat = HERBS.filter((h) => h.timing.stratWeeks > 0).length;
  list.push({
    slug: "cold-stratification",
    eyebrow: "Seed starting",
    eyebrowB: "Before you sow",
    title: "Which Seeds Actually Need Cold Stratification",
    img: dataUri(photo("echinacea")),
    facts: [
      { k: "Species covered", v: `${HERBS.length} herbs` },
      { k: "Genuinely need it", v: `${strat} of ${HERBS.length}` },
      { k: "Cost", v: "Free" },
    ],
    footnote: "Fridge method, step by step",
  });

  return only ? list.filter((p) => p.slug === only) : list;
}

// --- headless Chrome -------------------------------------------------------
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--hide-scrollbars",
  "about:blank",
]);

async function endpoint() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return (await r.json()).webSocketDebuggerUrl;
    } catch {
      /* not up yet */
    }
    await sleep(250);
  }
  throw new Error("no devtools endpoint");
}

let msgId = 0;
function rpc(ws, method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++msgId;
    const onMessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id !== id) return;
      ws.removeEventListener("message", onMessage);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    };
    ws.addEventListener("message", onMessage);
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
}

const ws = new WebSocket(await endpoint());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
const { targetId } = await rpc(ws, "Target.createTarget", { url: "about:blank" });
const { sessionId } = await rpc(ws, "Target.attachToTarget", { targetId, flatten: true });
await rpc(ws, "Page.enable", {}, sessionId);
await rpc(
  ws,
  "Emulation.setDeviceMetricsOverride",
  { width: 1000, height: 1500, deviceScaleFactor: 1, mobile: false },
  sessionId,
);

mkdirSync(OUT_DIR, { recursive: true });
const pins = specs();
if (!pins.length) {
  console.error(only ? `no pin for slug "${only}"` : "no pins to build");
  ws.close();
  chrome.kill();
  process.exit(1);
}

let written = 0;
for (const pin of pins) {
  for (const [key, render] of Object.entries(TEMPLATES)) {
    const html = render({
      ...pin,
      eyebrow: key === "b" ? (pin.eyebrowB ?? pin.eyebrow) : pin.eyebrow,
    });
    await rpc(
      ws,
      "Page.navigate",
      { url: `data:text/html;charset=utf-8,${encodeURIComponent(html)}` },
      sessionId,
    );
    await sleep(450);
    // JPEG, not PNG: these are photographs, and Pinterest re-encodes anything
    // it fetches anyway. Quality 88 holds up on the type at full size for a
    // quarter of the bytes.
    const { data } = await rpc(
      ws,
      "Page.captureScreenshot",
      { format: "jpeg", quality: 88 },
      sessionId,
    );
    // Variant A keeps the bare slug so existing page references stay valid.
    const out = `${OUT_DIR}/${pin.slug}${key === "a" ? "" : `-${key}`}.jpg`;
    writeFileSync(out, Buffer.from(data, "base64"));
    console.log(`${out}  ${pin.title}`);
    written++;
  }
}

console.log(
  `\n${written} pins written to ${OUT_DIR}/ ` +
    `(${pins.length} guides x ${Object.keys(TEMPLATES).length} templates)`,
);
ws.close();
chrome.kill();
