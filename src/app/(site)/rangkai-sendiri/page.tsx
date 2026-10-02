import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CustomBouquetBuilder } from "@/components/custom-bouquet-builder";

export const metadata: Metadata = {
  title: "Rangkai Bunga Sendiri — Custom Buket Kawat Bulu",
  description:
    "Rangkai buket kawat bulu (pipe cleaner) impianmu sendiri di Arflora! Pilih bunga matahari, tulip, daisy, lili, mawar, sesuaikan warna favorit, dan opsi buket cantik.",
};

export default function RangkaiSendiriPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container>
        {/* Hero Header */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-sprout-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-dark shadow-xs">
            ✨ Studio Rangkai Bunga Custom
          </span>
          <h1 className="mt-4 font-display text-4xl text-brand sm:text-5xl lg:text-6xl">
            Rangkai Buket <span className="italic text-accent-dark">Impianmu</span> Sendiri
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Bebas pilih jenis bunga kawat bulu (pipe cleaner), tentukan warna kelopak kesukaanmu,
            tambah kertas wrapping & pita cantik, lalu pesan langsung via WhatsApp dalam sekali klik!
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-brand-dark">
            <span className="flex items-center gap-1.5">
              🌸 100% Handmade Awet Selamanya
            </span>
            <span className="flex items-center gap-1.5">
              🎨 Bebas Custom Warna
            </span>
            <span className="flex items-center gap-1.5">
              💌 Gratis Kartu Ucapan
            </span>
            <span className="flex items-center gap-1.5">
              📦 Opsi Buket (+15k)
            </span>
          </div>
        </header>

        {/* The Interactive Studio Builder */}
        <div className="mt-14 sm:mt-16">
          <CustomBouquetBuilder />
        </div>

        {/* Benefits & FAQ */}
        <div className="mt-24 rounded-3xl border border-brand/10 bg-cream-light/80 p-8 sm:p-12">
          <h2 className="font-display text-2xl text-brand sm:text-3xl text-center">
            Kenapa Rangkai Sendiri di Arflora?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand/10 bg-white p-6 shadow-xs">
              <span className="text-3xl">🧶</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">
                Kawat Bulu Chenille Halus
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Material lembut berkualitas tinggi yang tidak mudah rontok, tidak layu, dan tahan bertahun-tahun sebagai kenang-kenangan.
              </p>
            </div>

            <div className="rounded-2xl border border-brand/10 bg-white p-6 shadow-xs">
              <span className="text-3xl">🎨</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">
                Kombinasi Warna Bebas
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Bisa request warna pastel, monokrom, cerah, atau gradasi sesuai tema wisuda, ulang tahun, atau kado pacar.
              </p>
            </div>

            <div className="rounded-2xl border border-brand/10 bg-white p-6 shadow-xs">
              <span className="text-3xl">⚡</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">
                Langsung Terhubung WhatsApp
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Rincian bunga dan total harga otomatis terangkum rapi di pesan WhatsApp sehingga kamu tidak perlu mengetik ulang.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
