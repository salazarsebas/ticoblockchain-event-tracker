"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import FloorplanSVG from "./components/FloorplanSVG";
import MapLegend from "./components/MapLegend";
import FilterChips from "./components/FilterChips";
import FeatureDetailPanel from "./components/FeatureDetailPanel";
import { GRECO_FEATURES } from "./data/greco-features";
import { STANDS } from "./data/stands";
import { LOBBY_POIS } from "./data/lobby-pois";
import type { POICategory, SelectableFeature } from "./types";

const ALL_CATEGORIES: POICategory[] = [
  "stage",
  "stands",
  "food",
  "toilet",
  "checkin",
  "entrance",
  "tables",
];

function findSelectable(id: string): SelectableFeature | null {
  const grecoFeature = GRECO_FEATURES.find((f) => f.id === id && f.interactive);
  if (grecoFeature) return { kind: "greco-feature", data: grecoFeature };

  const stand = STANDS.find((s) => s.id === id);
  if (stand) return { kind: "stand", data: stand };

  const poi = LOBBY_POIS.find((p) => p.id === id);
  if (poi) return { kind: "lobby-poi", data: poi };

  return null;
}

export default function MapaPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<POICategory>>(
    () => new Set(ALL_CATEGORIES),
  );
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const selected = useMemo(
    () => (selectedId ? findSelectable(selectedId) : null),
    [selectedId],
  );

  const handleSelect = useCallback((id: string) => {
    if (typeof document !== "undefined") {
      lastTriggerRef.current =
        (document.activeElement as HTMLElement | null) ?? null;
    }
    setSelectedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
    // Return focus to the element that opened the panel
    if (lastTriggerRef.current && typeof lastTriggerRef.current.focus === "function") {
      lastTriggerRef.current.focus();
      lastTriggerRef.current = null;
    }
  }, []);

  const handleToggleFilter = useCallback((category: POICategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  return (
    <main id="main" className="pb-20">
      <section className="px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 pt-8">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-black uppercase tracking-tighter text-primary animate-reveal-up">
            MAPA
          </h1>
          <div className="mt-4 md:mt-0 mono-data text-primary flex items-center gap-2 animate-fade-up stagger-2">
            <span className="w-3 h-3 bg-secondary" aria-hidden="true" />
            UBICACIÓN: HOTEL BARCELÓ SAN JOSÉ
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-6 animate-fade-up stagger-3">
          <FilterChips
            activeFilters={activeFilters}
            onToggle={handleToggleFilter}
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-primary animate-fade-up stagger-4">
          {/* Legend column — hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block lg:col-span-3">
            <MapLegend />
          </div>

          {/* Map canvas */}
          <div className="lg:col-span-9 bg-surface-container-low relative overflow-hidden p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[360px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[640px]">
            <div className="w-full max-w-5xl">
              <FloorplanSVG
                selectedId={selectedId}
                activeFilters={activeFilters}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* Mobile legend — stacked below map */}
          <div className="lg:hidden">
            <MapLegend />
          </div>
        </div>
      </section>

      {/* Detail panel */}
      <FeatureDetailPanel selected={selected} onClose={handleClose} />
    </main>
  );
}
