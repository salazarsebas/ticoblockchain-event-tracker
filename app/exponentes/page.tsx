import type { Metadata } from "next";
import ExponentesView from "../_views/ExponentesView";

// Static + ISR. The page body lives in ExponentesView so the public route
// can be statically prerendered (instant prefetch, no loading.tsx flash)
// while /dev/exponentes runs the same body in a dynamic context for QA
// time-travel via ?now=<ISO-8601>.
export const revalidate = 10;

export const metadata: Metadata = {
  title: "Exponentes",
  description:
    "Conoce a los exponentes confirmados de TicoBlockchain 2026 — keynotes, paneles y charlas el 14 de mayo en Hotel Barceló San José, Costa Rica.",
  alternates: {
    canonical: "/exponentes",
  },
};

export default function ExponentesPage() {
  return <ExponentesView now={new Date()} simulated={null} />;
}
