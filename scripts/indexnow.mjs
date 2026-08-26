#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex, Seznam, Naver) after publishing.
 *
 *   node scripts/indexnow.mjs                 # submit every URL in the sitemap set
 *   node scripts/indexnow.mjs /reviews/foo    # submit specific paths
 *
 * On Windows Git Bash, prefix path arguments with MSYS_NO_PATHCONV=1 or the
 * shell rewrites a leading slash into a Windows path and you submit garbage:
 *   MSYS_NO_PATHCONV=1 node scripts/indexnow.mjs /reviews/foo
 *
 * The key file must be reachable at https://<host>/<key>.txt and contain the key.
 */

// Must match SITE.url. Submitting the apex would submit URLs that 308 away.
const HOST = "www.thehomesteadshelf.com";
const KEY = "c19d001cf981407f870c3acf3a5c48f9";

// Paths are read from the live sitemap rather than hardcoded here. The
// previous hardcoded list silently went stale the moment a page was added,
// which meant new pages were never submitted.
async function sitemapPaths() {
  const res = await fetch(`https://${HOST}/sitemap.xml`, {
    headers: { "User-Agent": "thehomesteadshelf-indexnow/1.0" },
  });
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) throw new Error("sitemap contained no <loc> entries");
  // Discovery files are not in the sitemap but are worth pinging too.
  return [...locs.map((u) => new URL(u).pathname), "/llms.txt", "/feed.xml"];
}


const paths = process.argv.slice(2);
const urlList = (paths.length ? paths : await sitemapPaths()).map(
  (p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`,
);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

console.log(`Submitting ${urlList.length} URL(s) to IndexNow...`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

// IndexNow returns 200 or 202 on success. 403 means the key file is not
// reachable yet — deploy first, confirm https://<host>/<key>.txt loads, retry.
if (res.ok) {
  console.log(`OK (${res.status}) — submitted:`);
  urlList.forEach((u) => console.log(`  ${u}`));
} else {
  console.error(`FAILED (${res.status} ${res.statusText})`);
  console.error(await res.text().catch(() => ""));
  console.error(
    `\nCheck that https://${HOST}/${KEY}.txt is live and contains exactly:\n${KEY}`,
  );
  process.exitCode = 1;
}
