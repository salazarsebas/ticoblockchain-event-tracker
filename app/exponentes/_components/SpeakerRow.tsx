import Image from "next/image";
import { stageLabel, stageShort } from "../../data/venue";
import StatusBadge from "../../components/StatusBadge";
import type { SpeakerAppearance } from "../_lib/groupSpeakers";

type SpeakerRowProps = {
  appearance: SpeakerAppearance;
  staggerClass?: string;
};

// Flatten the appearance discriminator into a single shape so the JSX below
// doesn't have to branch — panels reuse the lead speaker's portrait and
// surface the talk topic in the headline slot instead of a single name.
function readMeta(appearance: SpeakerAppearance) {
  if (appearance.kind === "solo") {
    return {
      status: appearance.speaker.status,
      stage: appearance.speaker.stage,
      time: appearance.speaker.time,
      lead: appearance.speaker,
      headline: appearance.speaker.name,
      subline: appearance.speaker.org,
      panelCount: 0,
    };
  }
  const lead = appearance.speakers[0];
  return {
    status: appearance.status,
    stage: appearance.stage,
    time: appearance.time,
    lead,
    headline: `Panel: ${lead.talk.replace(/ \(.*\)$/, "")}`,
    subline: `${appearance.speakers.length} ponentes`,
    panelCount: appearance.speakers.length,
  };
}

export default function SpeakerRow({ appearance, staggerClass }: SpeakerRowProps) {
  const meta = readMeta(appearance);
  const isLive = meta.status === "live";
  const isPast = meta.status === "past";
  const isPanel = meta.panelCount > 0;
  const isTBD = meta.time === "Por anunciar";

  const rootClasses = [
    "group relative flex items-stretch gap-3 px-3 py-3 bg-surface-container-low border-l-4 transition-colors duration-150 animate-fade-up",
    isLive ? "border-secondary animate-border-breathe" : "border-transparent",
    isPast ? "opacity-60" : "",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClasses}>
      {/* Square thumbnail — 80px keeps the editorial portrait recognisable
          while shrinking the card footprint by ~10× vs the full hero card. */}
      <div
        className={`relative w-20 h-20 shrink-0 bg-surface-container-highest overflow-hidden ${
          meta.lead.monochrome ? "grayscale" : ""
        }`}
      >
        <Image
          src={meta.lead.imageUrl}
          alt={meta.lead.name}
          fill
          sizes="80px"
          quality={85}
          unoptimized={!meta.lead.imageUrl.startsWith("/")}
          className="object-cover"
        />
        {meta.panelCount > 1 && (
          <span className="absolute bottom-0 right-0 bg-primary text-on-primary px-1.5 py-0.5 mono-data text-[9px] font-bold leading-none">
            +{meta.panelCount - 1}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">
        <div className="flex items-center gap-2 min-w-0">
          <StatusBadge status={meta.status} size="sm" />
          {isPanel && (
            <span className="mono-data text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest bg-primary-container text-on-primary-container shrink-0">
              Panel
            </span>
          )}
          {isTBD && (
            <span className="mono-data text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest border-2 border-outline-variant text-on-surface-variant shrink-0">
              Por anunciar
            </span>
          )}
        </div>

        <h3 className="font-display font-black uppercase tracking-tighter text-primary text-base sm:text-lg leading-[1.05] line-clamp-2">
          {meta.headline}
        </h3>

        <p className="label-meta text-[10px] font-bold text-on-primary-container line-clamp-1">
          {meta.subline}
        </p>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <span
            className={`mono-data font-bold tracking-tight ${
              isTBD
                ? "text-on-surface-variant/60 text-xs italic"
                : "text-primary text-sm"
            }`}
          >
            {meta.time}
          </span>
          <span
            className="label-meta text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary shrink-0"
            title={stageLabel(meta.stage)}
          >
            {stageShort(meta.stage)}
          </span>
        </div>
      </div>
    </article>
  );
}
