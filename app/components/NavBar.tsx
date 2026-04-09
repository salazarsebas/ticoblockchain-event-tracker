"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "EN VIVO" },
  { href: "/agenda", label: "AGENDA" },
  { href: "/exponentes", label: "EXPONENTES" },
  { href: "/mapa", label: "MAPA" },
  { href: "/sponsors", label: "SPONSORS" },
];

export default function NavBar() {
  const pathname = usePathname();

  function isActive(link: (typeof navLinks)[number]) {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fbf9f5] flex justify-between items-center px-6 py-4">
      <Link
        href="/"
        className="text-2xl font-black tracking-tighter text-[#000d33] font-headline uppercase"
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
                ? "text-[#ba002e] font-black border-b-4 border-[#ba002e] font-headline uppercase tracking-tight text-sm px-2 py-1"
                : "text-[#000d33] font-bold hover:bg-[#002060] hover:text-white transition-colors duration-100 font-headline uppercase tracking-tight text-sm px-2 py-1"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="#registro"
        className="bg-[#002060] text-white px-6 py-2 font-bold font-headline uppercase tracking-tight hover:opacity-90 transition-opacity"
      >
        REGISTRO
      </Link>
    </nav>
  );
}
