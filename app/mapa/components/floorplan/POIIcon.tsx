import { ICON_PATHS, type IconName } from "../../../components/Icon";

// Renders a shared Icon glyph inline inside the SVG context. The 24x24
// path is centered on (cx, cy) via a transform so the existing text
// anchoring math keeps working unchanged.
export function POIIcon({
  iconName,
  cx,
  cy,
  size = 26,
  fill,
}: {
  iconName: IconName;
  cx: number;
  cy: number;
  size?: number;
  fill: string;
}) {
  const scale = size / 24;
  const tx = cx - size / 2;
  const ty = cy - size / 2;
  return (
    <g
      transform={`translate(${tx} ${ty}) scale(${scale})`}
      style={{ pointerEvents: "none" }}
    >
      <path d={ICON_PATHS[iconName]} fill={fill} />
    </g>
  );
}
