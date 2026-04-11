"use client";

import type { POICategory } from "../types";

type FilterChipsProps = {
  activeFilters: Set<POICategory>;
  onToggle: (category: POICategory) => void;
};

type ChipConfig = {
  category: POICategory;
  label: string;
  iconName: string;
};

const CHIPS: readonly ChipConfig[] = [
  { category: "stage", label: "Escenario", iconName: "campaign" },
  { category: "stands", label: "Stands", iconName: "storefront" },
  { category: "tables", label: "Mesas", iconName: "table_bar" },
  { category: "checkin", label: "Check-in", iconName: "how_to_reg" },
  { category: "food", label: "Food & Coffee", iconName: "restaurant" },
  { category: "toilet", label: "Sanitarios", iconName: "wc" },
  { category: "entrance", label: "Accesos", iconName: "door_front" },
] as const;

export default function FilterChips({
  activeFilters,
  onToggle,
}: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label="Filtros de categoría"
      className="flex gap-2 overflow-x-auto no-scrollbar py-2"
    >
      {CHIPS.map((chip) => {
        const active = activeFilters.has(chip.category);
        return (
          <button
            key={chip.category}
            type="button"
            onClick={() => onToggle(chip.category)}
            aria-pressed={active}
            className={[
              "shrink-0 inline-flex items-center gap-2 px-4 py-2 border-2",
              "font-display text-xs font-bold uppercase tracking-wider",
              "transition-colors",
              active
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface text-primary border-primary",
            ].join(" ")}
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
              style={{
                fontSize: "18px",
                fontVariationSettings: '"FILL" 1',
              }}
            >
              {chip.iconName}
            </span>
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
