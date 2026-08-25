// Published reviews. Add an entry only when the page actually exists and is
// complete — this list feeds the homepage, the reviews index and the sitemap.

export const REVIEWS = [
  {
    slug: "medicinal-garden-kit",
    title: "Medicinal Garden Kit Review (2026)",
    category: "Garden seeds",
    standfirst:
      "Ten heirloom herb seed packets and a printed guide for $59. Three of the ten are genuinely difficult from seed, and that is the thing to know before you order.",
    rating: 4,
    priceLabel: "$59",
    updated: "2026-08-25",
    updatedLabel: "August 2026",
  },
];

export const getReview = (slug) => REVIEWS.find((r) => r.slug === slug);
