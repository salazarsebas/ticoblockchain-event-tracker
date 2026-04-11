import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-surface w-full py-6 sm:py-8 px-4 sm:px-6 mt-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
      <div className="text-lg font-bold text-surface font-display uppercase tracking-tight">
        TICOBLOCKCHAIN 2026
      </div>
      <div className="mono-data text-xs uppercase tracking-widest opacity-80">
        © 2026 TICOBLOCKCHAIN | HOTEL BARCELÓ SAN JOSÉ
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        <Link
          href="#"
          className="mono-data text-xs uppercase tracking-widest text-surface opacity-80 hover:text-secondary transition-colors"
        >
          PRIVACIDAD
        </Link>
        <Link
          href="#"
          className="mono-data text-xs uppercase tracking-widest text-surface opacity-80 hover:text-secondary transition-colors"
        >
          CONTACTO
        </Link>
        <Link
          href="#"
          className="mono-data text-xs uppercase tracking-widest text-surface opacity-80 hover:text-secondary transition-colors"
        >
          PRENSA
        </Link>
      </div>
    </footer>
  );
}
