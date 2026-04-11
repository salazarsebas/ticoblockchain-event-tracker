"use client";

import type { KeyboardEvent } from "react";
import { ZONES } from "../data/zones";
import { GRECO_FEATURES } from "../data/greco-features";
import { STANDS } from "../data/stands";
import { LOBBY_POIS } from "../data/lobby-pois";
import type {
  BBox,
  GrecoFeature,
  LobbyPOI,
  POICategory,
  Stand,
} from "../types";

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 900;

// Wall between Sala Greco and the Lobby — has gaps where the entry doors sit.
const WALL_Y = 620;
const DOOR_GAPS: readonly { x: number; width: number }[] = [
  { x: 340, width: 80 }, // matches entry-door-left bbox
  { x: 580, width: 80 }, // matches entry-door-right bbox
];

type FloorplanSVGProps = {
  selectedId: string | null;
  activeFilters: Set<POICategory>;
  onSelect: (id: string) => void;
};

export default function FloorplanSVG({
  selectedId,
  activeFilters,
  onSelect,
}: FloorplanSVGProps) {
  const handleKeyDown = (id: string) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="mapa-title mapa-desc"
      className="w-full h-auto select-none"
    >
      <title id="mapa-title">Mapa de Sala Greco y Lobby</title>
      <desc id="mapa-desc">
        Mapa interactivo del recinto TicoBlockchain 2026 en Hotel Barceló San
        José. Sala Greco y el lobby del hotel forman un solo espacio
        conectado, separados por una pared interior con dos puertas de acceso.
        Incluye escenario principal, nueve stands, mesas de regalos y prensa,
        check-in, servicios sanitarios, zona de comida y entrada del hotel.
      </desc>

      <ContainerOutline />
      <AudienceGrid />
      <Wall />

      {/* Greco interactive features */}
      {GRECO_FEATURES.filter((f) => f.interactive).map((feature) => (
        <GrecoFeatureShape
          key={feature.id}
          feature={feature}
          dimmed={!activeFilters.has(feature.category)}
          selected={selectedId === feature.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(feature.id)}
        />
      ))}

      {/* Stands */}
      {STANDS.map((stand) => (
        <StandShape
          key={stand.id}
          stand={stand}
          dimmed={!activeFilters.has("stands")}
          selected={selectedId === stand.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(stand.id)}
        />
      ))}

      {/* Lobby POIs */}
      {LOBBY_POIS.map((poi) => (
        <LobbyPOIShape
          key={poi.id}
          poi={poi}
          dimmed={!activeFilters.has(poi.category)}
          selected={selectedId === poi.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(poi.id)}
        />
      ))}

      {/* "Estás aquí" pin anchored to Hotel Main Entrance */}
      <YouAreHerePin />
    </svg>
  );
}

/* ----------------------------- Sub-components ----------------------------- */

function ContainerOutline() {
  const greco = ZONES[0].bbox;
  const lobby = ZONES[1].bbox;

  // Unified outer boundary from top of Greco to bottom of Lobby.
  const outer: BBox = {
    x: greco.x,
    y: greco.y,
    width: greco.width,
    height: lobby.y + lobby.height - greco.y,
  };

  return (
    <g>
      {/* Unified container — single room */}
      <rect
        x={outer.x}
        y={outer.y}
        width={outer.width}
        height={outer.height}
        fill="var(--color-surface-container-lowest)"
        stroke="var(--color-primary)"
        strokeWidth={4}
      />
      {/* Subtle lobby tint for visual distinction without a hard border */}
      <rect
        x={lobby.x + 2}
        y={lobby.y}
        width={lobby.width - 4}
        height={lobby.height - 2}
        fill="var(--color-surface-container-low)"
      />

      {/* Zone labels — top-left corner of each area */}
      <text
        x={greco.x + 16}
        y={greco.y + 28}
        className="font-display"
        fontSize={18}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-primary)"
      >
        SALA GRECO
      </text>
      <text
        x={lobby.x + 16}
        y={lobby.y + 32}
        className="font-display"
        fontSize={18}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-primary)"
      >
        LOBBY
      </text>
    </g>
  );
}

function Wall() {
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

function AudienceGrid() {
  // Decorative "tipo escuela" seating: 3 distinct blocks separated by aisles.
  // Matches the PPT floorplan that shows 3 seating columns facing the stage.
  const area: BBox = { x: 260, y: 180, width: 480, height: 380 };
  const blocks = 3;
  const colsPerBlock = 2;
  const rows = 8;
  const aisleWidth = 30;
  const cellGapX = 3;
  const cellGapY = 5;

  const blockWidth =
    (area.width - aisleWidth * (blocks - 1)) / blocks;
  const cellWidth =
    (blockWidth - cellGapX * (colsPerBlock - 1)) / colsPerBlock;
  const cellHeight = (area.height - cellGapY * (rows - 1)) / rows;

  const cells: { x: number; y: number; w: number; h: number }[] = [];
  for (let b = 0; b < blocks; b++) {
    const blockX = area.x + b * (blockWidth + aisleWidth);
    for (let c = 0; c < colsPerBlock; c++) {
      for (let r = 0; r < rows; r++) {
        cells.push({
          x: blockX + c * (cellWidth + cellGapX),
          y: area.y + r * (cellHeight + cellGapY),
          w: cellWidth,
          h: cellHeight,
        });
      }
    }
  }

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width={cell.w}
          height={cell.h}
          fill="var(--color-surface-variant)"
          opacity={0.45}
        />
      ))}
    </g>
  );
}

type InteractiveProps<T> = {
  dimmed: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<SVGGElement>) => void;
} & T;

function GrecoFeatureShape({
  feature,
  dimmed,
  selected,
  onSelect,
  onKeyDown,
}: InteractiveProps<{ feature: GrecoFeature }>) {
  const { bbox, kind, label, shortLabel } = feature;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const fill =
    kind === "stage"
      ? "var(--color-primary-container)"
      : kind === "check-in"
        ? "var(--color-secondary)"
        : kind === "entry-door"
          ? "var(--color-secondary)"
          : "var(--color-primary-fixed-dim)"; // mesas-regalo, mesas-transmision

  const textFill =
    kind === "stage" || kind === "check-in" || kind === "entry-door"
      ? "var(--color-on-primary)"
      : "var(--color-primary)";

  const showLabel = kind !== "entry-door"; // doors are too thin for labels
  const displayLabel = (shortLabel ?? label).toUpperCase();
  // Only pulse when the stage is actually active — otherwise the opacity
  // keyframes override the dimmed inline opacity and the stage stays visible.
  const pulseClass = kind === "stage" && !dimmed ? "map-stage-pulse" : "";

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => onSelect(feature.id)}
      onKeyDown={onKeyDown}
      className={`map-shape cursor-pointer ${pulseClass}`}
      style={{ opacity: dimmed ? 0.2 : 1 }}
    >
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill={fill}
        stroke={selected ? "var(--color-secondary)" : "var(--color-primary)"}
        strokeWidth={selected ? 5 : 2}
      />
      {showLabel && (
        <text
          x={cx}
          y={cy}
          className="font-display"
          fontSize={kind === "stage" ? 20 : 13}
          fontWeight={700}
          letterSpacing="0.05em"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textFill}
          style={{ textTransform: "uppercase", pointerEvents: "none" }}
        >
          {displayLabel}
        </text>
      )}
    </g>
  );
}

function StandShape({
  stand,
  dimmed,
  selected,
  onSelect,
  onKeyDown,
}: InteractiveProps<{ stand: Stand }>) {
  const { bbox, number } = stand;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Stand ${number}`}
      onClick={() => onSelect(stand.id)}
      onKeyDown={onKeyDown}
      className="map-shape cursor-pointer"
      style={{ opacity: dimmed ? 0.2 : 1 }}
    >
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill="var(--color-surface-variant)"
        stroke={selected ? "var(--color-secondary)" : "var(--color-primary)"}
        strokeWidth={selected ? 5 : 2}
      />
      <text
        x={cx}
        y={cy - 4}
        className="font-display"
        fontSize={9}
        fontWeight={700}
        letterSpacing="0.08em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-primary)"
        style={{ textTransform: "uppercase", pointerEvents: "none" }}
      >
        STAND
      </text>
      <text
        x={cx}
        y={cy + 12}
        className="font-display"
        fontSize={20}
        fontWeight={900}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-primary)"
        style={{ pointerEvents: "none" }}
      >
        {number.toString().padStart(2, "0")}
      </text>
    </g>
  );
}

function LobbyPOIShape({
  poi,
  dimmed,
  selected,
  onSelect,
  onKeyDown,
}: InteractiveProps<{ poi: LobbyPOI }>) {
  const { bbox, label, shortLabel, category, iconName } = poi;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const fill =
    category === "entrance"
      ? "var(--color-primary-container)"
      : category === "food"
        ? "var(--color-primary-fixed-dim)"
        : "var(--color-surface-variant)"; // toilet

  const textFill =
    category === "entrance"
      ? "var(--color-on-primary)"
      : "var(--color-primary)";

  const displayLabel = (shortLabel ?? label).toUpperCase();

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={() => onSelect(poi.id)}
      onKeyDown={onKeyDown}
      className="map-shape cursor-pointer"
      style={{ opacity: dimmed ? 0.2 : 1 }}
    >
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill={fill}
        stroke={selected ? "var(--color-secondary)" : "var(--color-primary)"}
        strokeWidth={selected ? 5 : 2}
      />
      <text
        x={cx}
        y={cy - 12}
        fontFamily='"Material Symbols Outlined"'
        fontSize={26}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textFill}
        style={{
          fontVariationSettings: '"FILL" 1',
          pointerEvents: "none",
        }}
      >
        {iconName}
      </text>
      <text
        x={cx}
        y={cy + 18}
        className="font-display"
        fontSize={11}
        fontWeight={700}
        letterSpacing="0.05em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textFill}
        style={{ textTransform: "uppercase", pointerEvents: "none" }}
      >
        {displayLabel}
      </text>
    </g>
  );
}

function YouAreHerePin() {
  // Anchored to the Hotel Main Entrance POI (x=760, y=770, w=160, h=90).
  // The badge sits just above the entrance rect; the pin icon points into it.
  const entranceCenterX = 760 + 160 / 2; // 840
  const iconY = 758; // icon center — top of the icon touches the entrance
  const badgeBottom = iconY - 20;

  return (
    <g
      className="animate-pin-bounce"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Badge */}
      <rect
        x={entranceCenterX - 50}
        y={badgeBottom - 18}
        width={100}
        height={18}
        fill="var(--color-secondary)"
      />
      <text
        x={entranceCenterX}
        y={badgeBottom - 9}
        className="font-mono"
        fontSize={9}
        fontWeight={700}
        letterSpacing="0.08em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-on-secondary)"
        style={{ textTransform: "uppercase" }}
      >
        ESTÁS AQUÍ
      </text>
      {/* Pin icon via Material Symbols ligature */}
      <text
        x={entranceCenterX}
        y={iconY}
        fontFamily='"Material Symbols Outlined"'
        fontSize={36}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-secondary)"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        location_on
      </text>
    </g>
  );
}
