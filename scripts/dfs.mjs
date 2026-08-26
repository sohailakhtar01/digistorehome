#!/usr/bin/env node
/**
 * DataForSEO research harness.
 *
 *   echo '<payload json>' | node scripts/dfs.mjs <endpoint-path> <out-name>
 *
 * The payload arrives on stdin so no temp-file path is involved — Git Bash
 * rewrites leading-slash arguments into Windows paths, which silently corrupts
 * both the endpoint and any /tmp payload path. Run with MSYS_NO_PATHCONV=1.
 *
 * Saves the raw response to research/raw/dfs/<out-name>.json and prints
 * nothing but the cost, so the caller can parse the file on its own terms.
 * Credentials are read from ~/.claude.json rather than being passed on the
 * command line, so they never appear in shell history or process listings.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const cfg = JSON.parse(readFileSync(join(homedir(), ".claude.json"), "utf8"));
const env = cfg.mcpServers.dataforseo.env;
const auth = Buffer.from(
  `${env.DATAFORSEO_LOGIN}:${env.DATAFORSEO_PASSWORD}`,
).toString("base64");

const [path, outName] = process.argv.slice(2);
const payload = JSON.parse(readFileSync(0, "utf8"));

const res = await fetch(`https://api.dataforseo.com${path}`, {
  method: "POST",
  headers: {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

const json = await res.json();
mkdirSync("research/raw/dfs", { recursive: true });
writeFileSync(`research/raw/dfs/${outName}.json`, JSON.stringify(json, null, 1));

const task = json.tasks?.[0];
console.log(
  `${outName}: status=${json.status_code} cost=$${json.cost ?? 0} ` +
    `items=${task?.result?.[0]?.items?.length ?? 0} ` +
    `total=${task?.result?.[0]?.total_count ?? "?"}` +
    (task?.status_message && task.status_code !== 20000
      ? ` MSG=${task.status_message}`
      : ""),
);
