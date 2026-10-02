"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function SplitHeading({
  lines,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inners = Array.from(
      el.querySelectorAll<HTMLElement>("[data-line-inner]"),
    );
    const reset = () => {
      inners.forEach((node) => {
        node.style.transform = "";
        node.style.opacity = "";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reset();
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            inners,
            { yPercent: 118 },
            {
              yPercent: 0,
              duration: 1,
              delay,
              ease: "power4.out",
              stagger: 0.09,
              immediateRender: false,
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            },
          );
        }, el);
      })
      .catch(reset);

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.1em]">
          <span data-line-inner className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
