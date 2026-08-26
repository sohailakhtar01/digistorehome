import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/ogCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "How to harvest coneflower seeds";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        badge="Technique"
        kicker="Echinacea purpurea"
        title="How to Harvest Coneflower Seeds"
        subtitle="When the cone is ready, and how to tell seed from chaff"
        footer="Seed saving"
      />
    ),
    size,
  );
}
