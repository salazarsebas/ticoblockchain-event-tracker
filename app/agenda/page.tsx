import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TimelineRow from "../components/TimelineRow";
import { SESSIONS } from "../data/sessions";

export const metadata: Metadata = {
  title: "Agenda — TicoBlockchain 2026",
  description: "Cronograma oficial de TicoBlockchain 2026",
};

export default function AgendaPage() {
  return (
    <main
      id="main"
      className="flex-grow pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full"
    >
      {/* Hero Section Header */}
      <section className="mb-16 border-l-8 border-primary pl-6 pt-8 animate-slide-left">
        <span className="mono-data text-secondary font-bold tracking-widest text-sm uppercase">
          Cronograma Oficial
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary">
          AGENDA
          <br />
          DE EVENTOS
        </h1>
        <p className="mt-6 text-base sm:text-xl max-w-2xl font-medium text-on-surface-variant">
          Explora el futuro de Web3 en Costa Rica. Sesiones de alto impacto,
          talleres técnicos y networking de élite — todo en Sala Greco.
        </p>
      </section>

      {/* Vertical Timeline Agenda */}
      <section className="relative overflow-hidden">
        {/* Header for the list */}
        <div className="hidden md:flex border-b-2 border-primary pb-4 mb-4 font-display font-bold uppercase text-xs tracking-widest opacity-50">
          <div className="w-24 shrink-0">Hora</div>
          <div className="flex-grow ml-12">Sesión y Exponente</div>
          <div className="w-48 shrink-0 text-right">Ubicación</div>
        </div>

        {/* List Content */}
        <div className="flex flex-col">
          {SESSIONS.map((session, i) => (
            <TimelineRow
              key={session.id}
              session={session}
              staggerClass={`stagger-${Math.min(i + 1, 7)}`}
              lastItem={i === SESSIONS.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Dynamic Visual Accent */}
      <aside className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        <div className="relative bg-primary-container p-8 text-on-primary min-h-[200px] sm:min-h-[300px] flex flex-col justify-end overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Tmh4SB2EcX86Qgc6vqq441-Kusu1Uw6fHWGTN9RSWCh4_XXrBK-eYQNG3M9qS9gt_ik6aqj40Vr7Ke8zKRtJwscdfQpzTSxvxX-05AaesFfVAHiiMFmydT73zKvMqjHyE0yhDWmyYWpyrNUgWf0gIOh_DRCMWbiGLz_ubojXszEudaABlXsOuqq_WLnXIVQP2sS7CAvZgVECWG-OVz03EyHTrii3V6JYdRyYxKE7zB5sq4WpeJ10aXdPE-_rKxtE-SQtAIRTqtk"
            alt="Abstract digital blocks and light trails representing blockchain structure"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover mix-blend-overlay opacity-30"
          />
          <div className="relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-none mb-4">
              ¿Te perdiste algo?
            </h3>
            <p className="mono-data text-sm uppercase tracking-widest text-on-primary-container">
              Las grabaciones estarán disponibles para todos los registrados 48h
              después del cierre.
            </p>
          </div>
        </div>
        <div className="bg-surface-container-highest p-8 flex flex-col justify-between border-2 border-primary">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-4 text-primary">
              Información de Sede
            </h3>
            <p className="text-on-surface-variant">
              Hotel Barceló San José Palacio. Ubicado estratégicamente cerca del
              centro de la capital.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/mapa"
              className="inline-flex items-center gap-2 font-display font-bold uppercase border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all text-primary"
            >
              Ver Mapa Completo
              <span className="material-symbols-outlined">north_east</span>
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}
