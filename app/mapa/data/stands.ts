import type { Stand } from "../types";

// 4 stands sit along the bottom of Sala Greco in a 1-1-2 pattern:
// one wide stand on the left (Visa), the centered Olanzo stand, and
// two clustered on the right (Wink + Startups). The gap between the
// left stand and the centered one lines up with the entry door at
// x=280..360; the gap between the centered stand and the right
// cluster lines up with the entry door at x=640..720.
export const STANDS: readonly Stand[] = [
  {
    id: "stand-1",
    number: 1,
    wall: "left",
    bbox: { x: 100, y: 540, width: 170, height: 50 },
    sponsorName: "Visa",
  },
  {
    id: "stand-2",
    number: 2,
    wall: "left",
    bbox: { x: 460, y: 540, width: 80, height: 50 },
    sponsorName: "Olanzo",
  },
  {
    id: "stand-3",
    number: 3,
    wall: "right",
    bbox: { x: 730, y: 540, width: 80, height: 50 },
    sponsorName: "Wink",
  },
  {
    id: "stand-4",
    number: 4,
    wall: "right",
    bbox: { x: 820, y: 540, width: 80, height: 50 },
    sponsorName: "Startups",
  },
] as const;
