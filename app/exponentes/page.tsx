import type { Metadata } from "next";
import { Suspense } from "react";
import DevTimeBanner from "../components/DevTimeBanner";
import LiveRefresh from "../components/LiveRefresh";
import { resolveNow } from "../data/now";
import { SPEAKERS } from "../data/speakers";
import { getNextTransitionAt } from "../lib/session-time";
import { MAX_STAGGER_LEVEL } from "../lib/stagger";
import SpeakerCard from "./_components/SpeakerCard";
import SpeakerRow from "./_components/SpeakerRow";
import { groupAppearances, type SpeakerAppearance } from "./_lib/groupSpeakers";
import { applyLiveStatus } from "./_lib/speakerStatus";

export const metadata: Metadata = {
  title: "Exponentes",
  description:
    "Conoce a los exponentes confirmados de TicoBlockchain 2026 — keynotes, paneles y charlas el 14 de mayo en Hotel Barceló San José, Costa Rica.",
  alternates: {
    canonical: "/exponentes",
  },
};

// Editorial hero treatment is reserved for the moments people care about most
// — anyone live right now plus the next two slots about to take the stage.
// Pre-event we promote the first two scheduled appearances so the page still
// has an anchor; post-event there's nothing to feature and `rest` carries
// the full lineup as compact rows.
const FEATURED_NEXT_LIMIT = 2;

function statusOf(a: SpeakerAppearance) {
  return a.kind === "solo" ? a.speaker.status : a.status;
}

function appearanceKey(a: SpeakerAppearance): string {
  return a.kind === "solo"
    ? `solo|${a.speaker.id}`
    : `panel|${a.speakers.map((s) => s.id).join("+")}`;
}

function partitionAppearances(appearances: SpeakerAppearance[]): {
  featured: SpeakerAppearance[];
  rest: SpeakerAppearance[];
  featuredKind: "live-or-next" | "scheduled-fallback" | "none";
} {
  const live = appearances.filter((a) => statusOf(a) === "live");
  const next = appearances
    .filter((a) => statusOf(a) === "next")
    .slice(0, FEATURED_NEXT_LIMIT);
  let featured = [...live, ...next];
  let featuredKind: "live-or-next" | "scheduled-fallback" | "none" =
    featured.length > 0 ? "live-or-next" : "none";

  if (featured.length === 0) {
    featured = appearances
      .filter((a) => statusOf(a) === "scheduled")
      .slice(0, FEATURED_NEXT_LIMIT);
    featuredKind = featured.length > 0 ? "scheduled-fallback" : "none";
  }

  const featuredKeys = new Set(featured.map(appearanceKey));
  const rest = appearances.filter((a) => !featuredKeys.has(appearanceKey(a)));
  return { featured, rest, featuredKind };
}

function featuredHeading(
  kind: "live-or-next" | "scheduled-fallback" | "none",
  hasLive: boolean,
): string {
  if (kind === "scheduled-fallback") return "Abren el día";
  if (kind === "live-or-next") return hasLive ? "En vivo · A continuación" : "A continuación";
  return "";
}

export default async function ExponentesPage({
  searchParams,
}: {
  searchParams: Promise<{ now?: string | string[] }>;
}) {
  const { now, simulated } = resolveNow((await searchParams).now);
  const liveSpeakers = applyLiveStatus(SPEAKERS, now);
  const nextTransitionAt = getNextTransitionAt(now);
  const appearances = groupAppearances(liveSpeakers);
  const totalSpeakers = liveSpeakers.length;
  const panelCount = appearances.filter((a) => a.kind === "panel").length;

  const { featured, rest, featuredKind } = partitionAppearances(appearances);
  const hasLive = featured.some((a) => statusOf(a) === "live");
  const featuredLabel = featuredHeading(featuredKind, hasLive);

  return (
    <main id="main" className="pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
      <LiveRefresh
        nextTransitionAt={nextTransitionAt}
        simulated={simulated !== null}
      />
      {simulated && (
        <Suspense fallback={null}>
          <DevTimeBanner simulated={simulated} />
        </Suspense>
      )}

      {/* Hero */}
      <section className="mb-10 border-l-8 border-primary pl-6 pt-8 animate-slide-left">
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
        <div className="mt-6 flex flex-wrap items-center gap-3 label-meta font-bold">
          <span className="bg-primary text-on-primary px-3 py-1">
            {totalSpeakers} voces
          </span>
          <span className="bg-surface-container-highest text-primary px-3 py-1">
            {panelCount} paneles
          </span>
          <span className="bg-surface-container-highest text-primary px-3 py-1">
            2 escenarios
          </span>
        </div>
        <p className="mt-5 text-base sm:text-lg max-w-2xl font-medium text-on-surface-variant">
          Las personas que van a tomar el micrófono el 14 de mayo. Ordenadas por
          próxima aparición.
        </p>
      </section>

      {/* Featured — full editorial cards for live + next-up speakers, so the
          live-tracker emphasis lands at the top of the screen on every device. */}
      {featured.length > 0 && (
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`w-1.5 h-1.5 shrink-0 ${hasLive ? "bg-secondary" : "bg-primary"}`}
              aria-hidden="true"
            />
            <span
              className={`mono-data font-bold tracking-widest text-xs sm:text-sm uppercase ${
                hasLive ? "text-secondary" : "text-primary"
              }`}
            >
              {featuredLabel}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featured.map((appearance, i) => (
              <SpeakerCard
                key={appearanceKey(appearance)}
                appearance={appearance}
                staggerClass={`stagger-${Math.min(i + 1, MAX_STAGGER_LEVEL)}`}
                priority={i === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Rest of the lineup — section header anchors the change in cadence. */}
      {rest.length > 0 && (
        <section>
          <div className="mb-5 flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 bg-primary shrink-0"
              aria-hidden="true"
            />
            <span className="mono-data text-primary font-bold tracking-widest text-xs sm:text-sm uppercase">
              {featured.length > 0
                ? `Cartel completo · ${rest.length} más`
                : `Cartel completo · ${rest.length} voces`}
            </span>
          </div>

          {/* Mobile: compact rows. Tap-target height ~104px (80px portrait
              + 12px padding × 2), well over the 44px minimum. The grid below
              is hidden on the same breakpoint so each appearance only paints
              once visually; the duplicate React tree exists in the DOM but
              its lazy <Image> elements never load while their container is
              display:none. */}
          <div className="flex flex-col gap-2 sm:hidden">
            {rest.map((appearance, i) => (
              <SpeakerRow
                key={`row-${appearanceKey(appearance)}`}
                appearance={appearance}
                staggerClass={`stagger-${Math.min(i + 1, MAX_STAGGER_LEVEL)}`}
              />
            ))}
          </div>

          {/* Tablet/desktop: keep the existing card grid — there's enough
              horizontal real estate that scrolling 28 viewports isn't a
              problem and the editorial impact reads better. */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {rest.map((appearance, i) => (
              <SpeakerCard
                key={`card-${appearanceKey(appearance)}`}
                appearance={appearance}
                staggerClass={`stagger-${Math.min(i + 1, MAX_STAGGER_LEVEL)}`}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
