import type { Metadata } from "next";
import { resolveNow } from "../data/now";
import EnVivoView from "../_views/EnVivoView";

// Dev-only mirror of `/` that supports the `?now=<ISO-8601>` time-travel
// hook for QA. Reading `searchParams` forces dynamic rendering, which is
// exactly what we want here — the public route stays static.
//
// `resolveNow` itself ignores `?now=` in production (see app/data/now.ts),
// so even if someone hits /dev?now=… on the live site, they just get the
// real current time. The route exists; the override only resolves in dev.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function EnVivoDevPage({
  searchParams,
}: {
  searchParams: Promise<{ now?: string | string[] }>;
}) {
  const { now, simulated } = resolveNow((await searchParams).now);
  return <EnVivoView now={now} simulated={simulated} />;
}
