#!/usr/bin/env node
/**
 * Screenshot a URL with real mobile viewport emulation.
 *
 *   node scripts/shot.mjs <url> <out.png> [width] [height] [--full] [--scroll=N]
 *
 * --scroll=N scrolls N pixels down before capturing, which is the only way to
 * see anything that reveals itself on scroll (the sticky offer bar).
 *
 * Chrome's --window-size alone does NOT apply the page's viewport meta tag, so
 * plain headless screenshots at phone widths render the desktop layout and
 * look clipped even when the page is fine. This drives the DevTools Protocol
 * with setDeviceMetricsOverride so what you see matches a real phone.
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const [url, out, w = "390", h = "844", ...rest] = process.argv.slice(2);
const full = rest.includes("--full");
const scrollTo = Number(
  (rest.find((a) => a.startsWith("--scroll=")) ?? "--scroll=0").split("=")[1],
);
const WIDTH = Number(w);
const HEIGHT = Number(h);
const PORT = 9223;

const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
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

const ws = new WebSocket(await endpoint());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

const { targetId } = await rpc(ws, "Target.createTarget", { url: "about:blank" });
const { sessionId } = await rpc(ws, "Target.attachToTarget", { targetId, flatten: true });
await rpc(ws, "Page.enable", {}, sessionId);
await rpc(
  ws,
  "Emulation.setDeviceMetricsOverride",
  { width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: WIDTH < 768 },
  sessionId,
);
await rpc(ws, "Page.navigate", { url }, sessionId);
await sleep(1200);

if (scrollTo > 0) {
  await rpc(
    ws,
    "Runtime.evaluate",
    { expression: `window.scrollTo(0, ${scrollTo})`, awaitPromise: false },
    sessionId,
  );
  // Let the IntersectionObserver fire and any transition finish.
  await sleep(700);
}

const shot = await rpc(
  ws,
  "Page.captureScreenshot",
  { format: "png", captureBeyondViewport: full },
  sessionId,
);
writeFileSync(out, Buffer.from(shot.data, "base64"));
console.log(`${out}  ${WIDTH}x${full ? "full" : HEIGHT}`);

ws.close();
chrome.kill();
