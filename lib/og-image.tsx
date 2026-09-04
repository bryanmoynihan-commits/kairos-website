import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

// Shared social-share image used by app/opengraph-image.tsx and
// app/twitter-image.tsx. Renders the brand logo large on a dark canvas so
// link previews (iMessage, Slack, LinkedIn, X, Facebook) show the logo
// prominently rather than lost in dead space.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Kairos Performance — AI-Native Revenue Operating Systems";

// Brand tokens (mirrors app/layout.tsx + logo-horizontal.svg)
const BG = "#0e0d0d";
const MUTED = "#c0bdb8";

// logo-horizontal.svg viewBox is 1025.3 × 264 → aspect ratio ≈ 3.884.
// Render it at ~65% of the 1200px frame width so it dominates the preview.
const LOGO_W = 780;
const LOGO_H = Math.round((LOGO_W * 264) / 1025.3); // ≈ 201

function logoDataUri(): string {
  const svg = fs.readFileSync(
    path.join(process.cwd(), "public", "logo-horizontal.svg"),
  );
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

export function renderOgImage() {
  const logoSrc = logoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BG,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={LOGO_W} height={LOGO_H} alt="" />
        <div
          style={{
            marginTop: 48,
            fontSize: 30,
            letterSpacing: 8,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          AI-Native Revenue Operating Systems
        </div>
      </div>
    ),
    { ...size },
  );
}
