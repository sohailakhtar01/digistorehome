"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { byDifficulty } from "@/lib/herbs";

/**
 * Works backwards from the reader's own last frost date to a per-species
 * schedule. Every number comes from herbs.js `timing`, which is the same
 * guidance written out in each species guide — the calculator does arithmetic,
 * it does not invent horticulture.
 */

const MS_WEEK = 7 * 24 * 60 * 60 * 1000;

const fmt = (d) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

// A sensible mid-spring default so the table is never empty on first paint.
// The reader is told what it is and asked to change it.
const DEFAULT_FROST = "2027-04-15";

function schedule(herb, frost) {
  const t = herb.timing;
  const rows = [];

  if (t.method === "direct") {
    rows.push({
      label: "Direct sow outdoors",
      date: herb.slug === "california-poppy" ? addWeeks(frost, -4) : frost,
      hint:
        herb.slug === "california-poppy"
          ? "As soon as the soil is workable — it wants cool soil"
          : "Once frost has passed and soil has warmed",
    });
    return rows;
  }

  const sow = addWeeks(frost, -t.sowWeeksBefore);

  if (t.stratWeeks > 0) {
    rows.push({
      label: "Start cold stratification",
      date: addWeeks(sow, -t.stratWeeks),
      hint: `${t.stratWeeks} weeks in the refrigerator, barely damp`,
    });
  }

  rows.push({
    label: t.method === "both" ? "Sow indoors (or wait and direct sow)" : "Sow indoors",
    date: sow,
    hint: `${t.sowWeeksBefore} weeks before your last frost`,
  });

  rows.push({
    label: "Harden off and transplant",
    date: addWeeks(frost, 1),
    hint: "About a week after your last frost date",
  });

  return rows;
}

function addWeeks(date, weeks) {
  return new Date(date.getTime() + weeks * MS_WEEK);
}

export default function SeedCalendar() {
  const [frostInput, setFrostInput] = useState(DEFAULT_FROST);

  const herbs = useMemo(() => byDifficulty(), []);

  const frost = useMemo(() => {
    // Parse as local midday so a timezone offset can never shift the date.
    const [y, m, d] = frostInput.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d, 12);
  }, [frostInput]);

  // The earliest action across all ten — the date that actually matters,
  // because everything else can still be caught up on.
  const firstAction = useMemo(() => {
    if (!frost) return null;
    let earliest = null;
    let who = null;
    for (const h of herbs) {
      for (const row of schedule(h, frost)) {
        if (!earliest || row.date < earliest) {
          earliest = row.date;
          who = { herb: h, row };
        }
      }
    }
    return who ? { ...who, date: earliest } : null;
  }, [herbs, frost]);

  return (
    <div className="not-prose">
      <div className="rounded-xl border border-line-strong bg-surface p-5 sm:p-6">
        <label
          htmlFor="frost-date"
          className="block text-sm font-semibold text-foreground"
        >
          Your last spring frost date
        </label>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          The average date of the last frost where you garden. If you do not know
          it, your local extension service or a neighbour who grows vegetables
          will. Everything below counts backwards from this one date.
        </p>
        <input
          id="frost-date"
          type="date"
          value={frostInput}
          onChange={(e) => setFrostInput(e.target.value)}
          className="mt-3.5 w-full rounded-lg border border-line-strong bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition-colors focus:border-accent sm:w-auto"
        />
        {frostInput === DEFAULT_FROST ? (
          <p className="mt-2.5 text-xs text-subtle">
            Showing a mid-April default. Change it to your own date.
          </p>
        ) : null}
      </div>

      {frost && firstAction ? (
        <div className="mt-5 rounded-xl border border-gold/35 bg-gold-soft px-5 py-4">
          <p className="text-sm leading-relaxed text-muted">
            <strong className="font-semibold text-foreground">
              Your first job is {fmt(firstAction.date)}
            </strong>{" "}
            — {firstAction.row.label.toLowerCase()} for{" "}
            {firstAction.herb.name.split(" (")[0].toLowerCase()}. Miss that one
            and it is the species most likely to disappoint you.
          </p>
        </div>
      ) : null}

      {frost ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:min-w-[34rem]">
            <caption className="sr-only">
              Seed starting schedule for the ten species, calculated from a last
              frost date of {fmt(frost)}
            </caption>
            <thead>
              <tr className="border-b border-line-strong text-left">
                <th scope="col" className="py-2.5 pr-4 font-semibold">
                  Species
                </th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">
                  What to do
                </th>
                <th
                  scope="col"
                  className="hidden py-2.5 font-semibold sm:table-cell"
                >
                  When
                </th>
              </tr>
            </thead>
            <tbody>
              {herbs.map((h) => {
                const rows = schedule(h, frost);
                return rows.map((row, i) => (
                  <tr
                    key={`${h.slug}-${row.label}`}
                    className={
                      i === rows.length - 1
                        ? "border-b border-line"
                        : "border-b border-line/40"
                    }
                  >
                    {i === 0 ? (
                      <th
                        scope="row"
                        rowSpan={rows.length}
                        className="w-[7.5rem] py-3 pr-4 align-top text-left font-semibold sm:w-auto sm:max-w-[9rem]"
                      >
                        <Link
                          href={`/guides/${h.slug}`}
                          className="text-accent underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                        >
                          {h.name.split(" (")[0]}
                        </Link>
                        <span className="mt-1 block text-xs font-normal leading-relaxed text-subtle">
                          {h.timing.note}
                        </span>
                      </th>
                    ) : null}
                    <td className="py-3 pr-4 align-top text-muted">
                      {/* On phones the date leads, because it is the answer.
                          From sm it moves to its own column instead. */}
                      <span className="mb-0.5 block font-semibold text-foreground sm:hidden">
                        {fmt(row.date)}
                      </span>
                      {row.label}
                      <span className="block text-xs text-subtle">{row.hint}</span>
                    </td>
                    <td className="hidden whitespace-nowrap py-3 align-top font-semibold text-foreground sm:table-cell">
                      {fmt(row.date)}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-sm text-subtle">
          Enter a valid date to see the schedule.
        </p>
      )}

      <p className="mt-5 text-xs leading-relaxed text-subtle">
        These are general horticultural ranges for each species, not results from
        our own garden. Local conditions vary, and an average frost date is an
        average — a late cold snap beats any calendar.
      </p>
    </div>
  );
}
