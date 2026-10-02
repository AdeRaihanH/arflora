"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Parallax({
  children,
  className = "",
  speed = 0.18,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
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
            { yPercent: speed * 100 },
            {
              yPercent: -speed * 100,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }, el);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
