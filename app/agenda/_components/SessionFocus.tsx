"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Reads the URL hash on mount, on every in-page hashchange, and on every
// Next.js navigation that lands on this page. When the hash points at a
// session anchor (id="session-…"), opens any collapsed <details> inside
// the card, smooth-scrolls into view, and applies a brief pulse class so
// the user sees where they landed.
//
// Why a regex on the hash: when Next.js navigates from /sponsors to
// /agenda#session-X after the agenda page is already in the router
// cache, the URL can come out malformed with the new hash appended
// to the previous one — e.g. `/agenda#session-tether-brindis#session-
// coffee-break` after two different sponsor clicks. We extract every
// `session-…` substring and take the LAST one so the latest click
// wins, regardless of leftover hash from a prior visit.
//
// Why usePathname as a dep: even with the hashchange listener, going
// /sponsors → /agenda#X → /sponsors → /agenda#X may not fire hashchange
// (path also changed). Re-running the effect on every navigation
// guarantees the focus logic runs again.
export default function SessionFocus() {
  const pathname = usePathname();

  useEffect(() => {
    const PULSE_CLASS = "animate-session-pulse";
    const PULSE_MS = 2600;
    let pulseTimeout: ReturnType<typeof setTimeout> | null = null;

    function focusFromHash() {
      const matches = window.location.hash.match(/session-[A-Za-z0-9-]+/g);
      if (!matches || matches.length === 0) return;
      const id = matches[matches.length - 1];

      const el = document.getElementById(id);
      if (!el) return;

      const details = el.querySelector("details");
      if (details && !details.open) details.open = true;

      // Wait one frame so the open <details> has laid out before we
      // measure. On a cold load the browser already auto-scrolled to the
      // anchor; this smooth call lands at the same spot and is a near
      // no-op. On client-side navigation Next.js does NOT auto-scroll,
      // so this is what gets the row into view.
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      // Remove + reflow + re-add so repeat hits to the same anchor
      // replay the animation instead of being silent.
      el.classList.remove(PULSE_CLASS);
      void el.offsetWidth;
      el.classList.add(PULSE_CLASS);

      if (pulseTimeout) clearTimeout(pulseTimeout);
      pulseTimeout = setTimeout(() => {
        el.classList.remove(PULSE_CLASS);
      }, PULSE_MS);
    }

    focusFromHash();
    window.addEventListener("hashchange", focusFromHash);
    return () => {
      window.removeEventListener("hashchange", focusFromHash);
      if (pulseTimeout) clearTimeout(pulseTimeout);
    };
  }, [pathname]);

  return null;
}
