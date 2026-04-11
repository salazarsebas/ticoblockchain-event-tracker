import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mapa",
  description:
    "Mapa interactivo del recinto de TicoBlockchain 2026 en el Hotel Barceló San José.",
};

export default function MapaLayout({ children }: { children: ReactNode }) {
  return children;
}
