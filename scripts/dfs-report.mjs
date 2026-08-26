#!/usr/bin/env node
/**
 * Reads every research/raw/dfs/*.json keyword_suggestions response and prints
 * one table per cluster under the KD ceiling given as argv[0] (default 30).
 *
 * Keywords whose keyword_difficulty is null are printed as UNKNOWN and kept
 * OUT of the "passes the filter" counts. A missing difficulty is missing data,
 * not a difficulty of zero.
 */
import { readdirSync, readFileSync } from "node:fs";

const KD_MAX = Number(process.argv[2] ?? 30);
const dir = "research/raw/dfs";

for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const j = JSON.parse(readFileSync(`${dir}/${f}`, "utf8"));
  const items = j.tasks?.[0]?.result?.[0]?.items ?? [];
  const rows = items.map((it) => ({
    kw: it.keyword,
    vol: it.keyword_info?.search_volume ?? 0,
    kd: it.keyword_properties?.keyword_difficulty ?? null,
    rd: it.avg_backlinks_info?.referring_domains ?? null,
    cpc: it.keyword_info?.cpc ?? 0,
    intent: it.search_intent_info?.main_intent ?? "?",
  }));
  const pass = rows.filter((r) => r.kd !== null && r.kd <= KD_MAX);
  const unknown = rows.filter((r) => r.kd === null);
  const vol = pass.reduce((a, r) => a + r.vol, 0);
  console.log(
    `\n### ${f.replace(".json", "")} — ${rows.length} kw total | ` +
      `${pass.length} at KD<=${KD_MAX} (${vol.toLocaleString()}/mo) | ` +
      `${unknown.length} KD unknown`,
  );
  console.log(`${"keyword".padEnd(42)}${"vol".padStart(8)}${"KD".padStart(5)}${"RD".padStart(6)}  intent`);
  for (const r of pass.sort((a, b) => b.vol - a.vol).slice(0, 14)) {
    console.log(
      r.kw.slice(0, 40).padEnd(42) +
        String(r.vol).padStart(8) +
        String(r.kd).padStart(5) +
        (r.rd === null ? "  ?" : r.rd.toFixed(0)).padStart(6) +
        "  " + r.intent,
    );
  }
}
