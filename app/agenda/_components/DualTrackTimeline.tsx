import { MAX_STAGGER_LEVEL } from "../../lib/stagger";
import type { TimeSlot } from "../_lib/groupSessions";
import TimeSlotRow from "./TimeSlotRow";

type DualTrackTimelineProps = {
  slots: TimeSlot[];
};

// Always renders both column headers and passes every slot through to
// TimeSlotRow. The stage filter (?stage=main|escenario-2) is applied
// client-side by AgendaToolbar: it toggles `data-stage-filter` on the
// page wrapper, which CSS rules in globals.css use to collapse the grid
// template from three columns to two; the toolbar also hides the
// non-matching column header via `header.hidden`.
export default function DualTrackTimeline({ slots }: DualTrackTimelineProps) {
  return (
    <section aria-label="Cronograma" className="mt-6">
      {/* Column headers — desktop only */}
      <div
        data-header-grid
        className="hidden md:grid md:grid-cols-[6rem_1fr_1fr] gap-6 border-b-4 border-primary pb-3 mb-4 sticky top-[72px] bg-surface z-20"
      >
        <div className="label-meta font-bold text-on-surface-variant">
          Hora
        </div>
        <div
          data-stage-header="main"
          className="label-meta text-xs font-black text-primary flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-secondary shrink-0" aria-hidden="true" />
          Main Stage
        </div>
        <div
          data-stage-header="escenario-2"
          className="label-meta text-xs font-black text-primary flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-primary shrink-0" aria-hidden="true" />
          Escenario 2
        </div>
      </div>

      <ol role="list" className="flex flex-col">
        {slots.map((slot, i) => (
          <TimeSlotRow
            key={slot.startTime}
            slot={slot}
            staggerClass={`stagger-${Math.min(i + 1, MAX_STAGGER_LEVEL)}`}
          />
        ))}
      </ol>
    </section>
  );
}
