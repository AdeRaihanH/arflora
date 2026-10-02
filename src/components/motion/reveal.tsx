"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: RevealProps) {
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
            { autoAlpha: 0, y },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              delay,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        }, el);
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
