import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Katalog Bunga",
  description:
    "Jelajahi koleksi buket, standing flower, bunga meja, dan dekorasi wedding dari Arflora.",
};

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>;
}) {
  const { kategori } = await searchParams;

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const activeCategory = kategori
    ? categories.find((c) => c.slug === kategori)
    : undefined;

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(activeCategory ? { categoryId: activeCategory.id } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container className="py-16 sm:py-24">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-brand sm:text-5xl">
          {activeCategory ? activeCategory.name : "Katalog Bunga"}
        </h1>
        <p className="text-sm text-ink-soft">
          {products.length} produk tersedia
          {activeCategory ? ` di kategori ${activeCategory.name}` : ""}.
        </p>
      </header>

      <nav aria-label="Filter kategori" className="mt-10 flex flex-wrap items-center gap-2.5">
        <Link
          href="/katalog"
          aria-current={!activeCategory ? "page" : undefined}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            !activeCategory
              ? "bg-brand text-cream shadow-xs"
              : "border border-brand/15 bg-cream-light text-ink-soft hover:border-brand/35 hover:bg-sprout-soft hover:text-brand-dark"
          }`}
        >
          Semua
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/katalog?kategori=${category.slug}`}
            aria-current={activeCategory?.id === category.id ? "page" : undefined}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeCategory?.id === category.id
                ? "bg-brand text-cream shadow-xs"
                : "border border-brand/15 bg-cream-light text-ink-soft hover:border-brand/35 hover:bg-sprout-soft hover:text-brand-dark"
            }`}
          >
            {category.name}
          </Link>
        ))}
        <Link
          href="/rangkai-sendiri"
          className="rounded-full border border-accent/40 bg-accent-soft px-5 py-2 text-sm font-semibold text-accent-dark shadow-xs transition-all hover:bg-accent hover:text-white"
        >
          Rangkai Sendiri (Studio Kustom)
        </Link>
      </nav>

      {/* Studio Banner */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand/15 bg-gradient-to-r from-sprout-soft/70 via-cream to-accent-soft/50 p-5 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="font-display text-sm font-bold text-brand-dark sm:text-base">
              Ingin meracik jenis dan warna bunga sendiri?
            </p>
            <p className="text-xs text-ink-soft">
              Pilih bunga matahari, tulip, daisy, lili, dan mawar di studio kustom kami.
            </p>
          </div>
        </div>
        <Link
          href="/rangkai-sendiri"
          className="inline-flex rounded-full bg-brand px-5 py-2 text-xs font-semibold text-cream shadow-xs transition-all hover:bg-brand-dark"
        >
          Buka Studio Rangkai &rarr;
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-16 rounded-3xl border border-dashed border-brand/20 bg-cream-light p-12 text-center text-sm text-ink-soft">
          Belum ada produk di kategori ini.
        </p>
      ) : (
        <div className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
