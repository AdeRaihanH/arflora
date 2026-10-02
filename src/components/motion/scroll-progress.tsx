"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
              },
            },
          );
        });
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-accent via-blush to-accent"
    />
  );
}
