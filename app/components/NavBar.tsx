"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const navLinks = [
  { href: "/", label: "EN VIVO" },
  { href: "/agenda", label: "AGENDA" },
  { href: "/exponentes", label: "EXPONENTES" },
  { href: "/mapa", label: "MAPA" },
  { href: "/sponsors", label: "SPONSORS" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Reset the mobile menu whenever the route changes — the canonical
  // "adjusting state during render" pattern (avoids cascading effect renders).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  function isActive(link: (typeof navLinks)[number]) {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <Link
          href="/"
          className="text-lg sm:text-2xl font-black tracking-tighter text-primary font-display uppercase"
        >
          TicoBlockchain 2026
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={
                isActive(link)
                  ? "text-secondary font-black border-b-4 border-secondary font-display uppercase tracking-tight text-sm px-2 py-1"
                  : "text-primary font-bold hover:bg-primary-container hover:text-on-primary transition-colors duration-100 font-display uppercase tracking-tight text-sm px-2 py-1"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="#registro"
            className="bg-primary-container text-on-primary px-4 py-3 sm:px-6 sm:py-2 text-xs sm:text-sm font-bold font-display uppercase tracking-tight hover:opacity-90 transition-opacity min-h-[48px] flex items-center"
          >
            REGISTRO
          </Link>

          <button
            type="button"
            className="md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center border-2 border-primary bg-transparent text-primary"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Menú de navegación"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden flex flex-col border-t-2 border-primary bg-surface animate-menu-slide-down"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={
                isActive(link)
                  ? "px-6 py-4 border-b border-primary/10 font-display font-black uppercase tracking-tight text-sm text-secondary bg-surface"
                  : "px-6 py-4 border-b border-primary/10 font-display font-bold uppercase tracking-tight text-sm text-primary hover:bg-primary-container hover:text-on-primary transition-colors duration-100"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
