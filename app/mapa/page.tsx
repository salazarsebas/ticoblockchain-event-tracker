"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import FloorplanSVG from "./components/FloorplanSVG";
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

  const handleResetFilters = useCallback(() => {
    setActiveFilters(new Set(ALL_CATEGORIES));
  }, []);

  return (
    <main id="main" className="pb-20">
      <section className="px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-3 mb-6 pt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tighter text-primary leading-none animate-reveal-up">
            MAPA
            <span className="sr-only"> del recinto · TicoBlockchain 2026 · Hotel Barceló San José</span>
          </h1>
          <p className="label-meta sm:text-xs text-on-surface-variant max-w-md animate-fade-up stagger-2">
            Sala Greco + Lobby + Escenario 2. Tocá cualquier forma para ver detalles.
          </p>
        </div>

        {/* Filter chips — double as legend via per-category color swatches */}
        <div className="mb-6 animate-fade-up stagger-3">
          <FilterChips
            activeFilters={activeFilters}
            onToggle={handleToggleFilter}
            onReset={handleResetFilters}
            totalCategories={ALL_CATEGORIES.length}
          />
        </div>

        {/* Map canvas */}
        <div className="bg-surface-container-low border-4 border-primary relative overflow-hidden p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[420px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] animate-fade-up stagger-4">
          <div className="w-full max-w-5xl">
            <FloorplanSVG
              selectedId={selectedId}
              activeFilters={activeFilters}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </section>

      {/* Detail panel */}
      <FeatureDetailPanel selected={selected} onClose={handleClose} />
    </main>
  );
}
