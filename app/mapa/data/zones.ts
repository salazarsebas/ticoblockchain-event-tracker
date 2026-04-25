import type { Zone } from "../types";

// Sala Greco, Lobby and Escenario 2 share a single unified outer container.
// They are physically one connected space — separated by the interior walls
// at y=620 (greco/lobby) and y=880 (lobby/escenario-2). The y=880 wall has
// an opening on the right (x=860..940) for the corridor that connects the
// lobby to the Escenario 2 room.
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
  {
    id: "escenario-2",
    label: "ESCENARIO 2",
    bbox: { x: 60, y: 884, width: 880, height: 396 },
  },
] as const;
