import type { LobbyPOI } from "../types";

export const LOBBY_POIS: readonly LobbyPOI[] = [
  {
    id: "toilets",
    label: "Servicios Sanitarios",
    shortLabel: "Sanitarios",
    category: "toilet",
    iconName: "wc",
    bbox: { x: 80, y: 770, width: 140, height: 90 },
    description:
      "Servicios sanitarios disponibles para todos los asistentes al evento.",
  },
  {
    id: "food-coffee",
    label: "Food & Coffee",
    category: "food",
    iconName: "restaurant",
    bbox: { x: 260, y: 770, width: 460, height: 90 },
    description:
      "Zona de comida y café. Espacio principal de networking entre sesiones.",
  },
  {
    id: "hotel-entrance",
    label: "Entrada Principal del Hotel",
    shortLabel: "Entrada Hotel",
    category: "entrance",
    iconName: "door_front",
    bbox: { x: 760, y: 770, width: 160, height: 90 },
    description:
      "Entrada principal del Hotel Barceló San José. Punto de llegada al evento.",
  },
] as const;
