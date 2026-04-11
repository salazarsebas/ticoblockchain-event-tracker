"use client";

import { useEffect, useRef } from "react";
import type {
  GrecoFeature,
  LobbyPOI,
  SelectableFeature,
  Stand,
} from "../types";

type FeatureDetailPanelProps = {
  selected: SelectableFeature | null;
  onClose: () => void;
};

export default function FeatureDetailPanel({
  selected,
  onClose,
}: FeatureDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Focus the close button whenever the panel opens / changes target
  useEffect(() => {
    if (selected && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selected]);

  // Escape-to-close + basic tab trap
  useEffect(() => {
    if (!selected) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selected, onClose]);

  if (!selected) return null;

  const { title, category, description, extras } = buildContent(selected);
  const titleId = "feature-detail-title";

  return (
    <>
      {/* Backdrop — only visible on mobile/tablet */}
      <div
        className="fixed inset-0 bg-primary/60 z-40 lg:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          "fixed z-50 bg-surface border-primary",
          // Mobile: bottom sheet, full width, ~80vh
          "inset-x-0 bottom-0 max-h-[85vh] border-t-4",
          "animate-fade-up",
          // Desktop: right-side slide-in
          "lg:top-0 lg:right-0 lg:bottom-0 lg:left-auto lg:inset-x-auto lg:max-h-none lg:h-full lg:w-96 lg:border-t-0 lg:border-l-4 lg:animate-slide-right",
          "flex flex-col",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b-2 border-primary">
          <div>
            <p className="mono-data text-xs uppercase tracking-widest text-primary/60 mb-2">
              {category}
            </p>
            <h2
              id={titleId}
              className="font-display text-2xl font-black uppercase tracking-tight text-primary leading-tight"
            >
              {title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel de detalles"
            className="shrink-0 bg-secondary text-on-secondary w-10 h-10 inline-flex items-center justify-center hover:bg-secondary-container transition-colors"
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
              style={{ fontSize: "22px", fontVariationSettings: '"FILL" 1' }}
            >
              close
            </span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {description && (
            <p className="text-sm leading-relaxed text-on-surface">
              {description}
            </p>
          )}
          {extras}
        </div>
      </div>
    </>
  );
}

/* ----------------------- content builder ----------------------- */

type Content = {
  title: string;
  category: string;
  description?: string;
  extras?: React.ReactNode;
};

function buildContent(selected: SelectableFeature): Content {
  switch (selected.kind) {
    case "greco-feature":
      return buildGrecoContent(selected.data);
    case "stand":
      return buildStandContent(selected.data);
    case "lobby-poi":
      return buildLobbyPOIContent(selected.data);
  }
}

function buildGrecoContent(feature: GrecoFeature): Content {
  // Audience features have interactive: false and are filtered out before
  // reaching the detail panel (see FloorplanSVG + findSelectable). This
  // branch is unreachable at runtime but narrows the type for the rest of
  // the function so grecoKindLabel below doesn't need an "audience" case.
  if (feature.kind === "audience") {
    return { title: feature.label, category: "Butacas" };
  }

  const base: Content = {
    title: feature.label,
    category: grecoKindLabel(feature.kind),
    description: feature.description,
  };

  if (feature.kind === "stage") {
    return {
      ...base,
      extras: (
        <DataBlock label="Próxima Charla" value="POR CONFIRMAR" />
      ),
    };
  }

  if (feature.kind === "check-in") {
    return {
      ...base,
      extras: (
        <DataBlock label="Requisito" value="Presentá tu código QR" />
      ),
    };
  }

  if (feature.kind === "entry-door") {
    return {
      ...base,
      extras: <DataBlock label="Acceso" value="Sala Greco" />,
    };
  }

  return base;
}

function buildStandContent(stand: Stand): Content {
  const sponsorLabel = stand.sponsorName ?? "Disponible";
  // Only render the link if the URL uses http(s). This blocks
  // javascript:, data:, and other unsafe protocols when real sponsor
  // data is wired in later.
  const safeSponsorUrl = isHttpUrl(stand.sponsorUrl) ? stand.sponsorUrl : null;
  return {
    title: `Stand ${stand.number.toString().padStart(2, "0")}`,
    category: "Stand de Exponente",
    description: `Stand ubicado en la pared ${stand.wall === "left" ? "izquierda" : "derecha"} de Sala Greco.`,
    extras: (
      <>
        <DataBlock label="Sponsor" value={sponsorLabel.toUpperCase()} />
        {safeSponsorUrl && (
          <a
            href={safeSponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary-container text-on-primary font-display text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-primary transition-colors"
          >
            Ver Sponsor
          </a>
        )}
      </>
    ),
  };
}

function isHttpUrl(url: string | undefined): url is string {
  if (!url) return false;
  return url.startsWith("https://") || url.startsWith("http://");
}

function buildLobbyPOIContent(poi: LobbyPOI): Content {
  return {
    title: poi.label,
    category: lobbyCategoryLabel(poi.category),
    description: poi.description,
  };
}

function grecoKindLabel(
  kind: Exclude<GrecoFeature["kind"], "audience">,
): string {
  switch (kind) {
    case "stage":
      return "Escenario";
    case "mesas-regalo":
      return "Mesas";
    case "mesas-transmision":
      return "Prensa";
    case "check-in":
      return "Registro";
    case "entry-door":
      return "Acceso";
  }
}

function lobbyCategoryLabel(category: LobbyPOI["category"]): string {
  switch (category) {
    case "entrance":
      return "Entrada";
    case "food":
      return "Comida";
    case "toilet":
      return "Servicios";
    default:
      return "Información";
  }
}

function DataBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-4 border-secondary pl-4 py-1">
      <p className="mono-data text-xs uppercase tracking-widest text-primary/60">
        {label}
      </p>
      <p className="font-display text-lg font-bold uppercase tracking-tight text-primary mt-1">
        {value}
      </p>
    </div>
  );
}
