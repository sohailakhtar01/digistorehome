#!/usr/bin/env node
/** Poll a deployed URL until it contains a marker string. */
const [url, marker, tries = "25"] = process.argv.slice(2);
for (let i = 0; i < Number(tries); i++) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, cache: "no-store" });
  const h = await r.text();
  if (r.status === 200 && h.includes(marker)) {
    console.log(`deployed after ${i * 6}s`);
    process.exit(0);
  }
  await new Promise((res) => setTimeout(res, 6000));
}
console.log("marker not found in time");
process.exit(1);
