"use client";

import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (event.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
