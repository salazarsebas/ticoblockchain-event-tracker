import type { Metadata } from "next";
import Image from "next/image";
import {
  getSponsorsByTier,
  TIER_LABELS,
  TIER_ORDER,
  type Sponsor,
  type SponsorTier,
} from "../data/sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Patrocinadores oficiales de TicoBlockchain 2026 — Diamante, Platino, Oro y Plata.",
};

// Per-tier visual treatment. Diamante is the flagship; each subsequent tier
// steps down in size, opacity, and fill weight. Defined once at module scope
// rather than rebuilt on every render.
type TierStyles = {
  wrapper: string;
  indexClasses: string;
  labelClasses: string;
  gridClasses: string;
  tileClasses: string;
  imgClasses: string;
};

const TIER_CONFIG: Record<SponsorTier, TierStyles> = {
  diamante: {
    wrapper: "mb-24 flex flex-col sm:flex-row border-t-4 border-primary pt-8",
    indexClasses:
      "text-6xl sm:text-8xl md:text-9xl font-display font-black text-primary leading-none",
    labelClasses:
      "font-display font-bold text-2xl uppercase tracking-widest text-secondary mt-2",
    gridClasses: "sm:w-3/4 flex flex-wrap gap-4",
    tileClasses:
      "w-full md:flex-1 h-48 sm:h-56 md:h-64 bg-primary flex items-center justify-center p-12 group transition-all duration-300",
    imgClasses:
      "grayscale invert opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all w-full h-full object-contain",
  },
  platino: {
    wrapper:
      "mb-24 flex flex-col sm:flex-row border-t-4 border-primary-container pt-8",
    indexClasses:
      "text-6xl sm:text-8xl md:text-9xl font-display font-black text-primary-container leading-none",
    labelClasses:
      "font-display font-bold text-2xl uppercase tracking-widest text-primary-container mt-2",
    gridClasses:
      "sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4",
    tileClasses:
      "h-40 sm:h-48 md:h-56 bg-primary-container flex items-center justify-center p-10 group transition-all duration-300",
    imgClasses:
      "grayscale invert opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all w-full h-full object-contain",
  },
  oro: {
    wrapper:
      "mb-24 flex flex-col sm:flex-row border-t-2 border-outline-variant pt-8",
    indexClasses:
      "text-5xl sm:text-7xl md:text-8xl font-display font-black text-primary/40 leading-none",
    labelClasses:
      "font-display font-bold text-xl uppercase tracking-widest text-primary mt-2",
    gridClasses:
      "sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
    tileClasses:
      "h-32 sm:h-36 md:h-40 border-2 border-primary flex items-center justify-center p-8 bg-surface-container-low grayscale hover:grayscale-0 transition-all",
    imgClasses: "max-h-full object-contain",
  },
  plata: {
    wrapper: "flex flex-col sm:flex-row border-t-2 border-outline-variant pt-8",
    indexClasses:
      "text-4xl sm:text-6xl md:text-7xl font-display font-black text-primary/20 leading-none",
    labelClasses:
      "font-display font-bold text-lg uppercase tracking-widest text-primary/60 mt-2",
    gridClasses:
      "sm:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4",
    tileClasses:
      "h-24 sm:h-28 md:h-32 bg-surface-container-lowest border border-outline-variant flex items-center justify-center p-6 opacity-60 hover:opacity-100 transition-opacity",
    imgClasses: "max-h-full object-contain",
  },
};

export default function SponsorsPage() {
  return (
    <main id="main" className="pb-20">
      <section className="px-4 sm:px-6 md:px-12 bg-white py-24">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-primary mb-10 sm:mb-16 md:mb-20 animate-reveal-up">
          SPONSORS
        </h1>

        {TIER_ORDER.map((tier, tierIndex) => {
          const sponsors = getSponsorsByTier(tier);
          if (sponsors.length === 0) return null;
          const stagger = `stagger-${Math.min(tierIndex * 2 + 1, 7)}`;
          return (
            <TierBlock
              key={tier}
              tier={tier}
              sponsors={sponsors}
              staggerClass={stagger}
            />
          );
        })}
      </section>
    </main>
  );
}

type TierBlockProps = {
  tier: SponsorTier;
  sponsors: Sponsor[];
  staggerClass: string;
};

function TierBlock({ tier, sponsors, staggerClass }: TierBlockProps) {
  const { index, label } = TIER_LABELS[tier];
  const styles = TIER_CONFIG[tier];

  return (
    <div className={`${styles.wrapper} animate-fade-up ${staggerClass}`}>
      <div className="sm:w-1/4 mb-6 sm:mb-0">
        <div className={styles.indexClasses}>{index}</div>
        <div className={styles.labelClasses}>{label}</div>
      </div>
      <div className={styles.gridClasses}>
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className={styles.tileClasses}>
            <Image
              src={sponsor.logoUrl}
              alt={sponsor.name}
              width={400}
              height={200}
              sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
              className={styles.imgClasses}
            />
            <span className="sr-only">{sponsor.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
