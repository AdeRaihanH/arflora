import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getSettings } from "@/lib/settings";
import { site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cara Pesan",
  description:
    "Panduan memesan bunga di Arflora: pilih produk, isi detail, konfirmasi via WhatsApp, lalu bayar.",
};

const steps = [
  {
    title: "Pilih bunga",
    body: "Buka katalog dan pilih rangkaian yang kamu suka, lalu klik produknya.",
  },
  {
    title: "Isi detail pesanan",
    body: "Lengkapi nama, nomor HP, alamat, jumlah, dan kartu ucapan pada form.",
  },
  {
    title: "Konfirmasi via WhatsApp",
    body: "Klik tombol pesan, pesanan otomatis terkirim ke WhatsApp Arflora.",
  },
  {
    title: "Pembayaran",
    body: "Tim kami mengirim rincian total dan nomor rekening untuk transfer.",
  },
];

export default async function CaraPesanPage() {
  const settings = await getSettings();
  const hasBank = Boolean(settings.bankAccount);

  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-4xl text-brand sm:text-5xl">Cara Pesan</h1>
      <p className="mt-4 text-base text-ink-soft">
        Empat langkah mudah untuk memesan bunga di Arflora.
      </p>

      <ol className="mt-12 space-y-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-brand/10 bg-cream-light p-5 shadow-xs"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sprout font-display text-sm font-bold text-brand-deep shadow-xs">
              {index + 1}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                {step.title}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {hasBank && (
        <div className="mt-8 rounded-2xl border border-brand/10 bg-cream-light p-6 text-sm shadow-xs">
          <h2 className="font-display text-lg font-semibold text-ink">
            Pembayaran
          </h2>
          <p className="mt-1 text-ink-soft">
            Transfer ke rekening berikut, lalu kirim bukti via WhatsApp.
          </p>
          <p className="mt-3 font-medium text-brand-dark">
            {settings.bankName} &middot; {settings.bankAccount}
          </p>
          {settings.bankHolder && (
            <p className="text-ink-soft">a.n. {settings.bankHolder}</p>
          )}
          {settings.paymentNote && (
            <p className="mt-2 text-ink-soft">{settings.paymentNote}</p>
          )}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-brand/10 bg-gradient-to-br from-accent-soft via-cream to-sprout-soft/70 p-6 text-sm text-ink shadow-xs">
        <p className="font-semibold text-brand-dark">Butuh bantuan?</p>
        <p className="mt-1 text-ink-soft">
          Chat kami di WhatsApp {site.whatsappDisplay}, kami siap membantu.
        </p>
        <a
          href={waLink("Halo Arflora, saya butuh bantuan memesan bunga.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-full bg-brand px-5 py-2.5 font-semibold text-cream shadow-xs transition-all hover:bg-brand-dark hover:shadow-md"
        >
          Hubungi via WhatsApp
        </a>
      </div>
    </Container>
  );
}
