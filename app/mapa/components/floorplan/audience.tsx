import type { BBox } from "../../types";

export function AudienceGrid({ area, rows }: { area: BBox; rows: number }) {
  // Decorative "tipo escuela" seating: 3 distinct blocks separated by aisles.
  // Same layout primitives shared by Sala Greco and Escenario 2; only the
  // outer area and row count differ.
  const blocks = 3;
  const colsPerBlock = 2;
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
