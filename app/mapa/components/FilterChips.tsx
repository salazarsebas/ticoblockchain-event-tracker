"use client";

import Icon, { type IconName } from "../../components/Icon";
import type { POICategory } from "../types";

type FilterChipsProps = {
  activeFilters: Set<POICategory>;
  onToggle: (category: POICategory) => void;
  onReset: () => void;
  totalCategories: number;
};

type ChipConfig = {
  category: POICategory;
  label: string;
  iconName: IconName;
  // Color swatch classes — mirror the fill colors each category takes on
  // the floorplan so the chip row doubles as the map legend.
  swatchClass: string;
};

const CHIPS: readonly ChipConfig[] = [
  { category: "stage", label: "Escenario", iconName: "campaign", swatchClass: "bg-primary-container" },
  { category: "stands", label: "Stands", iconName: "storefront", swatchClass: "bg-surface-variant" },
  { category: "tables", label: "Mesas", iconName: "table_bar", swatchClass: "bg-primary-fixed-dim" },
  { category: "checkin", label: "Check-in", iconName: "how_to_reg", swatchClass: "bg-secondary" },
  { category: "food", label: "Food & Coffee", iconName: "restaurant", swatchClass: "bg-primary-fixed-dim" },
  { category: "toilet", label: "Sanitarios", iconName: "wc", swatchClass: "bg-surface-variant" },
  { category: "entrance", label: "Accesos", iconName: "door_front", swatchClass: "bg-primary-container" },
] as const;

export default function FilterChips({
  activeFilters,
  onToggle,
  onReset,
  totalCategories,
}: FilterChipsProps) {
  const hasHiddenCategories = activeFilters.size < totalCategories;

  return (
    <div
      role="group"
      aria-label="Filtros de categoría"
      className="flex gap-2 overflow-x-auto no-scrollbar py-2"
    >
      {hasHiddenCategories && (
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 border-2 min-h-[44px] font-display text-xs font-bold uppercase tracking-wider transition-colors bg-secondary text-on-secondary border-secondary hover:bg-primary hover:border-primary"
        >
          <Icon name="check" size={16} />
          Mostrar todo
        </button>
      )}
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
              "min-h-[44px]",
              "font-display text-xs font-bold uppercase tracking-wider",
              "transition-colors",
              active
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface text-primary border-primary",
            ].join(" ")}
          >
            <span
              className={`w-3 h-3 ring-1 ring-current ring-inset ${chip.swatchClass}`}
              aria-hidden="true"
            />
            <Icon name={chip.iconName} size={18} />
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
