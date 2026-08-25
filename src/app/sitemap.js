import { SITE } from "@/lib/site";
import { REVIEWS } from "@/lib/reviews";
import { PUBLISHED_HERB_GUIDES } from "@/lib/herbs";

// Only complete, published pages belong in the sitemap.
export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/reviews", priority: 0.9, changeFrequency: "weekly" },
    { path: "/guides", priority: 0.9, changeFrequency: "weekly" },
    { path: "/guides/medicinal-herbs-to-grow", priority: 0.8, changeFrequency: "monthly" },
    { path: "/guides/cold-stratification", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "yearly" },
    { path: "/disclosure", priority: 0.4, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ].map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const reviewPages = REVIEWS.map((r) => ({
    url: `${SITE.url}/reviews/${r.slug}`,
    lastModified: new Date(r.updated),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const guidePages = PUBLISHED_HERB_GUIDES.map((slug) => ({
    url: `${SITE.url}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...reviewPages, ...guidePages];
}
