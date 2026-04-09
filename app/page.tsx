export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-surface">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-primary-container">
        <div className="flex items-center gap-4">
          <span className="text-label-md text-on-primary tracking-widest" translate="no">
            TICOBLOCKCHAIN
          </span>
        </div>
        <nav aria-label="Navegación principal" className="flex items-center gap-6">
          <a
            href="#cronograma"
            className="text-label-md text-on-primary/70 hover:text-on-primary transition-[color]"
          >
            CRONOGRAMA
          </a>
          <a
            href="#ponentes"
            className="text-label-md text-on-primary/70 hover:text-on-primary transition-[color]"
          >
            PONENTES
          </a>
          <a
            href="#ubicacion"
            className="text-label-md text-on-primary/70 hover:text-on-primary transition-[color]"
          >
            UBICACIÓN
          </a>
        </nav>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative bg-surface px-8 pt-20 pb-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-block bg-secondary px-3 py-1 text-label-md text-on-secondary tracking-widest"
                translate="no"
              >
                EN VIVO
              </span>
              <span className="text-data-mono text-on-surface-variant">
                2026-04-10 &mdash; San Jos&eacute;, Costa Rica
              </span>
            </div>
            <h1 className="text-display-lg text-primary max-w-4xl text-pretty">
              EL FUTURO DE<br />
              BLOCKCHAIN EN<br />
              COSTA RICA
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-surface-variant font-sans">
              Un evento dedicado a explorar el ecosistema Web3, DeFi y
              la tokenizaci&oacute;n de activos en Centroam&eacute;rica. Conferencias,
              talleres y networking con l&iacute;deres de la industria.
            </p>
            <div className="flex gap-4 mt-10">
              <a
                href="#cronograma"
                className="inline-flex items-center bg-primary-container px-6 py-3 text-label-md text-on-primary tracking-widest hover:bg-primary transition-[background-color]"
              >
                VER CRONOGRAMA
              </a>
              <a
                href="#registro"
                className="inline-flex items-center border-b-2 border-primary px-6 py-3 text-label-md text-primary tracking-widest hover:border-secondary hover:text-secondary transition-[color,border-color]"
              >
                REGISTRARSE
              </a>
            </div>
          </div>
        </section>

        {/* Schedule — "Departure" List */}
        <section id="cronograma" className="bg-surface-container-low px-8 py-16 scroll-mt-16">
          <div className="max-w-5xl">
            <h2 className="text-display-lg text-primary mb-12">CRONOGRAMA</h2>

            <div className="flex flex-col" role="list" aria-label="Cronograma del evento">
              {/* Row 1 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  09:00
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  Apertura y Bienvenida
                </span>
                <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1">
                  SALA A
                </span>
              </div>

              {/* Row 2 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  09:45
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  Tokenizaci&oacute;n de Activos en Am&eacute;rica Latina
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1">
                    SALA A
                  </span>
                  <span className="text-label-md bg-secondary text-on-secondary px-3 py-1" translate="no">
                    EN VIVO
                  </span>
                </span>
              </div>

              {/* Row 3 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  10:30
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  DeFi y el Sistema Financiero Costarricense
                </span>
                <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1">
                  SALA B
                </span>
              </div>

              {/* Row 4 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  11:15
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  Smart Contracts: Casos de Uso Reales
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1">
                    SALA A
                  </span>
                  <span className="text-label-md bg-secondary text-on-secondary px-3 py-1" translate="no">
                    EN VIVO
                  </span>
                </span>
              </div>

              {/* Row 5 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  12:00
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  Regulaci&oacute;n Blockchain en Centroam&eacute;rica
                </span>
                <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1">
                  SALA B
                </span>
              </div>

              {/* Row 6 — Break */}
              <div className="flex items-center gap-6 px-4 py-5 bg-surface-container-highest" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  13:00
                </span>
                <span className="font-display font-semibold text-lg text-on-surface-variant flex-1 min-w-0">
                  Almuerzo y Networking
                </span>
              </div>

              {/* Row 7 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  14:30
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  Taller: Desarrollo de dApps con Solidity
                </span>
                <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1" translate="no">
                  WEB3
                </span>
              </div>

              {/* Row 8 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  16:00
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  Panel: El Futuro de la Identidad Digital
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1">
                    SALA A
                  </span>
                  <span className="text-label-md bg-secondary text-on-secondary px-3 py-1" translate="no">
                    EN VIVO
                  </span>
                </span>
              </div>

              {/* Row 9 */}
              <div className="group flex items-center gap-6 px-4 py-5 hover:bg-surface-container-high transition-[background-color] cursor-pointer" role="listitem">
                <span className="text-data-mono text-on-surface-variant w-28 shrink-0">
                  17:30
                </span>
                <span className="font-display font-semibold text-lg text-primary flex-1 min-w-0">
                  Cierre y Conclusiones
                </span>
                <span className="text-label-md bg-primary-fixed text-on-primary-fixed px-3 py-1">
                  SALA A
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Info Block — Inverted */}
        <section id="ubicacion" className="bg-primary-container px-8 py-16 scroll-mt-16">
          <div className="max-w-5xl flex flex-col gap-12 lg:flex-row lg:gap-20">
            <div className="flex-1">
              <h2 className="text-display-lg text-on-primary mb-6">UBICACI&Oacute;N</h2>
              <p className="text-lg leading-relaxed text-on-primary/70 font-sans">
                Centro de Convenciones de Costa Rica, San Jos&eacute;.
                Acceso directo desde la autopista General Ca&ntilde;as.
              </p>
              <div className="mt-8 flex flex-col gap-2">
                <span className="text-data-mono text-on-primary/60">
                  9.9342&deg;&nbsp;N, 84.0875&deg;&nbsp;W
                </span>
                <span className="text-data-mono text-on-primary/60">
                  10&nbsp;ABR&nbsp;2026 &mdash; 09:00&nbsp;CST
                </span>
              </div>
            </div>
            <div className="flex-1 bg-primary-fixed-dim/20 min-h-64 flex items-center justify-center" aria-label="Mapa del evento" role="img">
              <span className="text-label-md text-on-primary/40">
                MAPA INTERACTIVO
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest px-8 py-10">
        <div className="max-w-5xl flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-label-md text-on-surface-variant tracking-widest" translate="no">
            TICOBLOCKCHAIN 2026
          </span>
          <nav aria-label="Enlaces del pie de página" className="flex gap-6">
            <a
              href="#contacto"
              className="text-label-md text-on-surface-variant hover:text-primary transition-[color]"
            >
              CONTACTO
            </a>
            <a
              href="#patrocinadores"
              className="text-label-md text-on-surface-variant hover:text-primary transition-[color]"
            >
              PATROCINADORES
            </a>
            <a
              href="#conducta"
              className="text-label-md text-on-surface-variant hover:text-primary transition-[color]"
            >
              C&Oacute;DIGO DE CONDUCTA
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
