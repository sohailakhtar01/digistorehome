#!/usr/bin/env node
/**
 * Measures real horizontal overflow at mobile widths by driving headless
 * Chrome over the DevTools Protocol. A screenshot only shows you that content
 * is clipped; this tells you which element is doing it.
 *
 *   node scripts/check-responsive.mjs http://localhost:3111 [width]
 *
 * Exits non-zero if any page scrolls horizontally.
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.argv[2] ?? "http://localhost:3111";
const WIDTH = Number(process.argv[3] ?? 390);
const HEIGHT = 844;
const PORT = 9222;

const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const PATHS = [
  "/",
  "/reviews",
  "/reviews/medicinal-garden-kit",
  "/guides",
  "/guides/medicinal-herbs-to-grow",
  "/guides/cold-stratification",
  "/guides/harvesting-coneflower-seeds",
  "/guides/when-to-plant",
  "/guides/calendula",
  "/guides/echinacea",
  "/guides/lavender",
  "/guides/marshmallow",
  "/about",
  "/contact",
  "/disclosure",
  "/privacy",
  "/terms",
];

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  `--window-size=${WIDTH},${HEIGHT}`,
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
  throw new Error("chrome did not expose a debugging endpoint");
}

let id = 0;
function rpc(ws, method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const msgId = ++id;
    const onMessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id !== msgId) return;
      ws.removeEventListener("message", onMessage);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    };
    ws.addEventListener("message", onMessage);
    ws.send(JSON.stringify({ id: msgId, method, params, sessionId }));
  });
}

// Runs in the page. Reports the widest offenders rather than just a boolean,
// because "something overflows" is not actionable.
const PROBE = `(() => {
  const docW = document.documentElement.clientWidth;
  const scrollW = document.documentElement.scrollWidth;
  const guilty = [];
  if (scrollW > docW + 1) {
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > docW + 1 || r.left < -1) {
        guilty.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute("class") || "").slice(0, 90),
          right: Math.round(r.right),
          left: Math.round(r.left),
          text: (el.textContent || "").trim().slice(0, 45),
        });
      }
    }
  }
  return JSON.stringify({ docW, scrollW, guilty: guilty.slice(0, 6) });
})()`;

const wsUrl = await endpoint();
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let failures = 0;
for (const path of PATHS) {
  const { targetId } = await rpc(ws, "Target.createTarget", { url: "about:blank" });
  const { sessionId } = await rpc(ws, "Target.attachToTarget", {
    targetId,
    flatten: true,
  });
  await rpc(ws, "Page.enable", {}, sessionId);
  await rpc(
    ws,
    "Emulation.setDeviceMetricsOverride",
    { width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: true },
    sessionId,
  );
  await rpc(ws, "Page.navigate", { url: BASE + path }, sessionId);
  await sleep(900);

  const { result } = await rpc(
    ws,
    "Runtime.evaluate",
    { expression: PROBE, returnByValue: true },
    sessionId,
  );
  const data = JSON.parse(result.value);
  const over = data.scrollW - data.docW;

  if (over > 1) {
    failures++;
    console.log(`\nOVERFLOW  ${path}  (${data.scrollW}px in a ${data.docW}px viewport, +${over})`);
    for (const g of data.guilty) {
      console.log(`   <${g.tag}> right=${g.right} left=${g.left}  class="${g.cls}"`);
      if (g.text) console.log(`        "${g.text}"`);
    }
  } else {
    console.log(`ok        ${path}`);
  }
  await rpc(ws, "Target.closeTarget", { targetId });
}

ws.close();
chrome.kill();
console.log(`\n${failures ? `${failures} page(s) overflow at ${WIDTH}px` : `no horizontal overflow at ${WIDTH}px`}`);
process.exit(failures ? 1 : 0);
