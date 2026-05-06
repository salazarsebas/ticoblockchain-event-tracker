export default function Footer() {
  return (
    <footer className="bg-primary text-surface w-full py-6 sm:py-8 px-4 sm:px-6 mt-auto flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="text-lg font-bold text-surface font-display uppercase tracking-tight">
          TICOBLOCKCHAIN 2026
        </div>
        <div className="label-meta text-xs opacity-80 text-center md:text-right">
          © 2026 TICOBLOCKCHAIN | HOTEL BARCELÓ SAN JOSÉ · 14 MAYO
        </div>
      </div>
      <div className="label-meta text-base opacity-80 text-center">
        Hecho con{" "}
        <span
          aria-hidden
          className="inline-block align-middle text-secondary text-2xl leading-none animate-heartbeat"
        >
          ❤️
        </span>
        <span className="sr-only">amor</span> por{" "}
        <a
          href="https://www.instagram.com/websites_by_ger?igsh=azk3cGVhN2pnOWpz&utm_source=qr"
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
