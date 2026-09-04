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

/** One pin's markup. Inline everything -- the renderer loads no network. */
function pinHtml({ eyebrow, title, facts, img, footnote }) {
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

/** Pin specs. Facts come straight from herbs.js. */
function specs() {
  const list = HERBS.filter((h) => existsSync(photo(h.slug))).map((h) => ({
    slug: h.slug,
    eyebrow: "Growing from seed",
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

for (const pin of pins) {
  const html = pinHtml(pin);
  await rpc(
    ws,
    "Page.navigate",
    { url: `data:text/html;charset=utf-8,${encodeURIComponent(html)}` },
    sessionId,
  );
  await sleep(450);
  // JPEG, not PNG: these are photographs, and Pinterest re-encodes anything it
  // fetches anyway. Quality 88 holds up on the type at full size for a quarter
  // of the bytes.
  const { data } = await rpc(
    ws,
    "Page.captureScreenshot",
    { format: "jpeg", quality: 88 },
    sessionId,
  );
  const out = `${OUT_DIR}/${pin.slug}.jpg`;
  writeFileSync(out, Buffer.from(data, "base64"));
  console.log(`${out}  ${pin.title}`);
}

console.log(`\n${pins.length} pin${pins.length === 1 ? "" : "s"} written to ${OUT_DIR}/`);
ws.close();
chrome.kill();
