/**
 * Minimal iCalendar (RFC 5545) writer for the sowing calendar.
 *
 * Why a calendar file rather than a mailing list: the gap between reading a
 * sowing guide and buying seed is months — search demand for coneflower seed
 * runs about 9,900 in December against 49,500 in April. A list bridges that
 * gap only if the reader hands over an address, opens the email and remembers
 * who we are. A calendar entry bridges it by appearing, unprompted, in the
 * place they already check, on the exact morning the job is due.
 *
 * It also costs nothing to run, needs no provider, collects no personal data
 * and cannot be blocked by a spam filter.
 *
 * Everything here is deliberately hand-rolled rather than pulled from a
 * dependency: the subset of RFC 5545 needed for all-day events is small, and
 * a package would be more bytes than the feature.
 */

const CRLF = "\r\n";

/** RFC 5545 §3.3.11 — backslash, semicolon, comma and newline are special. */
function escapeText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * RFC 5545 §3.1 — content lines are folded at 75 octets, continuations
 * beginning with a single space. Google Calendar tolerates long lines; Apple
 * Calendar has historically not, and a file that silently fails to import in
 * half of all calendar apps is worse than no button.
 */
function fold(line) {
  if (line.length <= 75) return line;
  const parts = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 74) {
    parts.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest) parts.push(" " + rest);
  return parts.join(CRLF);
}

/** Local calendar date as YYYYMMDD — no timezone, because these are all-day. */
function dateStamp(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

function utcStamp(d) {
  const p = (n) => String(n).padStart(2, "0");
  return (
    `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}` +
    `T${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`
  );
}

const addDays = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, 12);

/**
 * @param {Array<{date: Date, summary: string, description?: string, url?: string}>} events
 * @param {{name?: string, domain?: string}} options
 * @returns {string} a complete .ics document
 */
export function buildIcs(events, { name = "Sowing calendar", domain = "thehomesteadshelf.com" } = {}) {
  const stamp = utcStamp(new Date());

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//The Homestead Shelf//Sowing Calendar//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(name)}`,
  ];

  events.forEach((event, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${dateStamp(event.date)}-${i}-sowing@${domain}`,
      `DTSTAMP:${stamp}`,
      // All-day events are half-open: DTEND is the following day.
      `DTSTART;VALUE=DATE:${dateStamp(event.date)}`,
      `DTEND;VALUE=DATE:${dateStamp(addDays(event.date, 1))}`,
      `SUMMARY:${escapeText(event.summary)}`,
    );
    if (event.description) {
      lines.push(`DESCRIPTION:${escapeText(event.description)}`);
    }
    if (event.url) lines.push(`URL:${escapeText(event.url)}`);
    lines.push(
      "TRANSP:TRANSPARENT",
      // Nine hours after midnight, so the reminder lands on the morning of the
      // job rather than in the middle of the night before it.
      "BEGIN:VALARM",
      "TRIGGER:PT9H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(event.summary)}`,
      "END:VALARM",
      "END:VEVENT",
    );
  });

  lines.push("END:VCALENDAR");
  return lines.map(fold).join(CRLF) + CRLF;
}
