const items = [
  "Bunga Segar Setiap Hari",
  "Rangkaian Custom",
  "Dikirim Hari Sama",
  "Kartu Ucapan Gratis",
  "Dekorasi Wedding",
  "Buket & Standing Flower",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-brand/10 bg-brand py-4 text-cream">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 text-xs font-medium uppercase tracking-[0.25em] text-cream/80"
          >
            {item}
            <span
              aria-hidden="true"
              className={index % 2 === 0 ? "text-blush" : "text-sprout"}
            >
              &#10047;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
