import type { Stand } from "../types";

export const STANDS: readonly Stand[] = [
  {
    id: "stand-1",
    number: 1,
    wall: "left",
    bbox: { x: 80, y: 170, width: 80, height: 50 },
  },
  {
    id: "stand-2",
    number: 2,
    wall: "left",
    bbox: { x: 80, y: 230, width: 80, height: 50 },
  },
  {
    id: "stand-3",
    number: 3,
    wall: "left",
    bbox: { x: 80, y: 420, width: 80, height: 50 },
  },
  {
    id: "stand-4",
    number: 4,
    wall: "left",
    bbox: { x: 80, y: 480, width: 80, height: 50 },
  },
  {
    id: "stand-5",
    number: 5,
    wall: "left",
    bbox: { x: 80, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-6",
    number: 6,
    wall: "right",
    bbox: { x: 840, y: 170, width: 80, height: 50 },
  },
  {
    id: "stand-7",
    number: 7,
    wall: "right",
    bbox: { x: 840, y: 240, width: 80, height: 50 },
  },
  {
    id: "stand-8",
    number: 8,
    wall: "right",
    bbox: { x: 840, y: 310, width: 80, height: 50 },
  },
  {
    id: "stand-9",
    number: 9,
    wall: "right",
    bbox: { x: 840, y: 380, width: 80, height: 50 },
  },
] as const;
