import type { Zone } from "../types";

// Sala Greco and the Lobby share a single unified outer container.
// They are physically one connected space — separated only by the interior
// wall that contains the two access doors. The wall is drawn at y=620.
// The Lobby starts 4px below the wall (matching the wall stroke width).
export const ZONES: readonly Zone[] = [
  {
    id: "greco",
    label: "SALA GRECO",
    bbox: { x: 60, y: 40, width: 880, height: 580 },
  },
  {
    id: "lobby",
    label: "LOBBY",
    bbox: { x: 60, y: 624, width: 880, height: 256 },
  },
] as const;
