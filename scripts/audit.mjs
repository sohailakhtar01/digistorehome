#!/usr/bin/env node
/**
 * Static audit of the build output: broken internal links, missing OG images,
 * thin pages. Run after `next build`.
 *
 *   node scripts/audit.mjs
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, sep } from "node:path";

const root = join(".next", "server", "app");
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) pages.push(p);
  }
})(root);

function routeOf(file) {
  const rel = file.slice(root.length + 1).split(sep).join("/");
  const r = "/" + rel.replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
}

const routes = new Set(pages.map(routeOf));
routes.add("/");
// Route handlers and public files are real destinations but produce no .html.
for (const extra of [
  "/llms.txt",
  "/llms-full.txt",
  "/feed.xml",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
]) {
  routes.add(extra);
}

const broken = new Set();
const noOg = [];
const thin = [];

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = routeOf(file);

  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let href = m[1];
    if (href.startsWith("/_next") || href.startsWith("/img") || href.startsWith("/.well-known")) {
      continue;
    }
    href = href.length > 1 ? href.replace(/\/$/, "") : href;
    if (!routes.has(href)) broken.add(`${route}  ->  ${href}`);
  }

  if (!/property="og:image"/.test(html)) noOg.push(route);

  const words = (
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<[^>]*>/g, " ")
      .match(/\S+/g) || []
  ).length;
  if (words < 300) thin.push(`${route} (${words}w)`);
}

const report = (label, list) => {
  console.log(`\n${label}: ${list.length}`);
  list.forEach((x) => console.log("  " + x));
};

console.log(`pages built: ${pages.length}`);
report("broken internal links", [...broken]);
report("pages with no og:image", noOg);
report("thin pages (<300 words)", thin);
