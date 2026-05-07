// Streaming skeleton for the /exponentes route. Renders the static hero
// 1:1 with app/exponentes/page.tsx so the swap from skeleton → real page
// leaves the hero in place; only the speaker grid morphs from placeholders
// into the live cards. Without this file the closest Suspense fallback
// would be the root app/loading.tsx, which is themed for the home hero
// and would briefly flash a giant cobalt block on every navigation in.

export default function ExponentesLoading() {
  return (
    <main
      id="main"
      className="pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full"
      aria-busy="true"
    >
      <section className="mb-10 border-l-8 border-primary pl-6 pt-8">
        <span className="mono-data text-secondary font-bold tracking-widest text-sm uppercase">
          Cartelera Oficial · 14 MAYO 2026
        </span>
        <h1
          aria-label="Exponentes 2026"
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary"
        >
          EXPONENTES
          <br />
          <span className="text-secondary">2026</span>
        </h1>
        {/* Counts come from data — placeholder pulses keep the strip's
            footprint without committing to numbers that may differ. */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="h-7 w-24 bg-primary/30 animate-pulse" />
          <div className="h-7 w-24 bg-surface-container-highest animate-pulse" />
          <div className="h-7 w-28 bg-surface-container-highest animate-pulse" />
        </div>
        <p className="mt-5 text-base sm:text-lg max-w-2xl font-medium text-on-surface-variant">
          Las personas que van a tomar el micrófono el 14 de mayo. Ordenadas por
          próxima aparición.
        </p>
      </section>

      {/* Featured section header + 1-2 hero card placeholders. Mirrors the
          partition the real page produces (live + next-up). */}
      <section className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-secondary shrink-0" aria-hidden="true" />
          <div className="h-3 w-44 bg-secondary/40 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <article
              key={i}
              className="flex flex-col bg-surface-container-low border-2 border-transparent animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative w-full aspect-[4/5] bg-surface-container-highest" />
              <div className="flex items-center gap-2 px-5 pt-4">
                <div className="h-5 w-20 bg-primary/20" />
              </div>
              <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
                <div className="h-7 w-3/4 bg-primary/15" />
                <div className="h-3 w-1/2 bg-on-surface-variant/15" />
                <div className="h-4 w-5/6 bg-primary/10" />
                <div className="mt-4 pt-4 border-t-2 border-primary/10 flex items-center justify-between">
                  <div className="h-5 w-28 bg-primary/15" />
                  <div className="h-6 w-12 bg-primary/10" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Rest section — compact rows on mobile, card grid on sm+, matching
          the real page's responsive shape so the swap doesn't reflow. */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-primary shrink-0" aria-hidden="true" />
          <div className="h-3 w-40 bg-primary/30 animate-pulse" />
        </div>

        {/* Row placeholders (mobile only) */}
        <div className="flex flex-col gap-2 sm:hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <article
              key={i}
              className="flex items-stretch gap-3 px-3 py-3 bg-surface-container-low border-l-4 border-transparent animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-20 h-20 shrink-0 bg-surface-container-highest" />
              <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">
                <div className="h-4 w-20 bg-primary/15" />
                <div className="h-5 w-3/4 bg-primary/15" />
                <div className="h-3 w-1/2 bg-on-surface-variant/15" />
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="h-4 w-24 bg-primary/15" />
                  <div className="h-5 w-12 bg-primary/10" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Card placeholders (sm+ only) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <article
              key={i}
              className="flex flex-col bg-surface-container-low border-2 border-transparent animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative w-full aspect-[4/5] bg-surface-container-highest" />
              <div className="flex items-center gap-2 px-5 pt-4">
                <div className="h-5 w-20 bg-primary/20" />
              </div>
              <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
                <div className="h-7 w-3/4 bg-primary/15" />
                <div className="h-3 w-1/2 bg-on-surface-variant/15" />
                <div className="h-4 w-5/6 bg-primary/10" />
                <div className="mt-4 pt-4 border-t-2 border-primary/10 flex items-center justify-between">
                  <div className="h-5 w-28 bg-primary/15" />
                  <div className="h-6 w-12 bg-primary/10" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
