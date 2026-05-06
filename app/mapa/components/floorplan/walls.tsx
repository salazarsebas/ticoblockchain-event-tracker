import type { BBox } from "../../types";
import { ZONES } from "../../data/zones";
import {
  CORRIDOR_BOTTOM_Y,
  CORRIDOR_DOOR_GAP,
  CORRIDOR_RIGHT_WALL_X,
  CORRIDOR_WALL_X,
  DOOR_GAPS,
  LOBBY_ESC2_DOOR_GAPS,
  PATH_TO_ENTRANCE_Y,
  CORRIDOR_HALF_HEIGHT,
  SHOW_ESCENARIO_2,
  WALL_LOBBY_ESC2_Y,
  WALL_Y,
} from "./constants";

export function ContainerOutline() {
  const greco = ZONES.find((z) => z.id === "greco")!.bbox;
  const lobby = ZONES.find((z) => z.id === "lobby")!.bbox;
  const esc2 = ZONES.find((z) => z.id === "escenario-2")!.bbox;

  // Unified outer boundary. When Escenario 2 is hidden the building ends at
  // the lobby's bottom, giving the lobby a single solid bottom wall.
  const outer: BBox = {
    x: greco.x,
    y: greco.y,
    width: greco.width,
    height: SHOW_ESCENARIO_2
      ? esc2.y + esc2.height - greco.y
      : lobby.y + lobby.height - greco.y,
  };

  // Right-wall opening for the hotel entrance — matches the corridor
  // connector coming in from the walking path lane.
  const entranceTop = PATH_TO_ENTRANCE_Y - CORRIDOR_HALF_HEIGHT;
  const entranceBottom = PATH_TO_ENTRANCE_Y + CORRIDOR_HALF_HEIGHT;
  const right = outer.x + outer.width;
  const bottom = outer.y + outer.height;

  return (
    <g>
      {/* Unified container — filled background, walls drawn as segments so we
          can leave a gap on the right wall for the hotel entrance. */}
      <rect
        x={outer.x}
        y={outer.y}
        width={outer.width}
        height={outer.height}
        fill="var(--color-surface-container-lowest)"
      />
      <line x1={outer.x} y1={outer.y} x2={right} y2={outer.y} stroke="var(--color-primary)" strokeWidth={4} />
      <line x1={outer.x} y1={outer.y} x2={outer.x} y2={bottom} stroke="var(--color-primary)" strokeWidth={4} />
      {/* Bottom wall — when esc2 is shown, leave a gap at the corridor's x
          range so the hallway can continue out through the building's south
          wall toward the restaurant. Otherwise draw it solid. */}
      {SHOW_ESCENARIO_2 ? (
        <>
          <line x1={outer.x} y1={bottom} x2={CORRIDOR_WALL_X} y2={bottom} stroke="var(--color-primary)" strokeWidth={4} />
          <line x1={CORRIDOR_RIGHT_WALL_X} y1={bottom} x2={right} y2={bottom} stroke="var(--color-primary)" strokeWidth={4} />
        </>
      ) : (
        <line x1={outer.x} y1={bottom} x2={right} y2={bottom} stroke="var(--color-primary)" strokeWidth={4} />
      )}
      <line x1={right} y1={outer.y} x2={right} y2={entranceTop} stroke="var(--color-primary)" strokeWidth={4} />
      <line x1={right} y1={entranceBottom} x2={right} y2={bottom} stroke="var(--color-primary)" strokeWidth={4} />
      {/* Subtle lobby tint for visual distinction without a hard border */}
      <rect
        x={lobby.x + 2}
        y={lobby.y}
        width={lobby.width - 4}
        height={lobby.height - 2}
        fill="var(--color-surface-container-low)"
      />
      {SHOW_ESCENARIO_2 && (
        /* Corridor tint — internal hallway between the two vertical walls.
           Starts where the lobby tint ends so they meet seamlessly through
           the open passage at the top of the corridor (no white sliver) and
           continues past the building's south wall down to the restaurant
           entrance, giving the through-corridor a single continuous floor. */
        <rect
          x={CORRIDOR_WALL_X + 2}
          y={lobby.y + lobby.height - 2}
          width={CORRIDOR_RIGHT_WALL_X - CORRIDOR_WALL_X - 4}
          height={CORRIDOR_BOTTOM_Y - (lobby.y + lobby.height - 2)}
          fill="var(--color-surface-container-low)"
        />
      )}

      {/* Zone labels — top-left corner of each area */}
      <text
        x={greco.x + 16}
        y={greco.y + 32}
        className="font-display"
        fontSize={26}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-primary)"
      >
        SALA GRECO
      </text>
      <text
        x={lobby.x + 16}
        y={lobby.y + 36}
        className="font-display"
        fontSize={26}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-primary)"
      >
        LOBBY
      </text>
      {SHOW_ESCENARIO_2 && (
        <text
          x={esc2.x + 16}
          y={esc2.y + 36}
          className="font-display"
          fontSize={26}
          fontWeight={700}
          letterSpacing="0.08em"
          fill="var(--color-primary)"
        >
          ESCENARIO 2
        </text>
      )}
    </g>
  );
}

export function Wall() {
  // Draws the interior wall between Greco and Lobby as a series of thick
  // horizontal segments, skipping the door gaps. The doors themselves are
  // drawn as separate crimson rects by <GrecoFeatureShape kind="entry-door">.
  const xStart = 60;
  const xEnd = 940;
  const segments: { x1: number; x2: number }[] = [];

  // Sort gaps left-to-right
  const gaps = [...DOOR_GAPS].sort((a, b) => a.x - b.x);
  let cursor = xStart;
  for (const gap of gaps) {
    if (gap.x > cursor) {
      segments.push({ x1: cursor, x2: gap.x });
    }
    cursor = gap.x + gap.width;
  }
  if (cursor < xEnd) {
    segments.push({ x1: cursor, x2: xEnd });
  }

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {segments.map((seg, i) => (
        <line
          key={i}
          x1={seg.x1}
          y1={WALL_Y}
          x2={seg.x2}
          y2={WALL_Y}
          stroke="var(--color-primary)"
          strokeWidth={4}
          strokeLinecap="butt"
        />
      ))}
    </g>
  );
}

export function LobbyEsc2Wall() {
  // Horizontal wall between the Lobby and the Escenario 2 room. Drawn as
  // segments around the main entrance door gap so the corridor is enclosed
  // except for the labeled entrance.
  const xStart = 60;
  const xEnd = 940;
  const segments: { x1: number; x2: number }[] = [];
  const gaps = [...LOBBY_ESC2_DOOR_GAPS].sort((a, b) => a.x - b.x);
  let cursor = xStart;
  for (const gap of gaps) {
    if (gap.x > cursor) segments.push({ x1: cursor, x2: gap.x });
    cursor = gap.x + gap.width;
  }
  if (cursor < xEnd) segments.push({ x1: cursor, x2: xEnd });

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {segments.map((seg, i) => (
        <line
          key={i}
          x1={seg.x1}
          y1={WALL_LOBBY_ESC2_Y}
          x2={seg.x2}
          y2={WALL_LOBBY_ESC2_Y}
          stroke="var(--color-primary)"
          strokeWidth={4}
          strokeLinecap="butt"
        />
      ))}
    </g>
  );
}

export function CorridorWall() {
  // Two vertical walls forming the internal corridor on the right of
  // Escenario 2. Left wall is broken by the entry door gap; right wall
  // is solid. The corridor's top is open (handled by LobbyEsc2Wall) and
  // its bottom extends past the building's south wall down to the
  // restaurant entrance.
  const doorTop = CORRIDOR_DOOR_GAP.y;
  const doorBottom = CORRIDOR_DOOR_GAP.y + CORRIDOR_DOOR_GAP.height;
  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <line
        x1={CORRIDOR_WALL_X}
        y1={WALL_LOBBY_ESC2_Y}
        x2={CORRIDOR_WALL_X}
        y2={doorTop}
        stroke="var(--color-primary)"
        strokeWidth={4}
        strokeLinecap="butt"
      />
      <line
        x1={CORRIDOR_WALL_X}
        y1={doorBottom}
        x2={CORRIDOR_WALL_X}
        y2={CORRIDOR_BOTTOM_Y}
        stroke="var(--color-primary)"
        strokeWidth={4}
        strokeLinecap="butt"
      />
      <line
        x1={CORRIDOR_RIGHT_WALL_X}
        y1={WALL_LOBBY_ESC2_Y}
        x2={CORRIDOR_RIGHT_WALL_X}
        y2={CORRIDOR_BOTTOM_Y}
        stroke="var(--color-primary)"
        strokeWidth={4}
        strokeLinecap="butt"
      />
    </g>
  );
}
