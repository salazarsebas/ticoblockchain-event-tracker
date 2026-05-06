import type { ReactNode } from "react";
import type { IconName } from "../../../components/Icon";
import type { BBox } from "../../types";
import {
  BUILDING_RIGHT_X,
  CORRIDOR_HALF_HEIGHT,
  CORRIDOR_RIGHT_WALL_X,
  CORRIDOR_WALL_X,
  PATH_TO_ENTRANCE_Y,
  SHOW_ESCENARIO_2,
  WALKING_PATH_BBOX,
} from "./constants";
import { POIIcon } from "./POIIcon";

// Decorative outlined block for an out-of-building zone (parking, restaurant).
// Centered icon + label; optional decorations slot for zone-specific marks
// like the parking stall ticks.
export function ExteriorBlock({
  bbox,
  iconName,
  label,
  decorations,
}: {
  bbox: BBox;
  iconName: IconName;
  label: string;
  decorations?: ReactNode;
}) {
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill="var(--color-surface-container-high)"
        stroke="var(--color-primary)"
        strokeWidth={4}
      />
      {decorations}
      <POIIcon
        iconName={iconName}
        cx={cx}
        cy={cy - 18}
        size={56}
        fill="var(--color-primary)"
      />
      <text
        x={cx}
        y={cy + 32}
        className="font-display"
        fontSize={22}
        fontWeight={900}
        letterSpacing="0.08em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-primary)"
      >
        {label}
      </text>
    </g>
  );
}

// Restaurant rendered as a room (white interior, like Sala Greco / Esc2)
// connected to the building via the corridor extension. Top wall has a gap
// at the corridor's x range so the hallway flows continuously into the
// space, with a small secondary-colored door marker straddling the threshold.
export function RestaurantRoom({ bbox }: { bbox: BBox }) {
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const right = bbox.x + bbox.width;
  const bottomY = bbox.y + bbox.height;
  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill="var(--color-surface-container-lowest)"
      />
      {SHOW_ESCENARIO_2 ? (
        <>
          <line x1={bbox.x} y1={bbox.y} x2={CORRIDOR_WALL_X} y2={bbox.y} stroke="var(--color-primary)" strokeWidth={4} />
          <line x1={CORRIDOR_RIGHT_WALL_X} y1={bbox.y} x2={right} y2={bbox.y} stroke="var(--color-primary)" strokeWidth={4} />
        </>
      ) : (
        <line x1={bbox.x} y1={bbox.y} x2={right} y2={bbox.y} stroke="var(--color-primary)" strokeWidth={4} />
      )}
      <line x1={bbox.x} y1={bbox.y} x2={bbox.x} y2={bottomY} stroke="var(--color-primary)" strokeWidth={4} />
      <line x1={right} y1={bbox.y} x2={right} y2={bottomY} stroke="var(--color-primary)" strokeWidth={4} />
      <line x1={bbox.x} y1={bottomY} x2={right} y2={bottomY} stroke="var(--color-primary)" strokeWidth={4} />
      <POIIcon
        iconName="restaurant"
        cx={cx}
        cy={cy - 18}
        size={56}
        fill="var(--color-primary)"
      />
      <text
        x={cx}
        y={cy + 32}
        className="font-display"
        fontSize={22}
        fontWeight={900}
        letterSpacing="0.08em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-primary)"
      >
        RESTAURANTE
      </text>
    </g>
  );
}

// Short vertical ticks along the top and bottom edges of the parking
// block — suggests parking stalls without being literal.
export function ParkingStalls({ bbox }: { bbox: BBox }) {
  const stalls = 5;
  const stallStep = bbox.width / stalls;
  return (
    <>
      {Array.from({ length: stalls - 1 }, (_, i) => {
        const tickX = bbox.x + stallStep * (i + 1);
        return (
          <g key={i}>
            <line
              x1={tickX}
              y1={bbox.y}
              x2={tickX}
              y2={bbox.y + 22}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
            <line
              x1={tickX}
              y1={bbox.y + bbox.height - 22}
              x2={tickX}
              y2={bbox.y + bbox.height}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
          </g>
        );
      })}
    </>
  );
}

export function WalkingPath() {
  const { x, y, width, height } = WALKING_PATH_BBOX;
  const laneCenterX = x + width / 2;
  const laneRight = x + width;
  const laneBottom = y + height;
  const corridorTop = PATH_TO_ENTRANCE_Y - CORRIDOR_HALF_HEIGHT;
  const corridorBottom = PATH_TO_ENTRANCE_Y + CORRIDOR_HALF_HEIGHT;
  const wallStroke = {
    stroke: "var(--color-primary)",
    strokeWidth: 3,
    strokeDasharray: "8 6",
  };
  const spineStroke = {
    stroke: "var(--color-primary)",
    strokeWidth: 2,
    strokeDasharray: "6 6",
    opacity: 0.45,
  };

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {/* Fills (no stroke) — walls drawn separately so we can leave a doorway
          on the lane's left side where the corridor joins. */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="var(--color-surface-container-low)"
      />
      <rect
        x={BUILDING_RIGHT_X}
        y={corridorTop}
        width={x - BUILDING_RIGHT_X}
        height={corridorBottom - corridorTop}
        fill="var(--color-surface-container-low)"
      />

      {/* Vertical lane walls — top, right, bottom are continuous; the left
          wall has a gap at the corridor entry so the path flows through. */}
      <line x1={x} y1={y} x2={laneRight} y2={y} {...wallStroke} />
      <line x1={laneRight} y1={y} x2={laneRight} y2={laneBottom} {...wallStroke} />
      <line x1={x} y1={laneBottom} x2={laneRight} y2={laneBottom} {...wallStroke} />
      <line x1={x} y1={y} x2={x} y2={corridorTop} {...wallStroke} />
      <line x1={x} y1={corridorBottom} x2={x} y2={laneBottom} {...wallStroke} />

      {/* Horizontal corridor walls — top + bottom only. No left wall (the
          building's solid right wall already terminates the corridor) and
          no right wall (the lane's left-wall gap opens into the corridor). */}
      <line x1={BUILDING_RIGHT_X} y1={corridorTop} x2={x} y2={corridorTop} {...wallStroke} />
      <line x1={BUILDING_RIGHT_X} y1={corridorBottom} x2={x} y2={corridorBottom} {...wallStroke} />

      {/* Center spines — vertical runs full length, horizontal runs through
          the corridor; they cross at the entry point forming a "+" so flow
          reads as continuous in all four directions. */}
      <line x1={laneCenterX} y1={y + 8} x2={laneCenterX} y2={laneBottom - 8} {...spineStroke} />
      <line x1={BUILDING_RIGHT_X + 8} y1={PATH_TO_ENTRANCE_Y} x2={laneCenterX} y2={PATH_TO_ENTRANCE_Y} {...spineStroke} />
    </g>
  );
}
