import type { Speaker } from "./types";

// Source of truth: ticoblockchain.cr Speakers section (May 14, 2026 lineup).
// Confirmed roster — 54 speakers as published by the client. Ordered by:
//   1. Agenda time (chronological).
//   2. "Por anunciar" tail — speakers without a pinned slot. They keep their
//      seed status and never auto-flip during the event because no session row
//      matches "Por anunciar".
//
// Portrait URLs are pulled from the official site CDN
// (cdn.prod.website-files.com). Whitelisted in next.config.ts.

const CDN = "https://cdn.prod.website-files.com/6744c862a5d9324c919d6b4d";

// Generic placeholder used when the official site does not show a real
// portrait for a confirmed speaker (e.g. roberto-grella), or when the
// site's photo attribution is ambiguous.
const IMG_TBA = `${CDN}/67e29d86c819abd198b2e8cc_Screenshot%20(25).avif`;

export const SPEAKERS: readonly Speaker[] = [
  // ─── 09:15 — Keynote VISA ───
  {
    id: "rodrigo-barros-de-paula",
    name: "Rodrigo Barros de Paula",
    org: "VP of Products · VISA Centroamérica & Caribe",
    talk:
      "Tendencias de Pago y la Modernización del Ecosistema de Servicios Financieros",
    time: "09:15 — 09:55",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69f6271c4264d974a7e8f714_rodrigo.png`,
    linkedinUrl:
      "https://www.linkedin.com/in/rodrigo-barros-de-paula-b243ba4/",
  },

  // ─── 10:00 — Sponsor slots (Wink + Nimiq) ───
  {
    id: "diego-loaiza-centeno",
    name: "Diego Loaiza Centeno",
    org: "CEO @ Wink",
    talk: "Mitos y Realidades de la Inclusión Financiera",
    time: "10:00 — 10:25",
    stage: "main",
    status: "live",
    imageUrl: `${CDN}/67d6c54fe994495169f9271e_Diego%20Loaiza%20Centeno%202.avif`,
    linkedinUrl: "https://www.linkedin.com/in/diego-loaiza-a4561027/",
  },
  {
    id: "ricardo-barquero",
    name: "Ricardo Barquero",
    org: "Communications Manager @ Nimiq",
    talk: "Crea una Crypto App y gana hasta $10k con Nimiq",
    time: "10:00 — 10:25",
    stage: "escenario-2",
    status: "live",
    imageUrl: `${CDN}/69f6323e348244fb7e89fa16_Ricardo%20Barquero%20Carranza.png`,
    linkedinUrl: "https://www.linkedin.com/in/ricardo-barquero/",
  },

  // ─── 10:55 — Perspectivas de Inversión 2026 (panel main) ───
  {
    id: "karla-cordoba-brenes",
    name: "Karla Córdoba Brenes",
    org: "Presidenta @ AsoBlockchain",
    talk: "Perspectivas de Inversión 2026 (Moderadora)",
    time: "10:55 — 11:35",
    stage: "main",
    status: "next",
    imageUrl: `${CDN}/675c37edeca90d4c739eee46_KarlaC_JTS-22%20(p).avif`,
    linkedinUrl: "https://www.linkedin.com/in/muguika",
  },
  {
    id: "walter-montes",
    name: "Walter Montes",
    org: "Angel Investor · Engineering Director @ Octus",
    talk: "Perspectivas de Inversión 2026 (Panel)",
    time: "10:55 — 11:35",
    stage: "main",
    status: "next",
    imageUrl: `${CDN}/69dfe2458c10e3dbe5207908_Walter%20Montes.png`,
    linkedinUrl: "https://www.linkedin.com/in/waltermontes/",
  },
  {
    id: "carlo-blasio",
    name: "Carlo Blasio",
    org: "Venture Capital @ InstaCredit",
    talk: "Perspectivas de Inversión 2026 (Panel)",
    time: "10:55 — 11:35",
    stage: "main",
    status: "next",
    imageUrl: `${CDN}/69f62adf06eece1d1ee43884_c%20arlos.png`,
    linkedinUrl: "https://www.linkedin.com/in/cblasio/",
  },
  {
    id: "ileana-atan-chan",
    name: "Ileana Atán Chan",
    org: "General Manager @ BN Fondos",
    talk: "Perspectivas de Inversión 2026 (Panel)",
    time: "10:55 — 11:35",
    stage: "main",
    status: "next",
    imageUrl: `${CDN}/69fccea6166af72c5f9f49eb_Screenshot%20(8).png`,
    linkedinUrl:
      "https://www.linkedin.com/in/ileana-atan-chan-abb1714a/",
  },
  {
    id: "jose-miguel-alfaro",
    name: "José Miguel Alfaro",
    org: "Partner @ iitos",
    talk: "Perspectivas de Inversión 2026 (Panel)",
    time: "10:55 — 11:35",
    stage: "main",
    status: "next",
    imageUrl: `${CDN}/69f62fb27621c1fce04b1453_Jos%C3%A9%20Miguel%20Alfaro.png`,
    linkedinUrl:
      "https://cr.linkedin.com/in/jos%C3%A9-miguel-alfaro-g%C3%B3mez-6a491529",
  },

  // ─── 11:40 — Fintech for Good ───
  {
    id: "steven-cabrera",
    name: "Steven Cabrera",
    org: "Fundador @ Epark",
    talk: "Fintech for Good — Transformación de las Ciudades",
    time: "11:40 — 12:05",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69dfdfe396fe7ef28d86f859_Steven%20Cabrera.jpeg`,
  },

  // ─── 12:10 — Regen District ───
  {
    id: "franz-tunez",
    name: "Franz Tuñez",
    org: "CEO & Co-founder @ NetX Gen",
    talk: "Regen District en Próspera",
    time: "12:10 — 12:35",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
    linkedinUrl: "https://www.linkedin.com/in/francisco-tu%C3%B1ez/",
  },

  // ─── 12:40 — Privacidad Programable ───
  {
    id: "andy-guzman-toledo",
    name: "Andy Guzmán Toledo",
    org: "Head of Privacy @ Ethereum Foundation",
    talk:
      "Privacidad Programable — Ethereum como Infraestructura para el Sector Público",
    time: "12:40 — 13:05",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69b1632ad8361e61e604f16a_Andy%20Guzman.jpeg`,
    linkedinUrl: "https://www.linkedin.com/in/andyguzmantoledo/",
  },

  // ─── 13:10 — Del Código a la Ley ───
  {
    id: "stephanie-sanchez",
    name: "Stephanie Sánchez",
    org: "Miss Crypto Lawyer · Embajadora Oficial TicoBlockchain",
    talk: "Del Código a la Ley: Web3 y la Ley de Activos Digitales",
    time: "13:10 — 13:30",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/67dd4ba9bd7e331b594ea0bf_Screenshot4.avif`,
    linkedinUrl:
      "https://www.linkedin.com/in/stephanie-s%C3%A1nchez-misscryptolawyer-b512aa14b/",
  },

  // ─── 13:35 — Keynote Sovra (Anti-corrupción) ───
  {
    id: "chuy-cepeda",
    name: 'Jesús "Chuy" Cepeda',
    org: "Co-founder & CSO @ Sovra",
    talk: "Blockchain como Herramienta Anticorrupción en Costa Rica",
    time: "13:35 — 14:15",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69dfd56f01845b6f1e8af5df_chuy%20cepeda.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/chuycepeda/",
    companyUrl: "https://chuycepeda.com",
  },

  // ─── 14:20 — Charla Citi ───
  {
    id: "carolina-marino",
    name: "Carolina Mariño",
    org: "LATAM Client & Market Integration Head · Citi",
    talk: "Charla Citi — Digital Assets y Pagos Tokenizados",
    time: "14:20 — 14:45",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
    linkedinUrl:
      "https://www.linkedin.com/in/carolina-mari%C3%B1o-rehbein-b0796a65/",
  },

  // ─── 14:50 — Pagos y Stablecoins (panel main) ───
  {
    id: "javier-buitrago",
    name: "Javier Buitrago",
    org: "Co-founder · Cámara Fintech de Panamá",
    talk: "Pagos y Stablecoins (Moderador)",
    time: "14:50 — 15:30",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69f62ded5913d16a699d9f0c_Javier%20Buitrago.png`,
    linkedinUrl: "https://www.linkedin.com/in/jbuitrago/",
  },
  {
    id: "daniel-calderon-serna",
    name: "Daniel Calderón Serna",
    org: "Business Development Manager · VISA Centroamérica & Caribe",
    talk: "Pagos y Stablecoins (Panel)",
    time: "14:50 — 15:30",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/67d6c61eee11dca78ec6021b_Screenshot2.avif`,
    linkedinUrl: "https://cr.linkedin.com/in/daniel-calder%C3%B3n-ey",
  },
  {
    id: "renato-carvajal",
    name: "Renato Carvajal",
    org: "Regional Commercial Head · Teledólar — Monis",
    talk: "Pagos y Stablecoins (Panel)",
    time: "14:50 — 15:30",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
    linkedinUrl: "https://www.linkedin.com/in/carlosrenatocarvajal/",
  },
  {
    id: "jorge-neyra",
    name: "Jorge Neyra",
    org: "Vice President · Cámara Fintech Panamá",
    talk: "Pagos y Stablecoins (Panel)",
    time: "14:50 — 15:30",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69f62ee8784d9fb985d57099_Jorge%20Neyra.png`,
    linkedinUrl:
      "https://www.linkedin.com/in/jorge-adan-neyra-loaisiga-794a49125/",
  },
  {
    id: "karol-zuniga-castro",
    name: "Karol Zúñiga Castro",
    org: "Banco Central de Costa Rica",
    talk: "Pagos y Stablecoins (Panel)",
    time: "14:50 — 15:30",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69fccf2b23ed1b3481f61906_Screenshot%20(9).png`,
    linkedinUrl: "https://www.linkedin.com/in/karol-zuniga-516922177/",
  },

  // ─── 14:55 — IoT / Obra Pública (esc-2) ───
  {
    id: "juan-alejandro-herrera",
    name: "Juan Alejandro Herrera",
    org: "Asesor · Contraloría General de la República",
    talk: "Red de Monitoreo de Obra Pública — IoT, IA y Blockchain",
    time: "14:55 — 15:15",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: `${CDN}/69f636d45ccf95fbb0e40b55_Juan%20Alejandro%20Herrera%20L%C3%B3pez.png`,
    linkedinUrl: "https://www.linkedin.com/in/alejandro-herreracr/",
  },

  // ─── 15:15 — Identidad Digital (esc-2) ───
  {
    id: "andres-gomez",
    name: "Andrés Gómez",
    org: "CEO & Co-founder @ Sakundi",
    talk: "Identidad Digital en Blockchain — Privacidad y Regulación",
    time: "15:15 — 15:35",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: `${CDN}/67b70e12f953d3095dc31151_WhatsApp%20Image%202025-02-19%20at%2012.54.12.avif`,
    linkedinUrl:
      "https://www.linkedin.com/in/andres-gomez-ramirez-bb7226156/",
  },

  // ─── 16:00 — Agentes Autónomos (panel main) ───
  {
    id: "carlos-rene",
    name: "Carlos René",
    org: "CEO & Founder @ DEGA",
    talk: "Agentes Autónomos (Panel)",
    time: "16:00 — 16:40",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69adda1a8b7cb04006a35843_Carlos.png`,
    linkedinUrl: "https://www.linkedin.com/in/ccerrato147/",
    companyUrl: "https://www.dega.org/",
  },
  {
    id: "cristian-guillen",
    name: "Cristian Guillén",
    org: "Advisory Delivery Consultant @ IBM",
    talk: "Agentes Autónomos (Panel)",
    time: "16:00 — 16:40",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69fccde3a48d091d953d89b8_Cristian%20Guillen.jpeg`,
    linkedinUrl: "https://www.linkedin.com/in/cristian-guillen-men/",
  },

  // ─── 16:30 — Convergencia AI/Blockchain/Quantum (esc-2) ───
  {
    id: "ranulfo-paiva-barbosa",
    name: "Ranulfo Paiva Barbosa",
    org: "Co-founder @ CofiBlocks",
    talk:
      "Convergencia: Cuando Agentes AI, Blockchain y Quantum Computing Crean (y Pueden Destruir) Riqueza",
    time: "16:30 — 16:55",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: `${CDN}/67d6c44f3308e481191fce7a_1516577422716.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/ranulfosobrinho/",
  },

  // ─── 16:45 — PANEL FIA (panel main) ───
  {
    id: "jose-miguel-zamora",
    name: "José Miguel Zamora Barquero",
    org: "Presidente @ AsoFintech",
    talk: "PANEL FIA — Ecosistemas Regional (Moderador)",
    time: "16:45 — 17:25",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/675c3780bd959b632317034d_jose%20miguel%20zamora.avif`,
    linkedinUrl: "https://www.linkedin.com/in/jose-miguel-z-52638932/",
  },
  {
    id: "rafael-robinson",
    name: "Rafael Robinson",
    org: "President · Cámara Fintech Panamá",
    talk: "PANEL FIA — Ecosistemas Regional (Panel)",
    time: "16:45 — 17:25",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69f6302b31a22f075107680b_Rafael%20Robinson.png`,
    linkedinUrl:
      "https://www.linkedin.com/in/rafael-robinson-85013264/",
  },
  {
    id: "enrique-galdamez",
    name: "Enrique Galdámez",
    org: "Executive Director · Fintech Association of Guatemala",
    talk: "PANEL FIA — Ecosistemas Regional (Panel)",
    time: "16:45 — 17:25",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69f62d0c5b614afed62689dc_Enrique%20Gald%C3%A1mez.png`,
    linkedinUrl: "https://www.linkedin.com/in/enriquegaldamez28/",
  },

  // ─── 17:00 — Finanzas Regenerativas (esc-2) ───
  {
    id: "stefan-fiedler",
    name: "Stefan Fiedler",
    org: "Co-Director @ ReFi Costa Rica",
    talk: "Sobre el Ecosistema de Finanzas Regenerativas",
    time: "17:00 — 17:25",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: `${CDN}/69f6362260eea17234867b6b_Stefan%20Fiedler%20Alvarado.png`,
    linkedinUrl:
      "https://www.linkedin.com/in/stefan-fiedler-alvarado-0269a0178/",
  },

  // ─── 17:30 — Ecosistemas y CRTW (closing panel main) ───
  // Karla & José Miguel are duplicated entries: they're already anchored
  // to earlier panels (10:55 and 16:45 respectively), and we need a second
  // entry to auto-flip them live again at 17:30 since each Speaker can only
  // hold one `time` value.
  {
    id: "karla-cordoba-brenes-cierre",
    name: "Karla Córdoba Brenes",
    org: "Presidenta @ AsoBlockchain",
    talk: "Ecosistemas y CRTW (Panel)",
    time: "17:30 — 17:55",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/675c37edeca90d4c739eee46_KarlaC_JTS-22%20(p).avif`,
    linkedinUrl: "https://www.linkedin.com/in/muguika",
  },
  {
    id: "jose-miguel-zamora-cierre",
    name: "José Miguel Zamora Barquero",
    org: "Presidente @ AsoFintech",
    talk: "Ecosistemas y CRTW (Panel)",
    time: "17:30 — 17:55",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/675c3780bd959b632317034d_jose%20miguel%20zamora.avif`,
    linkedinUrl: "https://www.linkedin.com/in/jose-miguel-z-52638932/",
  },
  {
    id: "nelson-irias",
    name: "Nelson Irías",
    org: "Por confirmar",
    talk: "Ecosistemas y CRTW (Panel)",
    time: "17:30 — 17:55",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
  },

  // ─── Por anunciar — speakers confirmed on the official site without
  //     a pinned slot in sessions.ts. Each gets a solo card on /exponentes.
  {
    id: "rogelio-martinez",
    name: "Rogelio Martínez",
    org: "Angel Investor · Founder @ BlockchainGuard",
    talk: "Pitch Session",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69b1647566e862a48f42e86e_rogelio%20martinez.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/rogeliomartinez/",
  },
  {
    id: "roberto-grella",
    name: "Roberto Grella",
    org: "Fintech Uruguay",
    talk: "Ecosistema Regional Fintech",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
  },
  {
    id: "diego-perez",
    name: "Diego Perez",
    org: "Board Member · ABFintechs",
    talk: "PANEL FIA — Ecosistemas Regional (Panel)",
    time: "16:45 — 17:25",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69f62c803aea82102c7fc3b5_Diego%20Perez.png`,
    linkedinUrl: "https://www.linkedin.com/in/diegoperezsmu/",
  },
  {
    id: "gianina-redondo",
    name: "Gianina Redondo",
    org: "Project Manager @ Ncubo",
    talk: "Agentes Autónomos y Dinero Digital",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69fcea8335e1df81f740c852_Geaninna%20Redondo.jpeg`,
  },
  {
    id: "jorge-mora-flores",
    name: "Jorge Mora Flores",
    org: "Consultor @ BID",
    talk: "Ciberseguridad y Transformación Digital",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69b166db6b3cda83debb0b55_jorge%20mora%20flores.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/jorgemoraflores/",
  },

  // ─── New additions from the official site (May 2026 confirmation pass) ───
  {
    id: "carlos-jose-pardo",
    name: "Carlos José Pardo",
    org: "General Manager · VISA Costa Rica",
    talk: "Pagos Digitales",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/69f62b57dd7cdadd0f7f10ba_Screenshot12.png`,
    linkedinUrl:
      "https://www.linkedin.com/in/carlos-jos%C3%A9-pardo-32819162/",
  },
  {
    id: "randall-barquero",
    name: "Randall Barquero",
    org: "Partner @ Consortium Legal · Board @ AsoFintech",
    talk: "Regulación Fintech — Estado Actual y Perspectivas",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: `${CDN}/67d029a93702b2c591a8ce34_Randall%20Barquero%202025.avif`,
    linkedinUrl: "https://linkedin.com/in/randall-barquero",
  },
] as const;
