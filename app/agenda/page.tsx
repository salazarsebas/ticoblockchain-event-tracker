import type { Metadata } from "next";
import AgendaView from "../_views/AgendaView";

// Static + ISR. The page body lives in AgendaView so the public route can
// be statically prerendered (instant prefetch, no loading.tsx flash). The
// `?stage=main|escenario-2` filter is preserved as a shareable URL but
// applied client-side by AgendaToolbar. `/dev/agenda` mounts the same
// view in a dynamic context for QA time-travel via `?now=<ISO-8601>`.
export const revalidate = 10;

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Cronograma oficial de TicoBlockchain 2026: charlas, paneles y workshops del 14 de mayo en Main Stage y Escenario 2 — Hotel Barceló San José, Costa Rica.",
  alternates: {
    canonical: "/agenda",
  },
};

export default function AgendaPage() {
  return <AgendaView now={new Date()} simulated={null} />;
}
