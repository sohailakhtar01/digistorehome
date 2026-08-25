import { SITE } from "@/lib/site";
import { ARTICLES, abs, latestModified } from "@/lib/content";

/**
 * RSS 2.0 feed. Worth having on a review site: it gives readers and aggregators
 * a subscribe route, and it is one more discovery signal for crawlers.
 */
export const dynamic = "force-static";

const esc = (s = "") =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const rfc822 = (d) => new Date(`${d}T00:00:00Z`).toUTCString();

export function GET() {
  const items = [...ARTICLES]
    .sort((a, b) => (a.published < b.published ? 1 : -1))
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${abs(a.path)}</link>
      <guid isPermaLink="true">${abs(a.path)}</guid>
      <pubDate>${rfc822(a.published)}</pubDate>
      <category>${esc(a.kind === "review" ? "Reviews" : "Growing guides")}</category>
      <description>${esc(a.summary)}</description>
${a.image ? `      <enclosure url="${SITE.url}${a.image}" type="image/webp" length="0" />\n` : ""}    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(latestModified())}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    <copyright>© ${SITE.founded} ${esc(SITE.name)}</copyright>
    <managingEditor>${SITE.email} (${esc(SITE.name)})</managingEditor>
    <image>
      <url>${SITE.url}/icon-512.png</url>
      <title>${esc(SITE.name)}</title>
      <link>${SITE.url}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
