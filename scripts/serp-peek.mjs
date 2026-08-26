import { readFileSync } from "node:fs";
// Gate 2: is this SERP independent blogs, or shops and institutions?
const SHOP = /burpee|parkseed|edenbrothers|johnnyseeds|rareseeds|amazon|etsy|swallowtail|trueleaf|anniesheirloom|seedsnow|botanicalinterests|ferrymorse|walmart|homedepot|bulkwildflowers|seedtherapy|sowright|survivalgarden|thegrowers|gurney|parkseed|edenbros|store\./i;
const INST = /\.edu|\.gov|extension|wikipedia|britannica|rhs\.org|kew\.org|almanac\.com|bbc\./i;
const UGC  = /reddit|quora|youtube|facebook|instagram|pinterest|medium\.com|tiktok/i;
for (const f of process.argv.slice(2)) {
  const j = JSON.parse(readFileSync(`research/raw/dfs/${f}.json`, "utf8"));
  const r = j.tasks[0].result[0];
  const org = (r.items || []).filter((i) => i.type === "organic").slice(0, 10);
  let shop = 0, inst = 0, ugc = 0, blog = 0;
  const lines = org.map((it) => {
    const d = it.domain;
    let tag = "blog";
    if (SHOP.test(d)) { tag = "SHOP"; shop++; }
    else if (INST.test(d)) { tag = "inst"; inst++; }
    else if (UGC.test(d)) { tag = "ugc"; ugc++; }
    else blog++;
    return `  ${String(it.rank_group).padStart(2)} ${tag.padEnd(5)} ${d}`;
  });
  const feats = (r.item_types || []).filter((t) => /product|local_pack|shopping/.test(t));
  const verdict = shop >= 4 || feats.length ? "REJECT (retail/local intent)" : blog >= 4 ? "OPEN (blog SERP)" : "MIXED";
  console.log(`\n${r.keyword}\n  => ${verdict}  [shops ${shop} | blogs ${blog} | inst ${inst} | ugc ${ugc}]${feats.length ? "  flags: " + feats.join(",") : ""}`);
  console.log(lines.join("\n"));
}
