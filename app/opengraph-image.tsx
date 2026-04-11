import { ImageResponse } from "next/og";

// Dynamic Open Graph / social card. Rendered at build time to a PNG
// and served at /opengraph-image.png. Twitter falls back to this too
// when no dedicated twitter-image is present, so one file covers
// both surfaces.

export const alt =
  "TicoBlockchain 2026 — Evento blockchain en vivo desde Costa Rica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tokens pulled from the Horizonte Cobalt design system. Hex values
// instead of CSS vars because ImageResponse does not have access to
// the browser CSS context.
const PRIMARY = "#000d33"; // cobalt
const SECONDARY = "#ba002e"; // crimson
const SURFACE = "#fbf9f5"; // warm paper

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PRIMARY,
          color: SURFACE,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar — live indicator + venue */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 16,
              height: 16,
              background: SECONDARY,
            }}
          />
          <span style={{ opacity: 0.8 }}>
            EN VIVO · HOTEL BARCELÓ SAN JOSÉ
          </span>
        </div>

        {/* Massive editorial wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 44,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: 8,
            }}
          >
            24 MAYO 2026
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 240,
              fontWeight: 900,
              lineHeight: 0.82,
              letterSpacing: -10,
              textTransform: "uppercase",
            }}
          >
            TICO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 160,
              fontWeight: 900,
              lineHeight: 0.82,
              letterSpacing: -6,
              textTransform: "uppercase",
              color: SECONDARY,
            }}
          >
            BLOCKCHAIN
          </div>
        </div>

        {/* Bottom strip — two stages + crimson accent bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              height: 6,
              width: "100%",
              background: SECONDARY,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            <span>MAIN STAGE · ESCENARIO 2</span>
            <span>TICOBLOCKCHAIN.CR</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
