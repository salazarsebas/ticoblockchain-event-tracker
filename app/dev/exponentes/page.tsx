import type { Metadata } from "next";
import { resolveNow } from "../../data/now";
import ExponentesView from "../../_views/ExponentesView";

// Dev-only mirror of `/exponentes` that supports the `?now=<ISO-8601>`
// time-travel hook for QA. `resolveNow` ignores `?now=` in production
// (see app/data/now.ts), so this route is a no-op replica of the public
// page on the live site.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ExponentesDevPage({
  searchParams,
}: {
  searchParams: Promise<{ now?: string | string[] }>;
}) {
  const { now, simulated } = resolveNow((await searchParams).now);
  return <ExponentesView now={now} simulated={simulated} />;
}
