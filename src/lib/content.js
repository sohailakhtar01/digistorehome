// Single source of truth for every published URL.
//
// sitemap.xml, llms.txt, llms-full.txt and feed.xml all read from here, so a
// new page only has to be registered once and the discovery files cannot drift
// out of sync with the site.

import { SITE } from "./site";
import { REVIEWS } from "./reviews";
import { PUBLISHED_HERB_GUIDES, getHerb } from "./herbs";
import { getHerbGuide } from "./herbGuides";
import { HERB_IMAGES, PRODUCT_IMAGES, SEED_IMAGES } from "./media";

const iso = (d) => new Date(`${d}T00:00:00Z`).toISOString();

// Editorial pages, newest first. `summary` feeds llms.txt and the RSS feed.
export const ARTICLES = [
  {
    path: "/reviews/medicinal-garden-kit",
    title: "Medicinal Garden Kit Review (2026): What You Actually Get for $59",
    kind: "review",
    published: "2026-08-25",
    modified: "2026-08-25",
    summary:
      "An independent review of Nicole Apelian's Medicinal Garden Kit. What arrives in the box, which three of the ten seeds are genuinely difficult, how the 365-day guarantee works through Digistore24, and who should buy the seeds separately instead.",
    topics: [
      "Medicinal Garden Kit",
      "Nicole Apelian",
      "heirloom herb seeds",
      "affiliate review",
    ],
    image: PRODUCT_IMAGES.hero.src,
    priority: 0.9,
  },
  {
    path: "/guides/medicinal-herbs-to-grow",
    title: "10 Medicinal Herbs to Grow at Home, Ranked by Difficulty",
    kind: "guide",
    published: "2026-08-25",
    modified: "2026-08-25",
    summary:
      "An honest difficulty ranking of ten classic medicinal herbs grown from seed: five that are genuinely easy, two with one specific catch each, and three that need cold stratification before they will cooperate.",
    topics: ["medicinal herbs", "growing from seed", "difficulty ranking"],
    image: HERB_IMAGES.echinacea.src,
    priority: 0.8,
  },
  {
    path: "/guides/harvesting-coneflower-seeds",
    title:
      "How to Harvest Coneflower Seeds (Echinacea): When, How, and What the Seed Looks Like",
    kind: "guide",
    published: "2026-08-26",
    modified: "2026-08-26",
    summary:
      "How to tell when an echinacea seed head is ready, how to get the seed out without shredding your hands, how to separate seed from chaff, and what viable coneflower seed actually looks like.",
    topics: [
      "harvesting coneflower seeds",
      "echinacea seed",
      "seed saving",
      "Echinacea purpurea",
    ],
    image: SEED_IMAGES.echinaceaSeed.src,
    priority: 0.8,
  },
  {
    path: "/guides/cold-stratification",
    title:
      "Cold Stratification: The Four-Week Step That Fixes Stubborn Seed",
    kind: "guide",
    published: "2026-08-25",
    modified: "2026-08-25",
    summary:
      "How to cold stratify seeds in a refrigerator, step by step. Which species actually need it, how long each one takes, what to do when mould appears, and why autumn sowing is often the easier route.",
    topics: ["cold stratification", "seed dormancy", "germination"],
    image: HERB_IMAGES.echinacea.src,
    priority: 0.8,
  },
  ...PUBLISHED_HERB_GUIDES.map((slug) => {
    const g = getHerbGuide(slug);
    const h = getHerb(slug);
    return {
      path: `/guides/${slug}`,
      title: g.title,
      kind: "guide",
      published: "2026-08-25",
      modified: "2026-08-25",
      summary: g.description,
      topics: [h.name.split(" (")[0], h.latin, "growing from seed"],
      image: HERB_IMAGES[slug]?.src,
      priority: 0.7,
    };
  }),
];

// Non-editorial pages: indexes and policies.
export const STATIC_PAGES = [
  { path: "/", title: SITE.name, priority: 1, changeFrequency: "weekly" },
  { path: "/reviews", title: "Product Reviews", priority: 0.9, changeFrequency: "weekly" },
  { path: "/guides", title: "Growing Guides", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", title: "About & Methodology", priority: 0.5, changeFrequency: "yearly" },
  { path: "/disclosure", title: "Affiliate & Editorial Disclosure", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact", title: "Contact", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", title: "Privacy Policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", title: "Terms of Use", priority: 0.2, changeFrequency: "yearly" },
];

export const abs = (p) => `${SITE.url}${p === "/" ? "" : p}`;

export const allUrls = () => [
  ...STATIC_PAGES.map((p) => p.path),
  ...ARTICLES.map((a) => a.path),
];

export const articleIso = (a) => ({
  published: iso(a.published),
  modified: iso(a.modified),
});

export const latestModified = () =>
  ARTICLES.map((a) => a.modified).sort().reverse()[0];
