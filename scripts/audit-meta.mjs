#!/usr/bin/env node
/**
 * Audits <title> and meta description lengths across the build output.
 *
 * Google truncates titles at roughly 580-600px, which is about 60 characters
 * for mixed-case text, and descriptions at about 155-160. Nothing here is a
 * ranking factor on its own — an over-long title is not a penalty — but a
 * headline that gets cut mid-word is a click lost, and a description Google
 * discards means it writes its own snippet from whatever text it likes,
 * including the footer.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, sep } from "node:path";

const TITLE_MAX = 60;
const DESC_MIN = 110;
const DESC_MAX = 158;

const root = join(".next", "server", "app");
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) pages.push(p);
  }
})(root);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ");

const rows = [];
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route =
    "/" + file.slice(root.length + 1).split(sep).join("/").replace(/\.html$/, "");
  if (route.startsWith("/_")) continue;

  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const desc = decode(
    (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "",
  );
  rows.push({
    route: route === "/index" ? "/" : route,
    title,
    tLen: title.length,
    desc,
    dLen: desc.length,
  });
}

rows.sort((a, b) => b.tLen - a.tLen);

console.log(`${"route".padEnd(38)}${"title".padStart(6)}${"desc".padStart(6)}`);
console.log("-".repeat(52));
let bad = 0;
for (const r of rows) {
  const tFlag = r.tLen > TITLE_MAX ? " TITLE" : "";
  const dFlag = r.dLen > DESC_MAX ? " DESC-LONG" : r.dLen < DESC_MIN ? " DESC-SHORT" : "";
  if (tFlag || dFlag) bad++;
  console.log(
    `${r.route.padEnd(38)}${String(r.tLen).padStart(6)}${String(r.dLen).padStart(6)}${tFlag}${dFlag}`,
  );
}

console.log(`\n${bad} of ${rows.length} pages outside target ranges`);
console.log(`(title <= ${TITLE_MAX}, description ${DESC_MIN}-${DESC_MAX})\n`);

for (const r of rows.filter((r) => r.tLen > TITLE_MAX)) {
  console.log(`${r.route}`);
  console.log(`  full  : ${r.title}`);
  console.log(`  shown : ${r.title.slice(0, TITLE_MAX)}…`);
}
