import { ImageResponse } from "next/og";
import { PUBLISHED_HERB_GUIDES, getHerb } from "@/lib/herbs";
import { OgCard, OG_ACCENT, OG_SIZE } from "@/lib/ogCard";

// Generated per species at build time. The previous approach pointed metadata
// at /img/og/<slug>.jpg, which existed for two of the ten guides and 404'd for
// the rest — every social share of the other eight rendered without a card.
// Generating from the same herb data the page renders from means it cannot
// drift again when a guide is added.

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Growing guide";

export function generateStaticParams() {
  return PUBLISHED_HERB_GUIDES.map((slug) => ({ slug }));
}

const DIFFICULTY_COLOR = {
  Easy: OG_ACCENT.green,
  Moderate: OG_ACCENT.gold,
  Hard: OG_ACCENT.crimson,
};

export default async function Image({ params }) {
  const { slug } = await params;
  const herb = getHerb(slug);
  const plant = herb.name.split(" (")[0];

  return new ImageResponse(
    (
      <OgCard
        badge={herb.difficulty}
        badgeColor={DIFFICULTY_COLOR[herb.difficulty] ?? OG_ACCENT.green}
        kicker={herb.lifecycle}
        title={`How to Grow ${plant} From Seed`}
        subtitle={`${herb.latin} · germinates in ${herb.germDays}`}
        footer="Growing guide"
      />
    ),
    size,
  );
}
