// Hex literals mirrored from the Horizonte Cobalt design tokens defined in
// app/globals.css `:root`. Needed by surfaces that run outside the browser
// CSS context — Next.js OG images (Edge runtime, ImageResponse) and the
// PWA manifest's `themeColor` viewport entry. If a token shifts in
// globals.css, update the matching key here.

export const BRAND = {
  primary: "#000d33", // cobalt — mirrors --color-primary
  secondary: "#ba002e", // crimson — mirrors --color-secondary
  surface: "#fbf9f5", // warm paper — mirrors --color-surface
} as const;
