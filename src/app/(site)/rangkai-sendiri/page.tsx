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
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-sprout-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-dark shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Studio Rangkai Kustom
          </span>
          <h1 className="mt-4 font-display text-4xl text-brand sm:text-5xl lg:text-6xl">
            Rangkai Buket <span className="italic text-accent-dark">Pilihanmu</span> Sendiri
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Pilih jenis bunga kawat bulu (pipe cleaner), tentukan kombinasi warna kelopak,
            pilih gaya wrapping dan pita, lalu kirim rincian pesanan langsung ke WhatsApp.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-brand-dark">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sprout" />
              Handmade Kawat Bulu Chenille
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Bebas Pilih Warna Kelopak
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Termasuk Kartu Ucapan
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Pilihan Ukuran & Wrapping
            </span>
          </div>
        </header>

        {/* The Interactive Studio Builder */}
        <div className="mt-14 sm:mt-16">
          <CustomBouquetBuilder />
        </div>

        {/* Benefits & Craft Details */}
        <div className="mt-24 rounded-3xl border border-brand/10 bg-cream-light/80 p-8 sm:p-12">
          <h2 className="font-display text-2xl text-brand sm:text-3xl text-center">
            Sentuhan Kerajinan Tangan Arflora
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand/10 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L10.5 7.5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                Kawat Bulu Chenille Halus
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                Material lembut berkualitas tinggi yang tidak rontok, tidak layu, dan awet bertahun-tahun sebagai cinderamata berharga.
              </p>
            </div>

            <div className="rounded-2xl border border-brand/10 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4 4 4 0 014-4h1a4 4 0 014 4 4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-3a2 2 0 00-2-2h-3m-6 7v-4m0 0a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                Harmoni Warna Personal
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                Tentukan paduan warna pastel, monokrom, atau kontras yang sesuai dengan preferensi penerima dan suasana acara.
              </p>
            </div>

            <div className="rounded-2xl border border-brand/10 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                Pemesanan Langsung WhatsApp
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                Format pesanan, rincian bunga, dan estimasi total tersusun rapi otomatis sehingga proses konfirmasi pesanan berjalan cepat.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
