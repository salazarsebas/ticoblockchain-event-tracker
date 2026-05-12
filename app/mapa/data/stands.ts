import type { Stand } from "../types";

// 6 stands sit in an L-shape along the south + east walls of Sala Greco:
// 4 horizontal stands across the bottom in a 1-1-2 pattern (one wide
// stand on the left = Visa, the centered Olanzo stand, and two clustered
// on the right = Wink + Startups), then 2 vertical stands stacked above
// stand 4 forming the corner (Nimiq immediately above stand 4, Artemis
// above Nimiq). Both vertical stands share stand 4's x=820 column so the
// L-corner reads cleanly. The 10px gap between vertical stands mirrors
// the close-cluster gap already used between stands 3 and 4.
// The gap between Visa (stand 1) and Olanzo (stand 2) lines up with the
// entry door at x=280..360; the gap between Olanzo and the right cluster
// lines up with the entry door at x=640..720.
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
  {
    id: "stand-5",
    number: 5,
    wall: "right",
    bbox: { x: 835, y: 450, width: 50, height: 80 },
    sponsorName: "Nimiq",
  },
  {
    id: "stand-6",
    number: 6,
    wall: "right",
    bbox: { x: 835, y: 360, width: 50, height: 80 },
    sponsorName: "Artemis",
  },
] as const;
