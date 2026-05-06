import type { LobbyPOI } from "../types";

export const LOBBY_POIS: readonly LobbyPOI[] = [
  {
    id: "entrevistas",
    label: "Entrevistas",
    category: "tables",
    iconName: "mic",
    bbox: { x: 760, y: 640, width: 122, height: 90 },
    description:
      "Zona de entrevistas del evento. Asistentes, speakers y sponsors comparten su experiencia en vivo durante la jornada.",
  },
  {
    id: "toilets",
    label: "Servicios Sanitarios",
    shortLabel: "Sanitarios",
    category: "toilet",
    iconName: "wc",
    bbox: { x: 80, y: 670, width: 120, height: 70 },
    description:
      "Servicios sanitarios disponibles para todos los asistentes al evento.",
  },
  {
    id: "food-coffee",
    label: "Food & Coffee",
    category: "food",
    iconName: "restaurant",
    bbox: { x: 220, y: 770, width: 380, height: 90 },
    description:
      "Zona de comida y café. Espacio principal de networking entre sesiones.",
  },
  {
    id: "hotel-entrance",
    label: "Entrada Principal del Hotel",
    shortLabel: "Entrada",
    category: "entrance",
    iconName: "door_front",
    bbox: { x: 820, y: 748, width: 120, height: 24 },
    description:
      "Entrada principal del Hotel Barceló San José. Punto de llegada al evento.",
  },
] as const;
