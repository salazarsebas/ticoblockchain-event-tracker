"use client";

// Development-only banner that appears when the ?now= URL override is active,
// so QA doesn't forget the page is frozen to a simulated moment. Click "SALIR"
// to drop the query param and return to real time.

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type DevTimeBannerProps = {
  simulated: string;
};

export default function DevTimeBanner({ simulated }: DevTimeBannerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Preserve other query params (e.g. ?stage=main) when exiting simulation.
  const cleared = new URLSearchParams(searchParams);
  cleared.delete("now");
  const exitHref = cleared.toString()
    ? `${pathname}?${cleared.toString()}`
    : pathname;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-50 bg-secondary text-on-secondary px-4 py-3 shadow-lg border-2 border-on-secondary/20 flex items-center gap-3 mono-data text-[11px] uppercase tracking-widest font-bold"
    >
      <span>HORA SIMULADA · {simulated}</span>
      <Link
        href={exitHref}
        className="border border-on-secondary px-2 py-1 hover:bg-on-secondary hover:text-secondary transition-colors"
      >
        SALIR
      </Link>
    </div>
  );
}
