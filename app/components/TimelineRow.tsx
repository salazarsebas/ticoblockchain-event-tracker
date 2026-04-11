import type { Session } from "../data/types";

type TimelineRowProps = {
  session: Session;
  staggerClass?: string;
  lastItem?: boolean;
};

// Vertical-timeline row for the full agenda page.
// Different visual treatment than DepartureRow: more detail, status-specific styling.
export default function TimelineRow({
  session,
  staggerClass,
  lastItem = false,
}: TimelineRowProps) {
  const isLive = session.status === "live";
  const isPast = session.status === "past";

  const rootClasses = [
    "flex flex-col md:flex-row items-start md:items-center py-8 group animate-fade-up",
    isLive
      ? "py-10 bg-surface-container-low border-l-4 border-secondary animate-border-breathe -mx-4 px-4 sm:-mx-6 sm:px-6 relative"
      : "hover:bg-surface-container-high transition-colors duration-200",
    isPast ? "opacity-40" : "",
    lastItem ? "border-b-2 border-primary" : "",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const timeClasses = [
    "w-auto md:w-24 mono-data font-bold",
    isLive ? "text-2xl font-black text-secondary" : "text-lg sm:text-xl",
  ].join(" ");

  const titleClasses = [
    "font-display font-bold uppercase tracking-tight",
    isLive ? "text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-primary" : "text-2xl",
  ].join(" ");

  const speakerClasses = [
    "font-medium mt-1 uppercase text-sm tracking-wide",
    isLive ? "text-primary font-bold tracking-widest" : "text-on-surface-variant",
  ].join(" ");

  const roomClasses = [
    "text-[10px] font-bold px-3 py-1 uppercase tracking-tighter",
    isLive ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary",
  ].join(" ");

  return (
    <div className={rootClasses}>
      <div className={timeClasses}>{session.time}</div>
      <div className="flex-grow md:ml-12">
        {isLive && (
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-secondary text-on-secondary mono-data text-[10px] font-bold px-2 py-0.5 uppercase animate-live-glow">
              ahora
            </span>
          </div>
        )}
        <div className={titleClasses}>{session.title}</div>
        {session.speakerName && (
          <div className={speakerClasses}>
            {session.speakerName}
            {session.speakerOrg ? ` — ${session.speakerOrg}` : ""}
          </div>
        )}
      </div>
      <div className="mt-4 md:mt-0 w-auto md:w-48 text-left md:text-right">
        <span className={roomClasses}>{session.room}</span>
      </div>
    </div>
  );
}
