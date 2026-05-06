import { ZONES } from "../../data/zones";
import type { BBox } from "../../types";

export const VIEWBOX_WIDTH = 1200;
export const VIEWBOX_HEIGHT = 1540;

// External (out-of-building) wayfinding zones. Parking sits at the top-right
// of the venue; the restaurant has been relocated to the bottom of the map,
// directly under Escenario 2. The walking lane on the right keeps its full
// length for visual continuity but no longer terminates at the restaurant —
// it simply dead-ends past the entrance corridor. All decorative — not
// interactive, not filterable.
const EXTERIOR_ZONE_X = 970;
const EXTERIOR_ZONE_WIDTH = 210;
export const PARKING_BBOX: BBox = { x: EXTERIOR_ZONE_X, y: 40, width: EXTERIOR_ZONE_WIDTH, height: 400 };
export const RESTAURANT_BBOX: BBox = { x: 60, y: 1260, width: 880, height: 180 };
export const WALKING_PATH_BBOX: BBox = { x: 1050, y: 440, width: 50, height: 840 };
// Y-coordinate of the horizontal connector linking the lane to the
// hotel entrance. Aligned with the ENTRADA title; sits below the
// entrevistas zone in the lobby's top-right row so the label stays
// clear of that rect.
export const PATH_TO_ENTRANCE_Y = 760;
// Half-height of the horizontal corridor that branches off the lane
// toward the hotel entrance.
export const CORRIDOR_HALF_HEIGHT = 25;
// Right edge of the unified venue outline (Sala Greco's right wall).
// Derived from zone data so the lane stays anchored if the building is
// ever resized.
export const BUILDING_RIGHT_X = (() => {
  const g = ZONES.find((z) => z.id === "greco")!.bbox;
  return g.x + g.width;
})();

// Wall between Sala Greco and the Lobby — has gaps where the entry doors sit.
export const WALL_Y = 620;
export const DOOR_GAPS: readonly { x: number; width: number }[] = [
  { x: 280, width: 80 }, // matches entry-door-left bbox
  { x: 640, width: 80 }, // matches entry-door-right bbox
];

// Wall between Lobby and Escenario 2 room — has a single open passage
// at the top of the internal corridor (people enter the corridor freely
// from the lobby through this opening, no door marker).
export const WALL_LOBBY_ESC2_Y = 880;
export const LOBBY_ESC2_DOOR_GAPS: readonly { x: number; width: number }[] = [
  { x: 742, width: 126 }, // open passage at top of corridor
];

// Internal corridor on the right side of Escenario 2 — formed by two
// vertical walls. Top is open (matches LOBBY_ESC2_DOOR_GAPS), bottom now
// extends past the building's south wall into the restaurant entrance.
// Left wall has a door gap (entrance into the main stage area).
export const CORRIDOR_WALL_X = 740; // left corridor wall
export const CORRIDOR_RIGHT_WALL_X = 870; // right corridor wall (inside the building)
export const CORRIDOR_DOOR_GAP = { y: 970, height: 70 }; // matches esc2-entry-door bbox
export const CORRIDOR_BOTTOM_Y = 1260; // extends down to top of restaurant

// Toggle for the Escenario 2 zone (interior + corridor + features). When
// false, the building outline ends at the lobby's bottom wall (single solid
// wall), the corridor and esc2 features are not rendered, and the ESCENARIO 2
// label is hidden. Flip to true to bring it all back.
export const SHOW_ESCENARIO_2 = true;

// Audience grid configurations — Sala Greco (large) and Escenario 2 (smaller).
export const GRECO_AUDIENCE_AREA: BBox = { x: 260, y: 180, width: 480, height: 332 };
export const ESC2_AUDIENCE_AREA: BBox = { x: 150, y: 920, width: 480, height: 130 };
