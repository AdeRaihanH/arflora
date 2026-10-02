import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Arflora untuk pemesanan bunga, konsultasi rangkaian, dan kerja sama.",
};

export default function KontakPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-4xl text-brand sm:text-5xl">Kontak</h1>
      <p className="mt-4 text-base text-ink-soft">
        Kami senang mendengar dari Anda. Pilih cara yang paling nyaman.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <a
          href={waLink("Halo Arflora, saya ingin bertanya.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-brand/10 bg-cream-light p-6 shadow-xs transition-all hover:border-brand/30 hover:bg-sprout-soft/60 hover:shadow-sm"
        >
          <h2 className="font-display text-lg font-semibold text-brand">
            WhatsApp
          </h2>
          <p className="mt-1 text-sm text-ink-soft">{site.whatsappDisplay}</p>
        </a>

        <a
          href={`mailto:${site.email}`}
          className="rounded-2xl border border-brand/10 bg-cream-light p-6 shadow-xs transition-all hover:border-brand/30 hover:bg-sprout-soft/60 hover:shadow-sm"
        >
          <h2 className="font-display text-lg font-semibold text-brand">Email</h2>
          <p className="mt-1 text-sm text-ink-soft">{site.email}</p>
        </a>

        <div className="rounded-2xl border border-brand/10 bg-cream-light p-6 shadow-xs sm:col-span-2">
          <h2 className="font-display text-lg font-semibold text-brand">
            Lokasi
          </h2>
          <p className="mt-1 text-sm text-ink-soft">{site.address}</p>
          <p className="mt-1 text-sm text-ink-soft">
            Jam operasional: Senin&ndash;Sabtu, 08.00&ndash;20.00 WIB.
          </p>
        </div>
      </div>
    </Container>
  );
}
