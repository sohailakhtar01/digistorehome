#!/usr/bin/env node
/**
 * Fetch a CC-licensed photograph from Wikimedia Commons and write it as webp.
 *
 *   node scripts/fetch-commons-image.mjs "<Commons file name>" <out.webp> [width]
 *
 * Prints the licence line the site has to display. Every plant photograph on
 * this site is credited in the footer, so nothing gets published until this
 * command has told us who took it and under what terms.
 *
 * Refuses anything that is not openly licensed — a fair-use or non-free file is
 * not usable here regardless of how good the photograph is.
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const UA = {
  "User-Agent": "thehomesteadshelf/1.0 (hello@thehomesteadshelf.com)",
};

const [name, out, widthArg] = process.argv.slice(2);
if (!name || !out) {
  console.error('usage: fetch-commons-image.mjs "<File name>" <out.webp> [width]');
  process.exit(1);
}
const width = Number(widthArg ?? 900);

const api =
  `https://commons.wikimedia.org/w/api.php?action=query&titles=` +
  `${encodeURIComponent("File:" + name)}` +
  `&prop=imageinfo&iiprop=url%7Cextmetadata%7Csize&iiurlwidth=1600&format=json`;

const j = await (await fetch(api, { headers: UA })).json();
const page = Object.values(j.query?.pages ?? {})[0];
const info = page?.imageinfo?.[0];
if (!info) {
  console.error(`not found on Commons: ${name}`);
  process.exit(1);
}

const clean = (v) =>
  (v?.value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const meta = info.extmetadata ?? {};
const license = clean(meta.LicenseShortName);
const artist = clean(meta.Artist);

if (!license || /fair use|non-free/i.test(license)) {
  console.error(`refusing: licence is "${license || "unknown"}" — not openly licensed`);
  process.exit(1);
}

const res = await fetch(info.thumburl ?? info.url, { headers: UA });
if (!res.ok) {
  console.error(`download failed: ${res.status}`);
  process.exit(1);
}

const src = sharp(Buffer.from(await res.arrayBuffer()));
const dims = await src.metadata();
const webp = await src
  .resize({ width, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toBuffer();
writeFileSync(out, webp);

const final = await sharp(webp).metadata();
console.log(
  `${out}  ${dims.width}x${dims.height} -> ${final.width}x${final.height}  ` +
    `${(webp.length / 1024).toFixed(0)}KB`,
);
console.log(`  license: ${license}`);
console.log(`  author:  ${artist}`);
console.log(`  source:  ${info.descriptionurl}`);
console.log(`  caption: ${clean(meta.ImageDescription).slice(0, 160)}`);
