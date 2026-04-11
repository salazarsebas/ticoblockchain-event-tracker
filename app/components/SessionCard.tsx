import type { Session } from "../data/types";

type SessionCardProps = {
  session: Session;
  variant?: "light" | "dark";
  staggerClass?: string;
};

// Compact session card for the home page sidebar ("Próximas Charlas").
// Two variants: light (white bg) and dark (primary bg) — the last card in
// a stack usually takes the dark variant for visual rhythm.
export default function SessionCard({
  session,
  variant = "light",
  staggerClass,
}: SessionCardProps) {
  const isDark = variant === "dark";

  const cardClasses = [
    "p-6 animate-fade-up",
    isDark
      ? "bg-primary text-on-primary"
      : "group bg-surface-container-lowest border-b-4 border-primary hover:border-secondary transition-all duration-300 cursor-pointer hover-lift",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "mono-data text-[10px] uppercase font-bold tracking-widest",
    isDark ? "text-on-primary/60" : "",
  ].join(" ");

  const titleClasses = [
    "font-display font-bold text-lg leading-tight mb-2",
    isDark
      ? "text-on-primary"
      : "group-hover:text-secondary transition-colors duration-200 text-primary",
  ].join(" ");

  const subLabelClasses = [
    "mono-data text-xs",
    isDark ? "text-on-primary/40 uppercase" : "text-primary/60",
  ].join(" ");

  return (
    <div className={cardClasses}>
      <div className="flex items-center gap-2 mb-4">
        {!isDark && (
          <span className="w-2 h-2 rounded-full bg-secondary animate-live-glow" />
        )}
        <span className={labelClasses}>
          {isDark ? session.room : `${session.time} · ${session.room}`}
        </span>
      </div>
      <h4 className={titleClasses}>{session.title}</h4>
      <div className={subLabelClasses}>
        {session.speakerName ?? ""}
      </div>
    </div>
  );
}
