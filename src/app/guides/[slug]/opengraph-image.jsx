import { ImageResponse } from "next/og";
import { HERBS, PUBLISHED_HERB_GUIDES, getHerb } from "@/lib/herbs";
import { getHerbGuide } from "@/lib/herbGuides";
import { SITE } from "@/lib/site";

// Generated per species at build time. The previous approach pointed metadata
// at /img/og/<slug>.jpg, which existed for two of the ten guides and 404'd for
// the rest — every social share of the other eight rendered without a card.
// Generating from the same data the page renders from means it cannot drift
// again when a guide is added.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Growing guide";

export function generateStaticParams() {
  return PUBLISHED_HERB_GUIDES.map((slug) => ({ slug }));
}

const DIFFICULTY_COLOR = {
  Easy: "#1f4a34",
  Moderate: "#c08a2e",
  Hard: "#8c2f2f",
};

export default async function Image({ params }) {
  const { slug } = await params;
  const herb = getHerb(slug);
  const guide = getHerbGuide(slug);
  const plant = herb.name.split(" (")[0];
  const badge = DIFFICULTY_COLOR[herb.difficulty] ?? "#1f4a34";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbf8f1",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* The green rule reads as the brand at thumbnail size, where the
            wordmark alone is too small to register. */}
        <div style={{ display: "flex", height: 10, backgroundColor: "#1f4a34" }} />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                backgroundColor: badge,
                color: "#fbf8f1",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                padding: "8px 18px",
                borderRadius: 6,
                textTransform: "uppercase",
              }}
            >
              {herb.difficulty}
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#5c564c", letterSpacing: 1 }}>
              {herb.lifecycle.toUpperCase()}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#1a1815",
              lineHeight: 1.08,
              marginTop: 28,
            }}
          >
            How to Grow {plant} From Seed
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#5c564c",
              fontStyle: "italic",
              marginTop: 20,
            }}
          >
            {herb.latin} · germinates in {herb.germDays}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e5ded0",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#1f4a34" }}>
            {SITE.name}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#5c564c" }}>
            {guide ? "Growing guide" : "Guide"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
