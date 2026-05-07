// Streaming skeleton for the /agenda route. Because the page reads
// async searchParams it's dynamically rendered — this shell appears
// instantly while the filtered session list renders on the server.

export default function AgendaLoading() {
  return (
    <main
      id="main"
      className="flex-grow pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full"
      aria-busy="true"
    >
      {/* Hero header skeleton */}
      <section className="mb-16 border-l-8 border-primary pl-6 pt-8">
        <div className="mono-data text-secondary font-bold tracking-widest text-sm uppercase">
          Cronograma Oficial · 14 MAYO 2026
        </div>
        <h1
          aria-label="Agenda de eventos"
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary"
        >
          AGENDA
          <br />
          DE EVENTOS
        </h1>
        <div className="mt-6 h-6 sm:h-7 w-full max-w-2xl bg-surface-container-high animate-pulse" />
        <div className="mt-3 h-6 sm:h-7 w-3/4 max-w-xl bg-surface-container-high animate-pulse" />
      </section>

      {/* Filter chip skeletons */}
      <section className="mb-8">
        <div className="label-meta text-on-surface-variant mb-3">
          Filtrar por escenario
        </div>
        <div className="flex flex-wrap gap-2">
          {[64, 112, 128].map((w) => (
            <div
              key={w}
              className="h-10 bg-surface-container-high border-2 border-primary/20 animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>
      </section>

      {/* Timeline skeleton rows */}
      <section className="relative">
        <div className="hidden md:flex border-b-2 border-primary pb-4 mb-4 font-display font-bold uppercase text-xs tracking-widest opacity-50 pl-4">
          <div className="w-32 shrink-0">Hora</div>
          <div className="flex-grow ml-12">Sesión y Exponente</div>
          <div className="w-52 shrink-0 text-right">Escenario</div>
        </div>

        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-start md:items-center py-8 border-l-4 border-primary/10 pl-4 animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-32 h-6 bg-surface-container-high" />
              <div className="flex-grow md:ml-12 mt-4 md:mt-0 space-y-3">
                <div className="h-7 w-4/5 bg-surface-container-high" />
                <div className="h-4 w-2/5 bg-surface-container-high" />
              </div>
              <div className="mt-4 md:mt-0 w-52 flex md:justify-end">
                <div className="h-6 w-32 bg-surface-container-high" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
