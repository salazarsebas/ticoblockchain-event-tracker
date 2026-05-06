// Streaming skeleton for the / route. Mirrors the full-bleed hero region
// (HeroBefore / HeroDuring / HeroAfter) so the shell appears instantly while
// the server resolves time-derived session data. Static — no client JS.

export default function HomeLoading() {
  return (
    <main id="main" aria-busy="true">
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60dvh] sm:min-h-[75dvh] lg:min-h-[85dvh] bg-primary overflow-hidden">
        {/* Left column — headline + meta strip */}
        <div className="lg:col-span-9 relative flex flex-col p-5 sm:p-8 md:p-12 text-on-primary border-l-8 border-secondary">
          {/* Top mono-data caption */}
          <div className="flex items-center justify-between gap-4 pb-5 border-b-2 border-on-primary/20">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-secondary" aria-hidden="true" />
              <span className="mono-data text-[10px] sm:text-xs font-bold tracking-widest uppercase text-on-primary/60">
                Cargando · TicoBlockchain 2026
              </span>
            </div>
            <span className="label-meta sm:text-xs text-on-primary/40">
              14.05.26 · GMT-6
            </span>
          </div>

          {/* Headline placeholder — matches HeroBefore / HeroDuring scale */}
          <div className="flex-1 flex flex-col justify-center py-10 md:py-14 min-h-[60vh]">
            <div className="h-6 sm:h-7 w-40 bg-on-primary/15 mb-6 md:mb-8 animate-pulse" />
            <div
              className="bg-on-primary/15 animate-pulse"
              style={{
                height: "clamp(4.5rem, 11vw, 10.5rem)",
                width: "min(100%, 22ch)",
              }}
              aria-hidden="true"
            />
            <div className="mt-3 md:mt-5 h-10 sm:h-14 md:h-20 w-32 sm:w-40 md:w-56 bg-secondary/40 animate-pulse" />
          </div>

          {/* Bottom meta band */}
          <div className="mt-auto grid grid-cols-3 gap-0 border-y-2 border-on-primary/20">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`py-3 px-1 ${i < 2 ? "border-r border-on-primary/15" : ""}`}
              >
                <div className="label-meta text-on-primary/40 mb-2">
                  &nbsp;
                </div>
                <div className="h-6 sm:h-8 md:h-10 w-20 sm:w-24 bg-on-primary/15 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Right rail — agenda preview placeholder */}
        <div className="lg:col-span-3 bg-surface-container-low p-5 sm:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-primary/10">
          <div className="h-6 w-40 bg-primary/15 mb-2 animate-pulse" />
          <div className="h-3 w-32 bg-primary/10 mb-6 animate-pulse" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border-l-4 border-primary/20 pl-3 py-2"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="h-3 w-16 bg-primary/15 mb-2 animate-pulse" />
                <div className="h-4 w-3/4 bg-primary/10 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
