import { SITE } from "@/lib/site";

/**
 * Shared layout for every generated Open Graph card, so a guide added later
 * cannot end up with a differently-branded preview.
 *
 * Satori (which renders these) supports a subset of CSS: every element needs an
 * explicit `display`, and there is no italic synthesis without an italic font
 * file, so styling leans on weight, colour and scale instead.
 */
export const OG_SIZE = { width: 1200, height: 630 };

export const OG_ACCENT = {
  green: "#1f4a34",
  gold: "#c08a2e",
  crimson: "#8c2f2f",
};

export function OgCard({ badge, badgeColor = OG_ACCENT.green, kicker, title, subtitle, footer }) {
  return (
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
      {/* The green rule carries the brand at thumbnail size, where a wordmark
          is too small to register. */}
      <div style={{ display: "flex", height: 10, backgroundColor: OG_ACCENT.green }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {badge ? (
            <div
              style={{
                display: "flex",
                backgroundColor: badgeColor,
                color: "#fbf8f1",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                padding: "8px 18px",
                borderRadius: 6,
              }}
            >
              {badge.toUpperCase()}
            </div>
          ) : null}
          {kicker ? (
            <div style={{ display: "flex", fontSize: 24, color: "#5c564c", letterSpacing: 1 }}>
              {kicker.toUpperCase()}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 44 ? 66 : 78,
            fontWeight: 700,
            color: "#1a1815",
            lineHeight: 1.08,
            marginTop: 28,
          }}
        >
          {title}
        </div>

        {subtitle ? (
          <div style={{ display: "flex", fontSize: 30, color: "#5c564c", marginTop: 20 }}>
            {subtitle}
          </div>
        ) : null}
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
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: OG_ACCENT.green }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#5c564c" }}>{footer}</div>
      </div>
    </div>
  );
}
