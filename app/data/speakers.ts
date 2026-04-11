import type { Speaker } from "./types";

// Confirmed speakers for TicoBlockchain 2026 — 24 MAYO.
// Ordered by next appearance. Exactly one is "live" at a time.
// Image URLs are placeholders (rotating pool) pending real portraits.
const IMG_A =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9-JCtp8F0cgSj2KjRr100CkoH8_wiYW1f8vqcHDKHtufJVMhckuwZMQtOGRUHJBpRfMsr4mcGRBM_G_s1wUMmDosB1bYROWDAVvvwk-QNX1ILgz3u-LEBQ1yZ0YwBuz7vP83MTTwZRkddaqLhHsdDHzMxG7EIelpLWFCRD-fPGsLIVperWLFre4Blxz8mvl_1sLIIOZB6Vdkh_KLnEzZwLJNtw7SYSmGpTY4WtVYbsw6laelVmkvJuYfby3OSGbjXXgJx96oBrBM";
const IMG_B =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCiipefm9FgmLvq0ikyF72wz6PVbHZyK7pgwX-8ScF_VoT7oSaNaAV_G2lk8KurgDobC9vjFeVPEtFxJRuJpPkwzLoEZT8w0ENP7UNC2aAjtYl8rEgZQdDnSCHdIK-5bwi2CgWXiSBajYiRK3SrdCnpE6V_UH-F239zdjKZFXpWEsyfg8df9_FYXuKX05L7K2PoykPmOCqs8o_acK5f2ifXRNpR42xWEz0NIgDdjreH1h8FGFWcS_qeld2NyB5VfQEt97HX_J3ddnM";
const IMG_C =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBZX5dueRZk_dLql5HtVAqeWVM9fUrrc3Zxc0Dz1VgD0Ksh1szN0IzkPRW-JFjIZH7XHjtSW5K9sTKRbzZsxA4l5x4GWfCxGRa2sVvUlQge8IQRi8M6WNK3mtGf2lWF5HyaF8B9_vMP5jNgppJ56udcrdZcG7niHjXt-g_mu7Yl2Wvrl49UZb0ucdzomY2hdQ4yM2CodsJnWHRlNGL3uxf7AGOM5_JLwKlEJx4tzuEe_S6QQHxItQhDCUWkTYO_JnN65puTo_7YXMw";
const IMG_D =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCihZQQz0UI-YiU2HidlxlndNs8vDvdDovdrPvukFAigl7kCDRd9J8XYv355pSWjR1SFT3DAzURCcrP7Jom4_Qf4T3qOfNaMqEyDjMZmlESQZlsdVrQQwsd1BvkF-JZXrr65xdfLoY5ckRR5evfNN0V4eOCIxGIsvFl7rG5jnuC8ruB1egcq0un8pBIu1xEOwrFcmV1qz0Xy76ZZ5wJ_9az4zAEnbVdVsWPyZjj9TbBvqG5F2mlLRBgwRUihTJNkyk4tV6G-eHhvw0";
const IMG_E =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAuRImHGJbqTn-MiEgbcaDQRJNIdFY8gtECGQ-1McEioSLXmUNyxOgVcfYcc5Kr1adw4YEGcdqejpvEJ64nAIX_kTmXyjYAxShH7jRnZbQkWp6xM6K6JqyhNotKCz2rp7SlIliBXjPOlhDDoM_9lVnpt5Y4fZORBtFg9rhH002yl94OKclUElV-TE88V7pNbTJJ_2W4UFkBEk2W6Y3W3uxcrGbRDYNMWLHlrq9Nth3ra5HjM3av2Qk8oaQRdokIwmUQRRYOt08LqXw";

export const SPEAKERS: readonly Speaker[] = [
  {
    id: "daniel-calderon",
    name: "Daniel Calderón",
    org: "VISA — Gerente Desarrollo Negocios · Centroamérica y Caribe",
    talk: "Keynote 1 — VISA: El futuro de los pagos digitales",
    time: "09:10 — 09:55",
    stage: "main",
    status: "past",
    imageUrl: IMG_C,
  },
  {
    id: "diego-loaiza-centeno",
    name: "Diego Loaiza Centeno",
    org: "CEO @ Wink",
    talk: "Mitos y Realidades de la Inclusión Financiera",
    time: "10:00 — 10:25",
    stage: "main",
    status: "live",
    imageUrl: IMG_A,
  },
  {
    id: "karla-cordoba-brenes",
    name: "Karla Córdoba Brenes",
    org: "Presidenta @ AsoBlockchain",
    talk: "Finanzas Regenerativas y RWA",
    time: "10:30 — 10:55",
    stage: "main",
    status: "next",
    imageUrl: IMG_B,
  },
  {
    id: "rogelio-martinez",
    name: "Rogelio Martínez",
    org: "Inversor Ángel · Fundador @ BlockchainGuard",
    talk: "Inversión en Startups",
    time: "10:30 — 10:55",
    stage: "main",
    status: "next",
    imageUrl: IMG_C,
  },
  {
    id: "jaddy-fernandez",
    name: "Jaddy Fernández",
    org: "Alianzas Estratégicas @ LNET Global (Perú)",
    talk: "Web3 y Agronegocios — Credenciales Verificables",
    time: "11:00 — 11:35",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: IMG_D,
  },
  {
    id: "franz-tunez",
    name: "Franz Tuñez",
    org: "Prospera (Argentina)",
    talk: "Payers District en Prospera",
    time: "12:10 — 12:30",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_E,
  },
  {
    id: "stephanie-sanchez",
    name: "Stephanie Sánchez",
    org: "Miss Crypto Lawyer · Embajadora Oficial TicoBlockchain",
    talk: "Keynote 2 — Identidad Para Siempre",
    time: "12:35 — 13:10",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_B,
  },
  {
    id: "jose-miguel-zamora",
    name: "José Miguel Zamora Barquero",
    org: "Presidente @ AsoFintech",
    talk: "Regulación e Integración Regional (Panel FIA)",
    time: "13:15 — 13:35",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_A,
  },
  {
    id: "randall-barquero",
    name: "Randall Barquero",
    org: "Socio @ Consortium Legal · JD AsoFintech",
    talk: "Regulación Fintech — Actualidad y Perspectivas (Panel FIA)",
    time: "13:15 — 13:35",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_E,
  },
  {
    id: "roberto-grella",
    name: "Roberto Grella",
    org: "Fintech Uruguay",
    talk: "Ecosistema Fintech Regional (Pagos y Stablecoins)",
    time: "15:10 — 15:45",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_C,
  },
  {
    id: "steven-cabrera",
    name: "Steven Cabrera",
    org: "Fundador @ Epark",
    talk: "Fintech for Good (Pagos y Stablecoins)",
    time: "15:10 — 15:45",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_D,
  },
  {
    id: "roberto-ponce-romay",
    name: "Roberto Ponce Romay",
    org: "Managing Director @ Invermaster Ventures",
    talk: "Agentes Autónomos en Cripto",
    time: "15:50 — 16:20",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_A,
  },
  {
    id: "carlos-rene",
    name: "Carlos René",
    org: "CEO & Founder @ DESA",
    talk: "AI en Cripto",
    time: "15:50 — 16:20",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_E,
  },
  {
    id: "andy-guzman-toledo",
    name: "Andy Guzmán Toledo",
    org: "Head of Privacy @ Ethereum Foundation",
    talk: "Privacidad en Blockchains Públicas",
    time: "15:50 — 16:20",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: IMG_B,
  },
  {
    id: "jorge-mora-flores",
    name: "Jorge Mora Flores",
    org: "Consultor @ BID",
    talk: "Ciberseguridad y Transformación Digital",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_D,
  },
] as const;
