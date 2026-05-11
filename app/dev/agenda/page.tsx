import type { Metadata } from "next";
import { resolveNow } from "../../data/now";
import AgendaView from "../../_views/AgendaView";

// Dev-only mirror of `/agenda` that supports the `?now=<ISO-8601>` time-
// travel hook for QA. `resolveNow` ignores `?now=` in production (see
// app/data/now.ts), so this route is a no-op replica on the live site.
//
// Note: the `?stage=` filter still works here exactly like on `/agenda`
// because AgendaToolbar's client-side filter doesn't care which route
// rendered the view.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AgendaDevPage({
  searchParams,
}: {
  searchParams: Promise<{ now?: string | string[] }>;
}) {
  const { now, simulated } = resolveNow((await searchParams).now);
  return <AgendaView now={now} simulated={simulated} />;
}
