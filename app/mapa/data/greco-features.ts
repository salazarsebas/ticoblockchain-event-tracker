import type { GrecoFeature } from "../types";

export const GRECO_FEATURES: readonly GrecoFeature[] = [
  {
    id: "stage",
    kind: "stage",
    label: "Escenario Principal",
    category: "stage",
    interactive: true,
    bbox: { x: 360, y: 60, width: 280, height: 90 },
    description:
      "Escenario principal de Sala Greco. Aquí ocurren las charlas y keynotes del evento.",
  },
  {
    id: "mesas-regalo",
    kind: "mesas-regalo",
    label: "Mesas de Regalos",
    shortLabel: "Regalos",
    category: "tables",
    interactive: true,
    bbox: { x: 730, y: 70, width: 190, height: 70 },
    description:
      "Zona de swag y materiales del evento. Pasá a retirar tu kit de asistente.",
  },
  {
    id: "mesas-transmision",
    kind: "mesas-transmision",
    label: "Mesas de Transmisión",
    shortLabel: "Prensa",
    category: "tables",
    interactive: true,
    bbox: { x: 80, y: 300, width: 80, height: 110 },
    description:
      "Área de prensa y transmisión en vivo. Acreditación de medios únicamente.",
  },
  {
    id: "audience",
    kind: "audience",
    label: "Butacas",
    category: "stage",
    interactive: false,
    bbox: { x: 260, y: 180, width: 480, height: 380 },
  },
  {
    id: "check-in",
    kind: "check-in",
    label: "Check-in",
    category: "checkin",
    interactive: true,
    bbox: { x: 420, y: 678, width: 160, height: 42 },
    description:
      "Presentá tu código QR antes de entrar a Sala Greco. Ubicado en el lobby, entre las dos puertas de acceso.",
  },
  {
    id: "entry-door-left",
    kind: "entry-door",
    label: "Acceso Izquierdo",
    category: "entrance",
    interactive: true,
    bbox: { x: 340, y: 611, width: 80, height: 18 },
    description: "Puerta de acceso izquierda a Sala Greco.",
  },
  {
    id: "entry-door-right",
    kind: "entry-door",
    label: "Acceso Derecho",
    category: "entrance",
    interactive: true,
    bbox: { x: 580, y: 611, width: 80, height: 18 },
    description: "Puerta de acceso derecha a Sala Greco.",
  },
] as const;
