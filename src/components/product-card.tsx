import Link from "next/link";
import type { Product } from "@/generated/prisma/client";
import { FloralMotif } from "@/components/floral-motif";
import { TiltCard } from "@/components/motion/tilt-card";
import { formatRupiah } from "@/lib/format";

type CardProduct = Pick<
  Product,
  "name" | "slug" | "price" | "imageUrl" | "description"
> & {
  category?: { name: string } | null;
};

export function ProductCard({ product }: { product: CardProduct }) {
  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      <TiltCard className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-brand/10 bg-brand-soft shadow-xs">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FloralMotif className="h-2/3 w-auto text-brand/25" />
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-dark/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="pointer-events-none absolute bottom-4 left-4 translate-y-3 text-sm font-medium text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Lihat detail &rarr;
          </span>

          {product.category?.name && (
            <span className="absolute left-4 top-4 rounded-full border border-brand/10 bg-cream/95 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-brand-dark shadow-xs backdrop-blur">
              {product.category.name}
            </span>
          )}
        </div>
      </TiltCard>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-brand">
          {product.name}
        </h3>
        <span className="shrink-0 text-sm font-semibold text-brand-dark">
          {formatRupiah(product.price)}
        </span>
      </div>
    </Link>
  );
}
