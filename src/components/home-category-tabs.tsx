"use client";

import { useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/lib/format";

type ProductItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  description?: string | null;
  imageUrl?: string | null;
  category?: { name: string; slug: string } | null;
};

type Props = {
  products: ProductItem[];
};

export function HomeCategoryTabs({ products }: Props) {
  const [activeTab, setActiveTab] = useState<"buket-sedang" | "buket-besar" | "single-flower" | "custom">(
    "buket-sedang"
  );

  // Filter products by category
  const filteredProducts = products.filter((p) => {
    if (activeTab === "buket-sedang") return p.category?.slug === "buket-sedang";
    if (activeTab === "buket-besar") return p.category?.slug === "buket-besar";
    if (activeTab === "single-flower") return p.category?.slug === "single-flower";
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Interactive Tabs Header */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Buket Sedang Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("buket-sedang")}
          className={`group flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
            activeTab === "buket-sedang"
              ? "bg-brand text-cream shadow-md shadow-brand/25 ring-2 ring-brand/30 scale-105"
              : "border border-brand/15 bg-white text-ink-soft hover:border-brand/40 hover:bg-cream-light hover:text-brand"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span>Buket Sedang</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
              activeTab === "buket-sedang" ? "bg-sprout text-brand-deep" : "bg-black/5 text-ink-soft"
            }`}
          >
            Paling Favorit
          </span>
        </button>

        {/* Buket Besar Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("buket-besar")}
          className={`group flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
            activeTab === "buket-besar"
              ? "bg-brand text-cream shadow-md shadow-brand/25 ring-2 ring-brand/30 scale-105"
              : "border border-brand/15 bg-white text-ink-soft hover:border-brand/40 hover:bg-cream-light hover:text-brand"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-sprout" />
          <span>Buket Besar</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
              activeTab === "buket-besar" ? "bg-sprout text-brand-deep" : "bg-black/5 text-ink-soft"
            }`}
          >
            Deluxe Jumbo
          </span>
        </button>

        {/* Single Flower Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("single-flower")}
          className={`group flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
            activeTab === "single-flower"
              ? "bg-brand text-cream shadow-md shadow-brand/25 ring-2 ring-brand/30 scale-105"
              : "border border-brand/15 bg-white text-ink-soft hover:border-brand/40 hover:bg-cream-light hover:text-brand"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span>Single Flower (Buket Kecil)</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
              activeTab === "single-flower" ? "bg-sprout text-brand-deep" : "bg-black/5 text-ink-soft"
            }`}
          >
            Koleksi Simpel
          </span>
        </button>

        {/* Custom Studio Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("custom")}
          className={`group flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
            activeTab === "custom"
              ? "bg-brand-dark text-cream shadow-md shadow-black/20 ring-2 ring-brand scale-105"
              : "border border-accent/40 bg-accent-soft text-accent-dark hover:bg-accent hover:text-white"
          }`}
        >
          <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>Rangkai Sendiri</span>
          <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[0.68rem] font-bold text-accent-dark">
            Studio Kustom
          </span>
        </button>
      </div>

      {/* TAB CONTENT: CUSTOM BUILDER TEASER */}
      {activeTab === "custom" && (
        <div className="overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-cream via-sprout-soft/40 to-accent-soft p-8 sm:p-12 shadow-sm transition-all">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-semibold text-cream">
                Studio Rangkai Kustom
              </span>
              <h3 className="mt-4 font-display text-3xl text-brand sm:text-4xl">
                Rangkai Sendiri Bunga, Warna & Ukuran Buketmu
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                Ingin kombinasi buket yang personal untuk orang tersayang? Di studio kustom Arflora, kamu bisa leluasa menentukan:
              </p>
              <ul className="mt-4 space-y-2.5 text-xs font-medium text-brand-dark sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pilihan ukuran buket: Kecil (maks 5 bunga), Sedang (maks 15), atau Besar (maks 30)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Model wrapping: Buket Standar (layered wrap) atau Round Bouquet (dome 360°)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pilihan bunga: matahari, tulip, daisy, lili, mawar dengan custom warna kelopak</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Simulasi tata letak bunga otomatis sesuai kaidah floristry secara real-time</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/rangkai-sendiri"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 font-display text-sm font-semibold text-cream shadow-md shadow-brand/20 transition-all hover:bg-brand-dark"
                >
                  <span>Buka Studio Rangkai</span>
                  <span>&rarr;</span>
                </Link>
                <span className="text-xs font-normal text-ink-soft">
                  Perhitungan harga transparan & siap dipesan via WhatsApp
                </span>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-brand/10 bg-white/95 p-6 text-center shadow-md">
              {/* Product preview from user's upload */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/buket-koleksi-pastel.png"
                alt="Koleksi Buket Pastel Arflora"
                className="aspect-square w-full rounded-xl object-cover shadow-xs"
              />
              <p className="mt-3 font-display text-sm font-bold text-brand-dark">
                Buket Kawat Bulu Koleksi Pastel
              </p>
              <p className="text-xs text-ink-soft">
                Bebas request warna wrapping dan kartu ucapan gratis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRODUCTS GRID */}
      {activeTab !== "custom" && (
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand/10 bg-white p-5 shadow-xs transition-all duration-300 hover:border-brand/35 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-soft">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-brand/20">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}

                    {product.category?.name && (
                      <span className="absolute left-3 top-3 rounded-full border border-brand/10 bg-cream/95 px-3 py-1 text-[0.7rem] font-bold text-brand-dark shadow-xs backdrop-blur">
                        {product.category.name}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 rounded-full bg-brand/90 px-3 py-1 font-display text-xs font-bold text-cream backdrop-blur">
                      {formatRupiah(product.price)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-brand">
                      {product.name}
                    </h4>
                    {product.description && (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-soft">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-brand/10 pt-4">
                  <span className="font-display text-base font-extrabold text-brand-dark">
                    {formatRupiah(product.price)}
                  </span>
                  <Link
                    href={`/produk/${product.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-4.5 py-2 text-xs font-bold text-brand-dark transition-all group-hover:bg-brand group-hover:text-cream shadow-xs"
                  >
                    <span>Pesan Bunga</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-center">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-cream-light px-7 py-3 text-xs font-semibold text-brand-dark transition-all hover:border-brand hover:bg-sprout-soft"
            >
              <span>Lihat Seluruh Katalog</span>
              <span>&rarr;</span>
            </Link>
            <Link
              href="/rangkai-sendiri"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-xs font-semibold text-cream shadow-xs transition-all hover:bg-brand-dark"
            >
              <span>Rangkai Sendiri di Studio</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
