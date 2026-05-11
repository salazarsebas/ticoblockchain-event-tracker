import EnVivoView from "./_views/EnVivoView";

// Static + ISR. The page body lives in EnVivoView so the public route can
// be statically prerendered (instant prefetch, no loading.tsx flash) while
// /dev runs the same body in a dynamic context for QA time-travel.
//
// `revalidate = 10` keeps the cached HTML fresh within 10s; LiveRefresh
// still calls router.refresh() at exact session-boundary timestamps, so
// the during-event live state stays accurate.
export const revalidate = 10;

export default function EnVivoPage() {
  return <EnVivoView now={new Date()} simulated={null} />;
}
