import { SITE } from "@/lib/site";
import { ARTICLES, STATIC_PAGES, abs } from "@/lib/content";

// Only complete, published pages belong in the sitemap. Everything is driven
// from src/lib/content.js so this cannot drift out of step with the site.
export default function sitemap() {
  const siteBuilt = new Date("2026-08-25T00:00:00Z");

  const staticEntries = STATIC_PAGES.map((p) => ({
    url: abs(p.path),
    lastModified: siteBuilt,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const articleEntries = ARTICLES.map((a) => ({
    url: abs(a.path),
    lastModified: new Date(`${a.modified}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: a.priority,
    // Image sitemap entries help these photographs surface in image search.
    images: a.image ? [`${SITE.url}${a.image}`] : undefined,
  }));

  return [...staticEntries, ...articleEntries];
}
