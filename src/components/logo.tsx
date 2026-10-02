export function ButterflyEmblemMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {/* Background soft circle aura */}
      <circle cx="32" cy="32" r="30" fill="var(--color-cream)" stroke="var(--color-brand)" strokeWidth="1" strokeOpacity="0.25" />

      {/* Symmetrical Butterfly Wings formed of floral petals */}
      {/* Left Wing */}
      <g transform="translate(32, 28) scale(1, 1)">
        {/* Upper Left Wing */}
        <path
          d="M-2 -2 C-14 -18 -26 -16 -28 -4 C-30 6 -20 14 -2 8 Z"
          fill="var(--color-accent-soft)"
          stroke="var(--color-brand)"
          strokeWidth="1.2"
        />
        {/* Lower Left Wing */}
        <path
          d="M-2 6 C-18 10 -24 20 -18 26 C-12 30 -4 20 -2 12 Z"
          fill="var(--color-accent-soft)"
          stroke="var(--color-brand)"
          strokeWidth="1.2"
        />
        {/* Wing internal floral blossoms */}
        <circle cx="-16" cy="-4" r="3.2" fill="var(--color-accent)" />
        <circle cx="-22" cy="2" r="2.5" fill="var(--color-accent)" />
        <circle cx="-14" cy="16" r="2.8" fill="var(--color-accent)" />
        <circle cx="-16" cy="-4" r="1.2" fill="var(--color-gold)" />
      </g>

      {/* Right Wing */}
      <g transform="translate(32, 28) scale(-1, 1)">
        {/* Upper Right Wing */}
        <path
          d="M-2 -2 C-14 -18 -26 -16 -28 -4 C-30 6 -20 14 -2 8 Z"
          fill="var(--color-accent-soft)"
          stroke="var(--color-brand)"
          strokeWidth="1.2"
        />
        {/* Lower Right Wing */}
        <path
          d="M-2 6 C-18 10 -24 20 -18 26 C-12 30 -4 20 -2 12 Z"
          fill="var(--color-accent-soft)"
          stroke="var(--color-brand)"
          strokeWidth="1.2"
        />
        {/* Wing internal floral blossoms */}
        <circle cx="-16" cy="-4" r="3.2" fill="var(--color-accent)" />
        <circle cx="-22" cy="2" r="2.5" fill="var(--color-accent)" />
        <circle cx="-14" cy="16" r="2.8" fill="var(--color-accent)" />
        <circle cx="-16" cy="-4" r="1.2" fill="var(--color-gold)" />
      </g>

      {/* Central Botanical Flower / Tulip Bud */}
      <path d="M32 30 V46" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 40 C36 38 40 36 38 42" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 42 C28 40 24 38 26 44" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Central Tulip Petal */}
      <path
        d="M32 20 C27 20 25 26 27 34 C29 38 32 40 32 40 C32 40 35 38 37 34 C39 26 37 20 32 20 Z"
        fill="var(--color-accent)"
        stroke="var(--color-brand-dark)"
        strokeWidth="1"
      />
      <path d="M32 20 C30 25 30 33 32 39 C34 33 34 25 32 20 Z" fill="#FFFFFF" fillOpacity="0.4" />

      {/* Butterfly antennae */}
      <path d="M30 18 C27 12 24 10 22 11" stroke="var(--color-brand)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="22" cy="11" r="1.2" fill="var(--color-gold)" />
      <path d="M34 18 C37 12 40 10 42 11" stroke="var(--color-brand)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="42" cy="11" r="1.2" fill="var(--color-gold)" />
    </svg>
  );
}

export function Logo({
  className = "",
  tone = "dark",
  withSubtext = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  withSubtext?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <ButterflyEmblemMark className="h-10 w-10 shrink-0 drop-shadow-xs" />
      <span className="flex flex-col">
        <span
          className={`font-display text-[1.45rem] font-bold leading-none tracking-[0.16em] ${
            tone === "light" ? "text-cream" : "text-brand-dark"
          }`}
        >
          ARFL<span className="text-accent font-black">O</span>RA
        </span>
        {withSubtext && (
          <span
            className={`mt-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.24em] ${
              tone === "light" ? "text-cream/70" : "text-brand/80"
            }`}
          >
            Handmade Florist
          </span>
        )}
      </span>
    </span>
  );
}
