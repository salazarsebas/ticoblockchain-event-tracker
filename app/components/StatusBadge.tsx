import type { SessionStatus } from "../data/types";

type StatusBadgeProps = {
  status: SessionStatus;
  size?: "sm" | "md";
};

const LABELS: Record<SessionStatus, string> = {
  live: "EN VIVO",
  next: "SIGUIENTE",
  scheduled: "PROGRAMADO",
  past: "FINALIZADO",
};

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const padding = size === "sm" ? "px-2 py-0.5" : "px-3 py-1";
  const textSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  if (status === "live") {
    return (
      <span
        className={`bg-secondary text-on-secondary mono-data ${textSize} ${padding} font-bold uppercase animate-live-glow`}
      >
        {LABELS.live}
      </span>
    );
  }
  if (status === "next") {
    return (
      <span
        className={`bg-primary text-on-primary mono-data ${textSize} ${padding} font-bold uppercase`}
      >
        {LABELS.next}
      </span>
    );
  }
  if (status === "past") {
    return (
      <span
        className={`border-2 border-primary/20 text-primary/40 mono-data ${textSize} ${padding} font-bold uppercase`}
      >
        {LABELS.past}
      </span>
    );
  }
  return (
    <span
      className={`border-2 border-primary text-primary mono-data ${textSize} ${padding} font-bold uppercase`}
    >
      {LABELS.scheduled}
    </span>
  );
}
