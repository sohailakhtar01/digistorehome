#!/usr/bin/env node
/** Prints the DataForSEO account balance. Credentials come from ~/.claude.json. */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const cfg = JSON.parse(readFileSync(join(homedir(), ".claude.json"), "utf8"));
const env = cfg.mcpServers.dataforseo.env;
const auth = Buffer.from(
  `${env.DATAFORSEO_LOGIN}:${env.DATAFORSEO_PASSWORD}`,
).toString("base64");

const res = await fetch("https://api.dataforseo.com/v3/appendix/user_data", {
  headers: { Authorization: `Basic ${auth}` },
});
const json = await res.json();
const money = json.tasks?.[0]?.result?.[0]?.money;
console.log(
  money
    ? `balance $${money.balance.toFixed(2)} | spent today $${(money.total?.today ?? 0).toFixed(2)}`
    : JSON.stringify(json).slice(0, 300),
);
