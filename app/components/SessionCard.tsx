import Link from "next/link";
import type { Session } from "../data/types";
import { stageShort } from "../data/venue";

type SessionCardProps = {
  session: Session;
  variant?: "light" | "dark";
  staggerClass?: string;
};

// Compact session card for the home page sidebar ("Próximas Charlas").
// Links to the full agenda — the sidebar is a teaser that should navigate
// somewhere meaningful instead of showing tappable-looking cards that do
// nothing (UI Pro Max: false affordance).
//
// Two variants: light (white bg) and dark (primary bg) — the last card in
// a stack usually takes the dark variant for visual rhythm.
export default function SessionCard({
  session,
  variant = "light",
  staggerClass,
}: SessionCardProps) {
  const isDark = variant === "dark";

  const cardClasses = [
    "block p-6 animate-fade-up transition-all duration-300 hover-lift",
    isDark
      ? "bg-primary text-on-primary hover:bg-primary-container"
      : "group bg-surface-container-lowest border-b-4 border-primary hover:border-secondary",
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

  const stageLbl = stageShort(session.stage);
  const subText = session.speakerName ?? session.speakerOrg ?? "";
  const href =
    session.stage === "escenario-2"
      ? "/agenda?stage=escenario-2"
      : session.stage === "main"
        ? "/agenda?stage=main"
        : "/agenda";

  return (
    <Link href={href} className={cardClasses} aria-label={`Ver en agenda: ${session.title}`}>
      <div className="flex items-center gap-2 mb-4">
        {!isDark && (
          <span className="w-2 h-2 bg-secondary animate-live-glow" />
        )}
        <span className={labelClasses}>
          {isDark ? stageLbl : `${session.startTime} · ${stageLbl}`}
        </span>
      </div>
      <h4 className={titleClasses}>{session.title}</h4>
      <div className={subLabelClasses}>{subText}</div>
    </Link>
  );
}
