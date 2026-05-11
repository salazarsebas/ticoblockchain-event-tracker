// Sponsors directory for TicoBlockchain 2026. Tier order drives the
// sponsors page render order (highest → lowest). Logo URLs are sourced
// from the official ticoblockchain.cr Webflow CDN.

export type SponsorTier =
  | "diamante"
  | "oro"
  | "plata"
  | "startup"
  | "comunidad"
  | "aliados"
  | "media"
  | "coctel";

export type Sponsor = {
  id: string;
  name: string;
  tier: SponsorTier;
  // Image-based logo URL. Optional when `wordmark` is provided instead.
  logoUrl?: string;
  // Text-based "logo" rendered in the design system's display font. Used
  // when a sponsor doesn't have a graphic mark — e.g. the developer
  // credit. If both are set, wordmark wins.
  wordmark?: string;
  // Session IDs this sponsor participates in. Powers the
  // "Qué hace en TBC2026" line under each logo on the sponsors page.
  sessionIds?: readonly string[];
  // Optional one-line description shown when the sponsor has no explicit
  // session (community/institutional partners). Kept short — under 90 chars.
  contribution?: string;
  // Optional inline-link target appended to the contribution text. When
  // both fields are set, the rendered output is `{contribution}<a>{linkText}</a>`
  // so only the handle/URL portion is clickable — not the whole paragraph.
  contributionLinkText?: string;
  contributionUrl?: string;
};

export const TIER_ORDER: readonly SponsorTier[] = [
  "diamante",
  "oro",
  "plata",
  "startup",
  "comunidad",
  "aliados",
  "media",
  "coctel",
] as const;

// Editorial copy for each tier:
// - `caption`  → the partner-class line beneath the label
// - `intro`    → the editorial sentence shown beside the label, framing the
//                tier's role at the event in plain Spanish
export const TIER_LABELS: Record<
  SponsorTier,
  { index: string; label: string; caption: string; intro: string }
> = {
  diamante: {
    index: "01",
    label: "Diamante",
    caption: "Main Partners",
    intro:
      "Patrocinador principal global. Abre la jornada con un keynote en ambos escenarios.",
  },
  oro: {
    index: "02",
    label: "Oro",
    caption: "Strategic Partners",
    intro:
      "Socios estratégicos del programa. Cada uno con un slot dedicado en el escenario principal o en paralelo.",
  },
  plata: {
    index: "03",
    label: "Plata",
    caption: "Premium Partners",
    intro:
      "Patrocinadores premium con activaciones y talleres durante la tarde.",
  },
  startup: {
    index: "04",
    label: "Startup",
    caption: "Innovation Partners",
    intro:
      "Empresas emergentes del ecosistema. Activan experiencias y patrocinan momentos clave del día.",
  },
  comunidad: {
    index: "05",
    label: "Comunidad",
    caption: "Community Partners",
    intro:
      "Comunidades locales que sostienen el ecosistema cripto en Costa Rica durante todo el año.",
  },
  aliados: {
    index: "06",
    label: "Aliados",
    caption: "Institutional Partners",
    intro:
      "Aliados institucionales y de medios que amplifican el evento más allá de San José.",
  },
  media: {
    index: "07",
    label: "Media Partner",
    caption: "Media Partners",
    intro:
      "Medios oficiales del evento — cubren la jornada y extienden el alcance editorial más allá de la sala.",
  },
  coctel: {
    index: "08",
    label: "Patrocinador del Coctel Oficial",
    caption: "Official Cocktail Sponsor",
    intro:
      "Patrocinador del brindis y el coctel de cierre — sostiene el momento de networking final del día.",
  },
};

const CDN = "https://cdn.prod.website-files.com/6744c862a5d9324c919d6b4d";

export const SPONSORS: readonly Sponsor[] = [
  // Diamante
  {
    id: "visa",
    name: "Visa",
    tier: "diamante",
    logoUrl: `${CDN}/67472b3f2c4db80f6212e02a_visa.svg`,
    sessionIds: ["keynote-1-visa"],
  },

  // Oro
  {
    id: "wink",
    name: "Wink (con respaldo de Coopenae)",
    tier: "oro",
    logoUrl: `${CDN}/6761ae70ab15b4ac09e07fdd_Wink%20con%20respaldo%20de%20Coopenae%20logo%202023%20color.png`,
    sessionIds: ["wink-main"],
  },
  {
    id: "nimiq",
    name: "Nimiq",
    tier: "oro",
    logoUrl: `${CDN}/69ac3b667ecc54f87f16d28e_nimiq_logo_cmyk_horizontal.jpg`,
    sessionIds: ["nimiq-esc2"],
  },
  {
    id: "artemis",
    name: "Artemis",
    tier: "oro",
    logoUrl: `${CDN}/69fcc721768a24ed6429047b_Screenshot%20(6).png`,
    contribution: "Socio estratégico del programa principal.",
  },
  {
    id: "olanzo",
    name: "Olanzo",
    tier: "oro",
    logoUrl: `${CDN}/69dfecbe6a5a2eea4bde1631_OLANZO%20FULL%20COLOR.png`,
    sessionIds: ["olanzo-esc2"],
  },

  // Plata
  {
    id: "lulubit",
    name: "Lulubit (EBI)",
    tier: "plata",
    logoUrl: `${CDN}/69655c7e03af5324e759fc41_EBI_Lulubit_B1.png`,
    sessionIds: ["lulubit-esc2"],
  },
  {
    id: "iitos",
    name: "iiTOS",
    tier: "plata",
    logoUrl: `${CDN}/67471865139af06249c86686_iiTOS_Icons%2002A-29.png`,
    contribution: "Patrocinador premium del programa principal.",
  },
  {
    id: "bn-fondos",
    name: "BN Fondos",
    tier: "plata",
    logoUrl: `${CDN}/69f9ddde43c181e1d8e1880c_Screenshot%20(1).png`,
    contribution: "Patrocinador premium — gestor de fondos del Banco Nacional.",
  },
  {
    id: "teledolar",
    name: "TeleDólar (Movantis)",
    tier: "plata",
    logoUrl: `${CDN}/69ebad423a69b265bcba08c7_TELEDOLAR-MOVANTIS-WHITE.png`,
    contribution: "Patrocinador premium — remesas y pagos transfronterizos.",
  },

  // Startup
  {
    id: "world",
    name: "World",
    tier: "startup",
    logoUrl: `${CDN}/69ac3d4e630297bd10d2c85e_%5BWorld%5D%20Logo-black%202.png`,
    contribution: "Activación en zona de networking durante todo el día.",
  },
  {
    id: "onvo",
    name: "ONVO",
    tier: "startup",
    logoUrl: `${CDN}/69ac3cef1f9143b6cf3cc109_LOGO%20ONVO.png`,
    contribution: "Activación en zona de networking durante todo el día.",
  },
  {
    id: "cofiblocks",
    name: "Cofiblocks",
    tier: "startup",
    logoUrl: `${CDN}/69ac3db62afbcb6cf7c82a39_Cofiblocks_Logo_s_borda.png`,
    sessionIds: ["coffee-break-am", "coffee-break"],
    contribution: "Patrocinador oficial de los coffee breaks.",
  },
  {
    id: "tilopay",
    name: "Tilopay",
    tier: "startup",
    logoUrl: `${CDN}/69dfd33660170d2638151b73_Logo%20con%20slogan.png`,
    contribution: "Activación en zona de networking — pasarela de pagos costarricense.",
  },

  // Comunidad
  {
    id: "ethereum-cr",
    name: "Ethereum Costa Rica",
    tier: "comunidad",
    logoUrl: `${CDN}/67c8a3c0986bc3212e55d24b_Vector.png`,
    contribution:
      "Comunidad local que organiza meetups y workshops de Ethereum en Costa Rica.",
  },
  {
    id: "refi-cr",
    name: "ReFi Costa Rica",
    tier: "comunidad",
    logoUrl: `${CDN}/67c8a3d76914a3755a1b51db_reficr-transparente-fondo-claro.png`,
    contribution:
      "Movimiento local de finanzas regenerativas y soluciones climáticas on-chain.",
  },
  {
    id: "zeek",
    name: "Zeek",
    tier: "comunidad",
    logoUrl: `${CDN}/69dfd303e17844c21dee2840_LOGO.jpg`,
    contribution: "Comunidad cripto local — meetups y formación.",
  },
  {
    id: "tech-rebel",
    name: "Tech Rebel",
    tier: "comunidad",
    logoUrl: `${CDN}/69dfd2e9a5828c1176ba55c2_Black%20Oranye%20Archetype%20Inspired%20Logo.png`,
    contribution: "Comunidad creativa-tech local.",
  },

  // Aliados
  {
    id: "websites-by-ger",
    name: "Websites by Ger",
    tier: "aliados",
    wordmark: "WEBSITES\nBY GER",
    contribution:
      "Desarrollador del event tracker — sitios web para profesionales y emprendedores en Costa Rica · ",
    contributionLinkText: "@websites_by_ger",
    contributionUrl:
      "https://www.instagram.com/websites_by_ger?igsh=azk3cGVhN2pnOWpz&utm_source=qr",
  },
  {
    id: "nordcomms",
    name: "NordComms",
    tier: "aliados",
    logoUrl: `${CDN}/69dfd296e62e5081faefe80e_NordComms%20Logo.B%20(2)%20(1).png`,
    contribution: "Aliado institucional — comunicación estratégica del evento.",
  },
  {
    id: "hallos",
    name: "Hallos",
    tier: "aliados",
    logoUrl: `${CDN}/67a75b3f8007474127fe7156_Hallos.svg`,
    contribution: "Aliado institucional — plataforma oficial de boletería.",
  },
  {
    id: "blockchain-rio",
    name: "Blockchain.Rio",
    tier: "aliados",
    logoUrl: `${CDN}/67ba0d8830c7697ecf8526f2_BRio24_Logo_Ver_Black.png`,
    contribution: "Aliado regional — evento hermano en Río de Janeiro.",
  },
  {
    id: "citi",
    name: "Citi",
    tier: "aliados",
    logoUrl: `${CDN}/69fcc748da172340b5de3dab_Screenshot%20(2).png`,
    contribution: "Aliado institucional del evento.",
  },
  {
    id: "crtw",
    name: "Costa Rica Tech Week",
    tier: "aliados",
    logoUrl: `${CDN}/69c68191cd67a95979b925c5_WhatsApp%20Image%202026-03-26%20at%2020.34.5112%201.png`,
    sessionIds: ["ecosistemas-crtw-main"],
    contribution: "Aliado regional — semana tech de Costa Rica.",
  },
  {
    id: "esencial-cr",
    name: "Esencial Costa Rica",
    tier: "aliados",
    logoUrl: "/images/esencial-costa-rica.webp",
    contribution: "Reconocimiento oficial Esencial Costa Rica — Marca País del evento.",
  },

  // Media Partner
  {
    id: "la-republica",
    name: "La República",
    tier: "media",
    logoUrl: `${CDN}/6760cf6f8de37a0ebe1e16cd_la%20republica.png`,
    contribution: "Media partner oficial — cobertura editorial del evento.",
  },
  {
    id: "coin-edition",
    name: "Coin Edition",
    tier: "media",
    logoUrl: `${CDN}/69ebbbb6e19999ea2db077c5_WhatsApp%20Image%202026-04-24%20at%2015.39.10.jpeg`,
    contribution: "Media partner internacional — cobertura cripto y Web3.",
  },

  // Patrocinador del Coctel Oficial
  {
    id: "tether",
    name: "Tether",
    tier: "coctel",
    logoUrl: `${CDN}/69fcc7b6d9478ce05a46c5b5_Tether%20Finance%20logo%20black.png`,
    sessionIds: ["tether-brindis", "coctel"],
  },
] as const;

export function getSponsorsByTier(tier: SponsorTier): Sponsor[] {
  return SPONSORS.filter((s) => s.tier === tier);
}
