import type { Stand } from "../types";

// Left wall: Sonido sits at the top (y=170, h=110 — see greco-features.ts),
// then 4 stands stacked below it at 60px intervals.
// Right wall: a single stand, centered vertically in the audience range.
export const STANDS: readonly Stand[] = [
  {
    id: "stand-1",
    number: 1,
    wall: "left",
    bbox: { x: 80, y: 290, width: 80, height: 50 },
  },
  {
    id: "stand-2",
    number: 2,
    wall: "left",
    bbox: { x: 80, y: 350, width: 80, height: 50 },
  },
  {
    id: "stand-3",
    number: 3,
    wall: "left",
    bbox: { x: 80, y: 410, width: 80, height: 50 },
  },
  {
    id: "stand-4",
    number: 4,
    wall: "left",
    bbox: { x: 80, y: 470, width: 80, height: 50 },
  },
  {
    id: "stand-5",
    number: 5,
    wall: "right",
    bbox: { x: 840, y: 345, width: 80, height: 50 },
  },
] as const;
