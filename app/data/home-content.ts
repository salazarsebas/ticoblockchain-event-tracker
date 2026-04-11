import type { BentoHighlight } from "./types";

// Home page hero — the current live talk gets the most editorial weight.
// Driven by the live session in app/data/sessions.ts.
export const HERO_CONTENT = {
  liveLabel: "EN VIVO · SALA GRECO",
  heroImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDIy5fc4IZu6iNfnSyydLGICw_03Yg3dzAeY5crteyQMDNdOudnJKA_QGJHEOOZhdSJJrNAomLxeFVD-RU4h8xVJ8qT9QhsVg9ih5Mgah_1UxDpBpN7eKIZGkiHoc2yVhAz7DDdu1QWQssJsdO3VoLI4DvvEn9iX2gZK-_5feGPyx9uE1YK633syMYSZ8swh48QRH6n33TSYF-Vn1V4Km8ha9fDPG8h0qXb0sFnTAhmvSAKNptAHcFiDhxzu1EbJ55p0dFcrTBzZUE",
  heroImageAlt:
    "Abstract representation of blockchain data nodes and neural networks in deep blue tones",
  sidebarImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGxXzNTUdPs-ZI74JVJCzaUkge2Y5ry5VeEZTilPT79U8GQv9C6Zn7Wbg8Mdl5hhkiC-NaYMSEk7IdYrln6YbNFPfDe0c75bWO9J0IoUK4UdHvrLONsRnfqyChuelyEChpyQeWY6I9BnG4yW2s7mGK-iLiXRjPE8T7VwoDQLnvWBn8Y366j7sYlj1x051n8C6B-yF04lAl3vt050j9Z4nfR0BXhwcCzvG2G2UZwb__k5jbD3N9S-4mrdoS9M6FmZygMswSQZ-z2BQ",
  sidebarImageAlt:
    "Conference networking area with modern furniture and high-tech displays",
  capacityLabel: "ESTADO ACTUAL DEL EVENTO: 85% CAPACIDAD",
} as const;

// Bento grid editorial highlights below the agenda preview.
export const BENTO_HIGHLIGHTS: readonly BentoHighlight[] = [
  {
    id: "recap-solana",
    kind: "recap",
    label: "RECAPITULACIÓN",
    title: "EL IMPACTO DE SOLANA EN LA REGIÓN",
    body: "Lee la transcripción completa de la charla inaugural de esta mañana.",
  },
  {
    id: "gallery",
    kind: "gallery",
    label: "GALERÍA LIVE",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrNF9u6khWOJZWMF-SNv8cbHmNm74mPu0TFfiuFrXhotadgRTXBnrV0wB8k1aFIHOkHEFLola__AKmU1hpM0EPJfrxyNHqcoTT_lCiPks_dISc-WYrUZWyCZPLrp35a_H54Vn1xuMNwBOc5DDH_qJNgxjxnOMp-NJhI8KSqbaJmM4razvayloPGMCS3Ndo6EiWu6kZdTXo4Q8YeMmO02Eh5BmQaTrQCOZHD3cSDCxqzZLxt4pBQlHDJwCBuQzVP7AhHDXuX3JOg-Q",
    imageAlt:
      "High-energy conference hall with massive screens and professional lighting",
  },
  {
    id: "stats",
    kind: "stats",
    label: "ASISTENTES VIRTUALES",
    statValue: "+1.2K",
    statLabel: "ASISTENTES VIRTUALES",
  },
  {
    id: "location",
    kind: "location",
    label: "UBICACIÓN",
    title: "HOTEL BARCELÓ SAN JOSÉ",
  },
] as const;
