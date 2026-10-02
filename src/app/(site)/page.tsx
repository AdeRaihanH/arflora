import Link from "next/link";
import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import { FloralMotif } from "@/components/floral-motif";
import { Marquee } from "@/components/marquee";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { HomeCategoryTabs } from "@/components/home-category-tabs";
import { Flower3D } from "@/components/webgl/flower-3d";
import { HeroShader } from "@/components/webgl/hero-shader";
import { prisma } from "@/lib/db";
import { site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

const steps = [
  {
    title: "Pilih Ukuran atau Rangkai Sendiri",
    body: "Tersedia Buket Sedang, Buket Besar, Single Flower, atau racik kombinasi bungamu sendiri di studio custom.",
  },
  {
    title: "Pilih Warna & Tulis Pesan",
    body: "Tentukan warna kelopak bunga (pink, kuning, lilac, biru), kertas wrapping, serta kartu ucapan gratis.",
  },
  {
    title: "Konfirmasi & Kirim via WhatsApp",
    body: "Detail pesanan dan harga otomatis terhitung rapi, tinggal kirim ke WhatsApp kami dan pesanan diproses.",
  },
];

const benefits = [
  {
    title: "100% Kawat Bulu Handmade",
    body: "Dirangkai rapi dengan kawat bulu chenille lembut, tahan bertahun-tahun tanpa layu.",
  },
  {
    title: "Rangkai Bunga Sendiri",
    body: "Bebas pilih bunga matahari, tulip, daisy, lili, dan mawar dengan harga transparan per tangkai.",
  },
  {
    title: "Tiga Pilihan Ukuran",
    body: "Mulai dari Single Flower imut, Buket Sedang manis, hingga Buket Besar Deluxe mewah.",
  },
  {
    title: "Gratis Kartu Ucapan & Pita",
    body: "Setiap buket dilengkapi pita organza cantik dan kartu ucapan pesan pribadimu.",
  },
];

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden bg-brand-deep text-cream">
        <HeroShader />
        <Container className="relative py-24 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              {/* Category tags pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-sprout/30 bg-sprout-soft/20 px-3.5 py-1 text-sprout">
                  <span className="h-1.5 w-1.5 rounded-full bg-sprout" />
                  Buket Kawat Bulu Handmade
                </span>
                <span className="rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold text-cream">
                  Awet Selamanya ✨
                </span>
              </div>

              <SplitHeading
                as="h1"
                delay={0.15}
                lines={[
                  "Bunga abadi,",
                  <Fragment key="line-2">
                    dirangkai <em className="italic text-blush">spesial</em>
                  </Fragment>,
                  "untuk momenmu.",
                ]}
                className="mt-6 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.98] text-cream"
              />

              <Reveal delay={0.35} className="mt-6 max-w-lg">
                <p className="text-base leading-relaxed text-cream/80 sm:text-lg">
                  Arflora merangkai buket kawat bulu (pipe cleaner) lembut & estetik:
                  pilih <strong>Buket Sedang</strong>, <strong>Buket Besar</strong>, <strong>Single Flower</strong>,
                  atau <strong>Rangkai Bunga Sendiri</strong> custom warna sesukamu!
                </p>
              </Reveal>

              {/* Quick Size Badges */}
              <Reveal delay={0.45} className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-cream/90">
                <span className="rounded-xl border border-cream/20 bg-cream/10 px-3 py-1.5 backdrop-blur-xs">
                  🌸 Buket Sedang
                </span>
                <span className="rounded-xl border border-cream/20 bg-cream/10 px-3 py-1.5 backdrop-blur-xs">
                  💐 Buket Besar
                </span>
                <span className="rounded-xl border border-cream/20 bg-cream/10 px-3 py-1.5 backdrop-blur-xs">
                  🌷 Single Flower
                </span>
                <span className="rounded-xl border border-sprout/40 bg-sprout/20 px-3 py-1.5 font-bold text-sprout">
                  ✨ Rangkai Sendiri (+15k Buket)
                </span>
              </Reveal>

              <Reveal delay={0.55} className="mt-8 flex flex-wrap items-center gap-5">
                <Magnetic strength={0.3}>
                  <Link
                    href="/rangkai-sendiri"
                    className="inline-flex items-center gap-2 rounded-full bg-sprout px-8 py-4 font-display text-sm font-bold text-brand-deep shadow-lg shadow-black/25 transition-all hover:scale-105 hover:bg-cream"
                  >
                    <span>Rangkai Bunga Sendiri</span>
                    <span>✨</span>
                  </Link>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <Link
                    href="/katalog"
                    className="inline-flex rounded-full border border-cream/30 bg-cream/15 px-6 py-4 text-sm font-medium text-cream backdrop-blur-xs transition-colors hover:bg-cream hover:text-brand-dark"
                  >
                    Lihat Pilihan Buket
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <Parallax speed={0.12} className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-sprout/25 blur-3xl"
              />
              <Flower3D className="relative mx-auto aspect-square w-full max-w-[30rem] cursor-grab" />
              <div className="absolute -bottom-4 right-4 rounded-2xl border border-white/20 bg-black/40 px-4 py-2 text-center text-xs text-cream/90 backdrop-blur-md">
                <span className="font-bold text-sprout">100% Kawat Bulu Chenille</span>
                <p className="text-[0.65rem] text-cream/70">Putar bunga 3D dengan kursor</p>
              </div>
            </Parallax>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-cream/20 pt-7 text-[0.7rem] uppercase tracking-[0.24em] text-cream/60">
            <span>Handmade Flower Art &middot; Jakarta & Seluruh Indonesia</span>
            <span className="flex items-center gap-3">
              Jelajahi Pilihan Buket
              <span aria-hidden="true" className="animate-bounce text-sprout">
                &darr;
              </span>
            </span>
          </div>
        </Container>
      </section>

      <Marquee />

      {/* INTERACTIVE CATEGORY TABS & PRODUCTS SHOWCASE */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-sprout-dark">Koleksi Handmade</span>
            <SplitHeading
              lines={["Pilihan Ukuran Buket & Custom Studio"]}
              className="mt-4 font-display text-4xl text-brand sm:text-5xl"
            />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
              Klik tab di bawah untuk melihat pilihan <strong>Buket Sedang</strong>, <strong>Buket Besar</strong>,
              <strong>Single Flower</strong>, atau coba fitur <strong>Rangkai Sendiri</strong>!
            </p>
          </Reveal>

          <div className="mt-14">
            <HomeCategoryTabs products={products} />
          </div>

          {/* VISUAL SIZE COMPARISON FEATURE */}
          <div className="mt-20 rounded-3xl border border-brand/10 bg-cream-light/70 p-8 sm:p-12 shadow-xs">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow text-sprout-dark">Panduan Ukuran Buket</span>
              <h3 className="mt-2 font-display text-3xl text-brand sm:text-4xl">
                Buket Kecil, Sedang, atau Besar?
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Sesuaikan ukuran buket dengan momen berhargamu. Semua ukuran bisa dipesan langsung atau dirangkai sendiri di Studio Custom!
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {/* Kecil */}
              <div className="rounded-2xl border border-brand/15 bg-white p-6 shadow-xs transition-all hover:border-brand/35 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sprout-soft px-3 py-0.5 text-xs font-bold text-brand-dark">
                    Maks 5 Bunga
                  </span>
                  <span className="text-xs font-semibold text-ink-soft">Wrap +10k</span>
                </div>
                <h4 className="mt-3 font-display text-xl font-bold text-ink">Buket Kecil / Single Flower</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  Compact, manis, dan pas untuk kejutan sehari-hari, souvenir meja, atau kado wisuda simpel.
                </p>
                <div className="mt-4 border-t border-brand/10 pt-3">
                  <span className="text-[0.68rem] text-ink-soft">Mulai dari:</span>
                  <p className="font-display text-lg font-bold text-brand-dark">Rp 22.000 - Rp 45.000</p>
                </div>
              </div>

              {/* Sedang */}
              <div className="relative rounded-2xl border-2 border-brand bg-white p-6 shadow-md transition-all hover:shadow-xl scale-[1.02]">
                <span className="absolute -top-3 right-6 rounded-full bg-brand px-3 py-0.5 text-[0.68rem] font-bold text-cream shadow-xs">
                  ★ Paling Favorit
                </span>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-sprout px-3 py-0.5 text-xs font-bold text-brand-deep">
                    Maks 15 Bunga
                  </span>
                  <span className="text-xs font-semibold text-ink-soft">Wrap +15k</span>
                </div>
                <h4 className="mt-3 font-display text-xl font-bold text-ink">Buket Sedang</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  Ukuran paling proporsional! Kombinasi rimbun bunga matahari, tulip, daisy, dan pita organza berkilau.
                </p>
                <div className="mt-4 border-t border-brand/10 pt-3">
                  <span className="text-[0.68rem] text-ink-soft">Mulai dari:</span>
                  <p className="font-display text-lg font-bold text-brand-dark">Rp 85.000 - Rp 110.000</p>
                </div>
              </div>

              {/* Besar */}
              <div className="rounded-2xl border border-brand/15 bg-white p-6 shadow-xs transition-all hover:border-brand/35 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent-soft px-3 py-0.5 text-xs font-bold text-accent-dark">
                    Maks 30 Bunga
                  </span>
                  <span className="text-xs font-semibold text-ink-soft">Wrap +20k</span>
                </div>
                <h4 className="mt-3 font-display text-xl font-bold text-ink">Buket Besar Deluxe</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  Rangkaian mekar jumbo megah dengan puluhan tangkai bunga, lili, dan mawar untuk momen spektakuler.
                </p>
                <div className="mt-4 border-t border-brand/10 pt-3">
                  <span className="text-[0.68rem] text-ink-soft">Mulai dari:</span>
                  <p className="font-display text-lg font-bold text-brand-dark">Rp 165.000 - Rp 250.000</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-brand/10 py-24 sm:py-32">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-brand-dark font-medium">Cara Pesan</p>
            <SplitHeading
              lines={["Tiga langkah,", "tanpa ribet"]}
              className="mt-5 font-display text-4xl text-brand sm:text-5xl"
            />
          </Reveal>
          <ol className="mt-16 grid gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-brand/15 pt-8">
                <Reveal delay={index * 0.08}>
                  <span className="font-display text-6xl text-accent-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-brand-dark py-24 text-cream sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow text-sprout">Kenapa Arflora</p>
            <SplitHeading
              lines={["Kawat bulu handmade,", "cantik & awet selamanya."]}
              className="mt-5 font-display text-4xl leading-tight sm:text-5xl"
            />
          </Reveal>
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.06}>
                <div className="border-t border-cream/20 pt-6">
                  <h3 className="font-display text-xl text-cream">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    {benefit.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-brand/10 bg-gradient-to-br from-accent-soft via-cream to-sprout-soft/80 px-6 py-24 text-center shadow-sm sm:px-16">
              <Parallax
                speed={0.28}
                className="pointer-events-none absolute -right-8 -top-16 h-72 w-auto text-accent/35"
              >
                <FloralMotif className="h-full w-auto" />
              </Parallax>
              <Parallax
                speed={0.2}
                className="pointer-events-none absolute -bottom-20 -left-10 h-60 w-auto text-sprout/40"
              >
                <FloralMotif className="h-full w-auto" />
              </Parallax>

              <h2 className="relative mx-auto max-w-2xl font-display text-4xl leading-tight text-brand sm:text-5xl">
                Siap menghadiahkan buket cantik hari ini?
              </h2>
              <p className="relative mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                Pilih buket siap kirim atau coba fitur Rangkai Sendiri di studio custom kami.
                Chat kami di {site.whatsappDisplay} untuk tanya-tanya!
              </p>
              <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
                <Magnetic strength={0.3}>
                  <Link
                    href="/rangkai-sendiri"
                    className="inline-flex rounded-full bg-brand px-8 py-4 text-sm font-bold text-cream shadow-md shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-lg"
                  >
                    Rangkai Bunga Sendiri ✨
                  </Link>
                </Magnetic>
                <a
                  href={waLink("Halo Arflora, saya ingin memesan buket bunga.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-brand/20 bg-white px-7 py-4 text-sm font-semibold text-brand-dark shadow-xs transition-colors hover:bg-sprout-soft"
                >
                  Tanya via WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
