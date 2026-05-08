"use client";

import type { Speaker } from "../../data/types";

export type StageFilterValue = "all" | Speaker["stage"];

type StageFilterProps = {
  value: StageFilterValue;
  counts: Record<StageFilterValue, number>;
  onChange: (next: StageFilterValue) => void;
};

const OPTIONS: ReadonlyArray<{ value: StageFilterValue; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "main", label: "Main" },
  { value: "escenario-2", label: "Escenario 2" },
] as const;

// Three-state stage toolbar. Pure presentational — owner component manages
// state and feeds back through `onChange`. Counts render alongside each
// label so attendees see the lineup density per track at a glance.
export default function StageFilter({ value, counts, onChange }: StageFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar por escenario"
      className="flex flex-wrap items-stretch gap-0 border-2 border-primary/20"
    >
      {OPTIONS.map((opt, i) => {
        const isActive = value === opt.value;
        const isLast = i === OPTIONS.length - 1;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={[
              "flex-1 sm:flex-none px-3 sm:px-5 py-2 mono-data text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors duration-150 inline-flex items-center justify-center gap-2",
              isActive
                ? "bg-primary text-on-primary"
                : "bg-transparent text-primary hover:bg-primary/5",
              !isLast ? "border-r-2 border-primary/20" : "",
            ].join(" ")}
          >
            <span>{opt.label}</span>
            <span
              className={`label-meta text-[9px] font-bold ${
                isActive ? "text-on-primary/70" : "text-primary/50"
              }`}
            >
              {counts[opt.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
