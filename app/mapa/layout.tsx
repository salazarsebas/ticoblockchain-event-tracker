import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mapa",
  description:
    "Mapa interactivo del recinto de TicoBlockchain 2026: Sala Greco, Lobby, Escenario 2 y stands en Hotel Barceló San José — encuentra cada espacio del 14 de mayo.",
  alternates: {
    canonical: "/mapa",
  },
};

export default function MapaLayout({ children }: { children: ReactNode }) {
  return children;
}
