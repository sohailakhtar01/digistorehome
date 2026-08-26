import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/lib/ogCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "When to plant each of the 10 medicinal herbs";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        badge="Tool"
        kicker="Frost date calculator"
        title="When to Plant Each of the 10 Medicinal Herbs"
        subtitle="Stratify, sow and transplant dates from your own frost date"
        footer="Free tool"
      />
    ),
    size,
  );
}
