const BUILDER_INSTAGRAM =
  "https://www.instagram.com/websites_by_ger?igsh=azk3cGVhN2pnOWpz&utm_source=qr";

export default function Footer() {
  return (
    <footer className="bg-primary text-surface w-full py-6 sm:py-8 px-4 sm:px-6 mt-auto flex flex-col gap-5">
      {/* Order: brand → TBC → heart on mobile (builder credit leads), but
          TBC → brand → heart on tablet+ (event branding leads the row).
          Heart line stays last on every breakpoint. */}
      <div className="order-2 md:order-1 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="text-lg font-bold text-surface font-display uppercase tracking-tight">
          TICOBLOCKCHAIN 2026
        </div>
        <div className="label-meta text-xs opacity-80 text-center md:text-right">
          © 2026 TICOBLOCKCHAIN | HOTEL BARCELÓ SAN JOSÉ · 14 MAYO
        </div>
      </div>

      {/* Builder credit — wordmark + tagline. Linked to the same Instagram
          handle as the heart watermark below; surfaced more prominently so
          the developer attribution doesn't get lost in scroll. */}
      <a
        href={BUILDER_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="order-1 md:order-2 group flex flex-col items-center gap-1 text-center hover:text-secondary transition-colors duration-200"
        aria-label="Websites by Ger — sitio diseñado por @websites_by_ger en Instagram"
      >
        <span className="font-display font-black uppercase tracking-tighter text-xl sm:text-2xl">
          WEBSITES BY GER
        </span>
        <span className="label-meta text-[10px] opacity-70">
          Sitios web para profesionales y emprendedores · Costa Rica
        </span>
      </a>

      <div className="order-3 label-meta text-sm opacity-70 text-center">
        Hecho con{" "}
        <span
          aria-hidden
          className="inline-block align-middle text-secondary text-lg leading-none animate-heartbeat"
        >
          ❤️
        </span>
        <span className="sr-only">amor</span> por{" "}
        <a
          href={BUILDER_INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-secondary transition-colors duration-200"
        >
          @websites_by_ger
        </a>
      </div>
    </footer>
  );
}
