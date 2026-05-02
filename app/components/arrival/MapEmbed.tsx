"use client";

import { useEffect, useRef, useState } from "react";

type MapEmbedProps = {
  title: string;
  src: string;
};

// Defers mounting the heavy third-party iframe until the section is near
// the viewport, so the home-page LCP isn't blocked on Google Maps payload.
export default function MapEmbed({ title, src }: MapEmbedProps) {
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(() => {
    // Initial-state fallback: if IO isn't available (very old browsers),
    // mount the iframe immediately rather than leaving the placeholder.
    if (typeof window === "undefined") return false;
    return typeof IntersectionObserver === "undefined";
  });

  useEffect(() => {
    if (visible) return;
    if (typeof IntersectionObserver === "undefined") return;

    const node = placeholderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [visible]);

  return (
    <div className="border-2 border-primary bg-primary">
      {visible ? (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[320px] sm:h-[420px] md:h-[480px] block"
        />
      ) : (
        <div
          ref={placeholderRef}
          aria-hidden="true"
          className="w-full h-[320px] sm:h-[420px] md:h-[480px] block flex items-end justify-start p-4"
        >
          <span className="mono-data text-[10px] uppercase tracking-widest font-bold text-on-primary/40">
            Cargando mapa…
          </span>
        </div>
      )}
    </div>
  );
}
