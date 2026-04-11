import type { Speaker } from "./types";
import { VENUE } from "./venue";

// Speakers for the "Exponentes" editorial page.
// All speaker talks happen in Sala Greco — the only room at the event.
// Ordered by next appearance. Exactly one is "live" at a time.
export const SPEAKERS: readonly Speaker[] = [
  {
    id: "marco-solis",
    name: "Marco Solís",
    org: "CTO @ Soluciones Blockchain",
    talk: "DeFi Profundo: Protocolos de Próxima Generación",
    time: "10:30 — 11:00",
    room: VENUE.roomLabel,
    status: "live",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9-JCtp8F0cgSj2KjRr100CkoH8_wiYW1f8vqcHDKHtufJVMhckuwZMQtOGRUHJBpRfMsr4mcGRBM_G_s1wUMmDosB1bYROWDAVvvwk-QNX1ILgz3u-LEBQ1yZ0YwBuz7vP83MTTwZRkddaqLhHsdDHzMxG7EIelpLWFCRD-fPGsLIVperWLFre4Blxz8mvl_1sLIIOZB6Vdkh_KLnEzZwLJNtw7SYSmGpTY4WtVYbsw6laelVmkvJuYfby3OSGbjXXgJx96oBrBM",
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodríguez",
    org: "Founder @ Solarpunk Finance",
    talk: "ReFi y Regeneración de Ecosistemas Tropicales vía Tokenización",
    time: "11:00 — 11:45",
    room: VENUE.roomLabel,
    status: "next",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiipefm9FgmLvq0ikyF72wz6PVbHZyK7pgwX-8ScF_VoT7oSaNaAV_G2lk8KurgDobC9vjFeVPEtFxJRuJpPkwzLoEZT8w0ENP7UNC2aAjtYl8rEgZQdDnSCHdIK-5bwi2CgWXiSBajYiRK3SrdCnpE6V_UH-F239zdjKZFXpWEsyfg8df9_FYXuKX05L7K2PoykPmOCqs8o_acK5f2ifXRNpR42xWEz0NIgDdjreH1h8FGFWcS_qeld2NyB5VfQEt97HX_J3ddnM",
  },
  {
    id: "carlos-mendez",
    name: "Carlos Méndez",
    org: "Lead Architect @ Ethereum Foundation",
    talk: "Soberanía de Datos en la Era de L2: ZK-Rollups en LATAM",
    time: "11:45 — 12:30",
    room: VENUE.roomLabel,
    status: "scheduled",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZX5dueRZk_dLql5HtVAqeWVM9fUrrc3Zxc0Dz1VgD0Ksh1szN0IzkPRW-JFjIZH7XHjtSW5K9sTKRbzZsxA4l5x4GWfCxGRa2sVvUlQge8IQRi8M6WNK3mtGf2lWF5HyaF8B9_vMP5jNgppJ56udcrdZcG7niHjXt-g_mu7Yl2Wvrl49UZb0ucdzomY2hdQ4yM2CodsJnWHRlNGL3uxf7AGOM5_JLwKlEJx4tzuEe_S6QQHxItQhDCUWkTYO_JnN65puTo_7YXMw",
  },
  {
    id: "sofia-alfaro",
    name: "Sofía Alfaro",
    org: "Legal Counsel @ CryptoCR",
    talk: "Marco Legal 2026: Ley Cripto y Activos Digitales en Centroamérica",
    time: "14:00 — 14:45",
    room: VENUE.roomLabel,
    status: "scheduled",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCihZQQz0UI-YiU2HidlxlndNs8vDvdDovdrPvukFAigl7kCDRd9J8XYv355pSWjR1SFT3DAzURCcrP7Jom4_Qf4T3qOfNaMqEyDjMZmlESQZlsdVrQQwsd1BvkF-JZXrr65xdfLoY5ckRR5evfNN0V4eOCIxGIsvFl7rG5jnuC8ruB1egcq0un8pBIu1xEOwrFcmV1qz0Xy76ZZ5wJ_9az4zAEnbVdVsWPyZjj9TbBvqG5F2mlLRBgwRUihTJNkyk4tV6G-eHhvw0",
  },
  {
    id: "andres-mora",
    name: "Andrés Mora",
    org: "Creative Director @ Metahuman",
    talk: "Diseño de Experiencias On-chain: De Billeteras a Metaversos",
    time: "16:15 — 17:00",
    room: VENUE.roomLabel,
    status: "scheduled",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAuRImHGJbqTn-MiEgbcaDQRJNIdFY8gtECGQ-1McEioSLXmUNyxOgVcfYcc5Kr1adw4YEGcdqejpvEJ64nAIX_kTmXyjYAxShH7jRnZbQkWp6xM6K6JqyhNotKCz2rp7SlIliBXjPOlhDDoM_9lVnpt5Y4fZORBtFg9rhH002yl94OKclUElV-TE88V7pNbTJJ_2W4UFkBEk2W6Y3W3uxcrGbRDYNMWLHlrq9Nth3ra5HjM3av2Qk8oaQRdokIwmUQRRYOt08LqXw",
  },
] as const;
