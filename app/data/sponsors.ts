// Sponsors directory for TicoBlockchain 2026. Tier order drives the
// sponsors page render order (highest → lowest).

export type SponsorTier = "diamante" | "platino" | "oro" | "plata";

export type Sponsor = {
  id: string;
  name: string;
  tier: SponsorTier;
  logoUrl: string;
};

export const TIER_ORDER: readonly SponsorTier[] = [
  "diamante",
  "platino",
  "oro",
  "plata",
] as const;

export const TIER_LABELS: Record<
  SponsorTier,
  { index: string; label: string }
> = {
  diamante: { index: "01", label: "Diamante" },
  platino: { index: "02", label: "Platino" },
  oro: { index: "03", label: "Oro" },
  plata: { index: "04", label: "Plata" },
};

// Logo URLs are placeholders — real assets pending from the sponsorship team.
// Names taken from the 24 MAYO 2026 agenda reference.
const PLACEHOLDER_LOGO_DARK =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDkJZ9VaDx_KIhnMN_Le5xXFoZ_UAJhuBD0YeC0acR4QzpbO6Pfj2R3zq68I_rqv8D2fFC6e99bJw3hx0WGoY_BssqEyZI-R2FMRTkmJNlbbjgX9mEX9yyF2w_CehoFdDzAXEpZGOSXRNijvw8EtC26FwqhF5h_im7dsX75rPaA0F0K9_lPfFWT9DxqQ1F8KywylYZ3pnfUg-gblob1EPetsl2ZRXOaC-WgkHbhC9L5j-chOWv4KVuwhx_qpUkJ9-eiwbuJPArrsM4";
const PLACEHOLDER_LOGO_LIGHT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC3ABrE9VRAZkqWSHsHJUJR1YYJn3eb5T6K9dHI4MvGzRJKdR9NNiAzzUedYZs2-Ckzy2_0xE4LNGn5K7p9oikJTufuiIRHFpoQClCrxNI-Zg3bVDhJJRchoFBVf-1YwHG9X0W1zhKDNvMgmuYODD6xvAn5PS1VqacihlzjcZD_BeHvwcgocOkMW-hrRvtdHt-3ufjfIVhPpYG2eaCuDovzdHhWNONXY57HOcKmnoJjDb2ekVfyN-tLIIbq1p0RINkv4oT0XkjpVi4";

export const SPONSORS: readonly Sponsor[] = [
  // Diamante
  {
    id: "visa",
    name: "Visa",
    tier: "diamante",
    logoUrl: PLACEHOLDER_LOGO_DARK,
  },

  // Platino
  {
    id: "wink",
    name: "Wink",
    tier: "platino",
    logoUrl: PLACEHOLDER_LOGO_DARK,
  },
  {
    id: "nimiq",
    name: "Nimiq",
    tier: "platino",
    logoUrl: PLACEHOLDER_LOGO_DARK,
  },
  {
    id: "olanzo",
    name: "Olanzo",
    tier: "platino",
    logoUrl: PLACEHOLDER_LOGO_DARK,
  },
  {
    id: "bn-fondos",
    name: "BN Fondos",
    tier: "platino",
    logoUrl: PLACEHOLDER_LOGO_DARK,
  },

  // Oro
  {
    id: "itec",
    name: "Itec",
    tier: "oro",
    logoUrl: PLACEHOLDER_LOGO_LIGHT,
  },
  {
    id: "lulubit",
    name: "Lulubit",
    tier: "oro",
    logoUrl: PLACEHOLDER_LOGO_LIGHT,
  },
  {
    id: "teladoke",
    name: "Teladoke",
    tier: "oro",
    logoUrl: PLACEHOLDER_LOGO_LIGHT,
  },

  // Plata
  {
    id: "onvo",
    name: "Onvo",
    tier: "plata",
    logoUrl: PLACEHOLDER_LOGO_LIGHT,
  },
  {
    id: "tilo",
    name: "Tilo",
    tier: "plata",
    logoUrl: PLACEHOLDER_LOGO_LIGHT,
  },
  {
    id: "blockchain-guard-labs",
    name: "Blockchain Guard Labs",
    tier: "plata",
    logoUrl: PLACEHOLDER_LOGO_LIGHT,
  },
] as const;

export function getSponsorsByTier(tier: SponsorTier): Sponsor[] {
  return SPONSORS.filter((s) => s.tier === tier);
}
