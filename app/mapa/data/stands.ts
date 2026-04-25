import type { Stand } from "../types";

// All 5 stands sit along the bottom of Sala Greco, distributed evenly across
// the audience width (x=260..740) at y=540, just below the seating grid and
// above the entry doors. Each stand is 80px wide with 20px gaps between.
export const STANDS: readonly Stand[] = [
  {
    id: "stand-1",
    number: 1,
    wall: "left",
    bbox: { x: 260, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-2",
    number: 2,
    wall: "left",
    bbox: { x: 360, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-3",
    number: 3,
    wall: "left",
    bbox: { x: 460, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-4",
    number: 4,
    wall: "left",
    bbox: { x: 560, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-5",
    number: 5,
    wall: "left",
    bbox: { x: 660, y: 540, width: 80, height: 50 },
  },
] as const;
