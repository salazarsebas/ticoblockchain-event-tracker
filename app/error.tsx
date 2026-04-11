"use client";

// Route-segment error boundary. Catches unhandled runtime errors inside
// the root layout's children. Must be a Client Component per Next.js
// contract so the `reset` callback can re-trigger rendering.

import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalRouteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Surface the error to the browser console so it shows up in logs
    // even when the UI catches it.
    console.error("[ticoblockchain] route error:", error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex-grow px-4 sm:px-6 md:px-12 py-20 max-w-5xl mx-auto w-full"
    >
      <section className="border-l-8 border-secondary pl-6 animate-slide-left">
        <span className="mono-data text-secondary font-bold tracking-widest text-xs uppercase">
          Error de transmisión
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary">
          SEÑAL
          <br />
          INTERRUMPIDA
        </h1>
        <p className="mt-6 text-base sm:text-xl max-w-2xl font-medium text-on-surface-variant">
          Algo falló mientras intentábamos cargar esta sección. Puedes
          reintentarlo o volver a la página principal.
        </p>

        {error.digest && (
          <p className="mt-4 mono-data text-xs uppercase tracking-widest text-primary/50">
            Código de referencia: {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="bg-primary text-on-primary px-8 py-4 font-display font-bold uppercase tracking-widest text-xs btn-shine hover:bg-primary-container transition-colors duration-200 min-h-[48px]"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="border-2 border-primary text-primary px-8 py-4 font-display font-bold uppercase tracking-widest text-xs hover:bg-surface-container-high transition-colors duration-200 min-h-[48px] inline-flex items-center"
          >
            Ir al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
