import type { Stand } from "../types";

// 5 stands sit along the bottom of Sala Greco in a 2-1-2 cluster pattern
// matching the venue floorplan: two clustered on the left, one centered,
// two clustered on the right. The gaps between clusters line up with the
// two entry doors in the bottom wall (x=280..360 and x=640..720). Each
// stand is 80×50 at y=540, with 10px gaps inside each cluster.
export const STANDS: readonly Stand[] = [
  {
    id: "stand-1",
    number: 1,
    wall: "left",
    bbox: { x: 100, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-2",
    number: 2,
    wall: "left",
    bbox: { x: 190, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-3",
    number: 3,
    wall: "left",
    bbox: { x: 460, y: 540, width: 80, height: 50 },
    sponsorName: "Olanzo",
  },
  {
    id: "stand-4",
    number: 4,
    wall: "right",
    bbox: { x: 730, y: 540, width: 80, height: 50 },
  },
  {
    id: "stand-5",
    number: 5,
    wall: "right",
    bbox: { x: 820, y: 540, width: 80, height: 50 },
  },
] as const;
