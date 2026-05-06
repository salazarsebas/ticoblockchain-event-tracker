import type { KeyboardEvent, ReactNode } from "react";
import type { BBox, GrecoFeature, LobbyPOI, Stand } from "../../types";
import { POIIcon } from "./POIIcon";

// Shared wrapper for all three interactive shape types. Handles the
// accessibility role, dim/selected visual states, and the bounding rect.
// Callers provide shape-specific text/icon children.
type InteractiveShapeProps = {
  id: string;
  bbox: BBox;
  fill: string;
  ariaLabel: string;
  dimmed: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<SVGGElement>) => void;
  extraClassName?: string;
  children?: ReactNode;
  // When true, the click target is invisible (no fill, no stroke) and the
  // shape opts out of the default crimson hover border. The visible content
  // lives entirely in `children`.
  borderless?: boolean;
};

function InteractiveShape({
  id,
  bbox,
  fill,
  ariaLabel,
  dimmed,
  selected,
  onSelect,
  onKeyDown,
  extraClassName,
  children,
  borderless,
}: InteractiveShapeProps) {
  const baseClass = borderless ? "map-shape-ghost" : "map-shape";
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={() => onSelect(id)}
      onKeyDown={onKeyDown}
      className={`${baseClass} cursor-pointer${extraClassName ? ` ${extraClassName}` : ""}`}
      style={{ opacity: dimmed ? 0.2 : 1 }}
    >
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill={borderless ? "transparent" : fill}
        stroke={borderless ? "none" : (selected ? "var(--color-secondary)" : "var(--color-primary)")}
        strokeWidth={borderless ? 0 : (selected ? 5 : 2)}
      />
      {children}
    </g>
  );
}

type ShapeHandlers = {
  dimmed: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<SVGGElement>) => void;
};

export function GrecoFeatureShape({
  feature,
  ...handlers
}: { feature: GrecoFeature } & ShapeHandlers) {
  const { bbox, kind, label, shortLabel, iconName } = feature;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const fill =
    kind === "stage"
      ? "var(--color-primary-container)"
      : kind === "check-in" || kind === "entry-door"
        ? "var(--color-secondary)"
        : "var(--color-primary-fixed-dim)"; // sonido, mesas-cocteleras

  const textFill =
    kind === "stage" || kind === "check-in" || kind === "entry-door"
      ? "var(--color-on-primary)"
      : "var(--color-primary)";

  const showLabel = kind !== "entry-door"; // doors are too thin for labels
  const displayLabel = (shortLabel ?? label).toUpperCase();
  // Only pulse when the stage is actually active — otherwise the opacity
  // keyframes override the dimmed inline opacity and the stage stays visible.
  const extraClassName =
    kind === "stage" && !handlers.dimmed ? "map-stage-pulse" : undefined;

  // check-in strips are only 30px tall — stack icon+text horizontally instead of vertically.
  const horizontalLayout = kind === "check-in";
  const labelFontSize = kind === "stage" ? 22 : horizontalLayout ? 14 : 15;
  const iconSize = kind === "stage" ? 28 : horizontalLayout ? 18 : 26;
  const iconOffsetY = kind === "stage" ? 22 : 20;
  const labelOffsetY = kind === "stage" ? 18 : 17;

  return (
    <InteractiveShape
      id={feature.id}
      bbox={bbox}
      fill={fill}
      ariaLabel={label}
      extraClassName={extraClassName}
      {...handlers}
    >
      {iconName && horizontalLayout && (
        <POIIcon
          iconName={iconName}
          cx={bbox.x + 16}
          cy={cy}
          size={iconSize}
          fill={textFill}
        />
      )}
      {iconName && !horizontalLayout && (
        <POIIcon
          iconName={iconName}
          cx={cx}
          cy={cy - iconOffsetY}
          size={iconSize}
          fill={textFill}
        />
      )}
      {showLabel && (
        <text
          x={horizontalLayout && iconName ? bbox.x + 32 : cx}
          y={iconName && !horizontalLayout ? cy + labelOffsetY : cy}
          className="font-display"
          fontSize={labelFontSize}
          fontWeight={700}
          letterSpacing="0.05em"
          textAnchor={horizontalLayout && iconName ? "start" : "middle"}
          dominantBaseline="middle"
          fill={textFill}
          style={{ textTransform: "uppercase", pointerEvents: "none" }}
        >
          {displayLabel}
        </text>
      )}
    </InteractiveShape>
  );
}

export function StandShape({
  stand,
  ...handlers
}: { stand: Stand } & ShapeHandlers) {
  const { bbox, number } = stand;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  return (
    <InteractiveShape
      id={stand.id}
      bbox={bbox}
      fill="var(--color-surface-variant)"
      ariaLabel={`Stand ${number}`}
      {...handlers}
    >
      <POIIcon
        iconName="storefront"
        cx={cx}
        cy={cy - 13}
        size={22}
        fill="var(--color-primary)"
      />
      <text
        x={cx}
        y={cy + 14}
        className="font-display"
        fontSize={26}
        fontWeight={900}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-primary)"
        style={{ pointerEvents: "none" }}
      >
        {number.toString().padStart(2, "0")}
      </text>
    </InteractiveShape>
  );
}

export function LobbyPOIShape({
  poi,
  ...handlers
}: { poi: LobbyPOI } & ShapeHandlers) {
  const { bbox, label, shortLabel, category, iconName } = poi;
  const isEntrance = category === "entrance";
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const textFill = "var(--color-primary)";
  const displayLabel = (shortLabel ?? label).toUpperCase();

  // Entrance is rendered as a borderless title only — no icon, no rect, no
  // door arc. The wall gap and the corridor coming in from parking are the
  // visual cues; the label just names the spot.
  if (isEntrance) {
    return (
      <InteractiveShape
        id={poi.id}
        bbox={bbox}
        fill="transparent"
        ariaLabel={label}
        borderless
        {...handlers}
      >
        <text
          x={cx}
          y={cy}
          className="font-display"
          fontSize={16}
          fontWeight={900}
          letterSpacing="0.12em"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textFill}
          style={{ textTransform: "uppercase", pointerEvents: "none" }}
        >
          {displayLabel}
        </text>
      </InteractiveShape>
    );
  }

  const fill =
    category === "food"
      ? "var(--color-primary-fixed-dim)"
      : "var(--color-surface-variant)"; // toilet

  return (
    <InteractiveShape
      id={poi.id}
      bbox={bbox}
      fill={fill}
      ariaLabel={label}
      {...handlers}
    >
      <POIIcon iconName={iconName} cx={cx} cy={cy - 14} size={28} fill={textFill} />
      <text
        x={cx}
        y={cy + 19}
        className="font-display"
        fontSize={14}
        fontWeight={700}
        letterSpacing="0.05em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textFill}
        style={{ textTransform: "uppercase", pointerEvents: "none" }}
      >
        {displayLabel}
      </text>
    </InteractiveShape>
  );
}
