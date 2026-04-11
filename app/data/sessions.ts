import type { Session } from "./types";
import { VENUE } from "./venue";

// All sessions happen in Sala Greco — the only room at the event.
// Sorted chronologically. Exactly one session has status "live" at a time.
export const SESSIONS: readonly Session[] = [
  {
    id: "registro",
    time: "08:00",
    title: "Registro y Café de Bienvenida",
    speakerName: "Equipo TicoBlockchain",
    room: VENUE.roomLabel,
    status: "past",
  },
  {
    id: "keynote-estado-cripto",
    time: "09:00",
    title: "Keynote: El Estado de Cripto en LATAM",
    speakerName: "Elena Rodríguez",
    speakerOrg: "Founder @ Solarpunk Finance",
    room: VENUE.roomLabel,
    status: "past",
  },
  {
    id: "defi-profundo",
    time: "10:30",
    title: "DeFi Profundo: Protocolos de Próxima Generación",
    speakerName: "Marco Solís",
    speakerOrg: "CTO Soluciones Blockchain",
    room: VENUE.roomLabel,
    status: "live",
  },
  {
    id: "panel-inversion",
    time: "11:00",
    title: "Panel: Inversión Institucional en Web3",
    speakerName: "Varios Panelistas",
    room: VENUE.roomLabel,
    status: "next",
  },
  {
    id: "soberania-l2",
    time: "11:45",
    title: "Soberanía de Datos en la Era de L2: ZK-Rollups en LATAM",
    speakerName: "Carlos Méndez",
    speakerOrg: "Lead Architect @ Ethereum Foundation",
    room: VENUE.roomLabel,
    status: "scheduled",
  },
  {
    id: "almuerzo",
    time: "12:30",
    title: "Almuerzo de Networking & Workshop Abierto",
    speakerName: "Comunidad Abierta",
    room: VENUE.roomLabel,
    status: "scheduled",
  },
  {
    id: "seguridad-contracts",
    time: "14:00",
    title: "Seguridad en Smart Contracts: Auditoría Real",
    speakerName: "Dra. Lucía Méndez",
    speakerOrg: "Auditora Lead",
    room: VENUE.roomLabel,
    status: "scheduled",
  },
  {
    id: "marco-legal",
    time: "14:45",
    title: "Marco Legal 2026: Ley Cripto y Activos Digitales en Centroamérica",
    speakerName: "Sofía Alfaro",
    speakerOrg: "Legal Counsel @ CryptoCR",
    room: VENUE.roomLabel,
    status: "scheduled",
  },
  {
    id: "panel-dinero-digital",
    time: "15:30",
    title: "Panel: El Futuro del Dinero Digital en CR",
    speakerName: "Panelistas Invitados",
    room: VENUE.roomLabel,
    status: "scheduled",
  },
  {
    id: "experiencias-onchain",
    time: "16:15",
    title: "Diseño de Experiencias On-chain: De Billeteras a Metaversos",
    speakerName: "Andrés Mora",
    speakerOrg: "Creative Director @ Metahuman",
    room: VENUE.roomLabel,
    status: "scheduled",
  },
  {
    id: "clausura",
    time: "17:00",
    title: "Clausura y Cócteles",
    speakerName: "Patrocinadores Platinum",
    room: VENUE.roomLabel,
    status: "scheduled",
  },
] as const;

export function getLiveSession(): Session | undefined {
  return SESSIONS.find((s) => s.status === "live");
}

export function getNextSessions(count: number): Session[] {
  return SESSIONS.filter(
    (s) => s.status === "next" || s.status === "scheduled",
  ).slice(0, count);
}
