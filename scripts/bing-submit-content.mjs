#!/usr/bin/env node
/**
 * Push page content straight into Bing's index via the Content Submission API.
 *
 *   node scripts/bing-submit-content.mjs            # every URL in the sitemap
 *   node scripts/bing-submit-content.mjs /reviews/x # specific paths
 *   node scripts/bing-submit-content.mjs --dry      # show what would be sent
 *
 * Why this exists: Bing had not crawled this domain at all — GetUrlInfo
 * returned HttpStatus 0 and a null LastCrawledDate two days after launch, and
 * GetLinkCounts returned zero. Bingbot is conservative with a new domain that
 * nothing on the web links to, and IndexNow only queues a URL; it does not buy
 * crawl budget. SubmitContent skips the crawl and hands Bing the bytes.
 *
 * The content submitted is fetched live from the site immediately before
 * sending, so what Bing is given is exactly what a visitor gets. Never
 * hand-build the payload — submitting content that differs from the served
 * page is cloaking, and Bing treats it as such.
 *
 * Quota: 100/day, 500/month (GetContentSubmissionQuota). On Windows Git Bash
 * prefix path arguments with MSYS_NO_PATHCONV=1.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const HOST = "www.thehomesteadshelf.com";
const SITE = `https://${HOST}`;

const cfg = JSON.parse(readFileSync(join(homedir(), ".claude.json"), "utf8"));
const KEY = cfg.mcpServers["bing-webmaster"].env.BING_WEBMASTER_API_KEY;
if (!KEY) throw new Error("BING_WEBMASTER_API_KEY not found in ~/.claude.json");

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const paths = args.filter((a) => !a.startsWith("--"));

async function sitemapPaths() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
}

/**
 * A well-formed HTTP/1.1 response wrapping the page HTML.
 *
 * Bing wants the whole message — status line, headers, a blank CRLF line, then
 * the content. Sending the body alone fails with "Couldnot find carriage
 * return line feed separating http headers and content".
 */
const CRLF = "\r\n";
function httpMessage(html) {
  const length = Buffer.byteLength(html, "utf8");
  return [
    "HTTP/1.1 200 OK",
    "Content-Type: text/html; charset=utf-8",
    `Content-Length: ${length}`,
    "",
    html,
  ].join(CRLF);
}

const targets = (paths.length ? paths : await sitemapPaths()).map((p) =>
  p.startsWith("/") ? p : `/${p}`,
);

let ok = 0;
let failed = 0;

for (const path of targets) {
  const url = `${SITE}${path}`;

  const page = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
  });
  const html = await page.text();
  if (!page.ok) {
    console.log(`  SKIP ${path} — site returned ${page.status}`);
    failed++;
    continue;
  }

  if (dry) {
    console.log(`  would submit ${path} (${html.length} bytes)`);
    continue;
  }

  const res = await fetch(
    `https://ssl.bing.com/webmaster/api.svc/json/SubmitContent?apikey=${KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        siteUrl: SITE,
        url,
        // Base64 of the message bytes, not of a UTF-16 JS string.
        httpMessage: Buffer.from(httpMessage(html), "utf8").toString("base64"),
        structuredData: "",
        dynamicServing: 0,
      }),
    },
  );

  const text = await res.text();
  if (res.ok) {
    ok++;
    console.log(`  ok   ${path} (${html.length} bytes)`);
  } else {
    failed++;
    console.log(`  FAIL ${path} — ${res.status} ${text.slice(0, 200)}`);
  }

  // Be a polite client rather than hammering the endpoint 23 times over.
  await new Promise((r) => setTimeout(r, 400));
}

console.log(`\n${ok} submitted, ${failed} failed, of ${targets.length}`);
