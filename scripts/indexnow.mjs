#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex, Seznam, Naver) after publishing.
 *
 *   node scripts/indexnow.mjs                 # submit every URL in the sitemap set
 *   node scripts/indexnow.mjs /reviews/foo    # submit specific paths
 *
 * The key file must be reachable at https://<host>/<key>.txt and contain the key.
 */

const HOST = "thehomesteadshelf.com";
const KEY = "c19d001cf981407f870c3acf3a5c48f9";

const DEFAULT_PATHS = [
  "/",
  "/reviews",
  "/reviews/medicinal-garden-kit",
  "/guides",
  "/guides/medicinal-herbs-to-grow",
  "/guides/cold-stratification",
  "/guides/echinacea",
  "/guides/lavender",
  "/about",
  "/disclosure",
  "/contact",
  "/privacy",
  "/terms",
  "/llms.txt",
  "/feed.xml",
];

const paths = process.argv.slice(2);
const urlList = (paths.length ? paths : DEFAULT_PATHS).map(
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
