"use client";

type LegendEntry = {
  label: string;
  swatchClass: string;
  swatchBorderClass?: string;
};

const ENTRIES: readonly LegendEntry[] = [
  {
    label: "Escenario Principal",
    swatchClass: "bg-primary-container",
  },
  {
    label: "Mesas (Regalos / Transmisión)",
    swatchClass: "bg-primary-fixed-dim",
    swatchBorderClass: "border-primary",
  },
  {
    label: "Stands 1–9",
    swatchClass: "bg-surface-variant",
    swatchBorderClass: "border-primary",
  },
  {
    label: "Check-in & Accesos",
    swatchClass: "bg-secondary",
  },
  {
    label: "Food & Coffee",
    swatchClass: "bg-primary-fixed-dim",
    swatchBorderClass: "border-primary",
  },
  {
    label: "Servicios Sanitarios",
    swatchClass: "bg-surface-variant",
    swatchBorderClass: "border-primary",
  },
  {
    label: "Entrada del Hotel",
    swatchClass: "bg-primary-container",
  },
] as const;

export default function MapLegend() {
  return (
    <aside
      aria-label="Leyenda del mapa"
      className="bg-primary text-on-primary p-8 flex flex-col justify-between h-full"
    >
      <div>
        <p className="mono-data text-xs uppercase tracking-widest opacity-60 mb-8">
          Navegación del recinto
        </p>
        <ul className="space-y-5">
          {ENTRIES.map((entry) => (
            <li key={entry.label} className="flex items-start gap-4">
              <span
                className={[
                  "w-4 h-4 shrink-0 mt-1",
                  entry.swatchClass,
                  entry.swatchBorderClass
                    ? `border ${entry.swatchBorderClass}`
                    : "",
                ].join(" ")}
                aria-hidden="true"
              />
              <span className="font-display text-sm font-bold uppercase tracking-wide leading-snug">
                {entry.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 bg-secondary p-3 flex items-center gap-3">
        <span
          className="material-symbols-outlined text-on-secondary"
          aria-hidden="true"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          location_on
        </span>
        <span className="font-display font-black uppercase tracking-tight text-on-secondary">
          Estás aquí
        </span>
      </div>
    </aside>
  );
}
