const PETALS = [0, 72, 144, 216, 288];
const LEAF = "M0 0C6-11 6-26 0-37C-6-26-6-11 0 0Z";

function Flower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {PETALS.map((angle) => (
        <path
          key={angle}
          d="M0 0C7-7 7-19 0-26C-7-19-7-7 0 0Z"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="4.5" />
    </g>
  );
}

export function FloralMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 280"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M120 268C118 214 118 176 120 132" />
      <path d="M120 232C104 214 92 188 88 156" />
      <path d="M120 236C138 218 150 192 154 158" />

      <path d={LEAF} transform="translate(120 210) rotate(-52)" />
      <path d={LEAF} transform="translate(120 196) rotate(52)" />
      <path d={LEAF} transform="translate(103 214) rotate(-30)" />
      <path d={LEAF} transform="translate(138 216) rotate(30)" />
      <path d={LEAF} transform="translate(120 162) rotate(-72)" />
      <path d={LEAF} transform="translate(120 152) rotate(72)" />

      <Flower x={120} y={108} />
      <Flower x={84} y={134} scale={0.72} />
      <Flower x={156} y={136} scale={0.72} />
    </svg>
  );
}
