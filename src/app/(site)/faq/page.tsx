import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan yang sering diajukan tentang pemesanan bunga di Arflora.",
};

const faqs = [
  {
    q: "Berapa lama proses pengiriman?",
    a: "Pesanan yang dikonfirmasi sebelum jam 14.00 dapat dikirim di hari yang sama untuk area dalam kota. Di luar itu, pengiriman dilakukan hari berikutnya.",
  },
  {
    q: "Apakah bisa kirim ke luar kota?",
    a: "Bisa. Ongkos kirim menyesuaikan tujuan dan akan kami informasikan saat konfirmasi via WhatsApp.",
  },
  {
    q: "Apakah bisa custom rangkaian?",
    a: "Tentu. Sampaikan jenis bunga, warna, dan ukuran yang diinginkan, tim kami akan merangkai sesuai permintaanmu.",
  },
  {
    q: "Bagaimana cara pembayarannya?",
    a: "Setelah pesanan dikonfirmasi, kami mengirim rincian total dan nomor rekening. Pembayaran dilakukan via transfer bank sebelum pengiriman.",
  },
  {
    q: "Apakah kartu ucapan dikenakan biaya?",
    a: "Tidak. Kartu ucapan gratis untuk setiap pesanan.",
  },
];

export default function FaqPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-4xl text-brand sm:text-5xl">
        Pertanyaan Umum
      </h1>
      <p className="mt-4 text-base text-ink-soft">
        Belum ketemu jawabannya? Chat kami langsung.
      </p>

      <div className="mt-12 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-brand/10 bg-cream-light p-5 shadow-xs transition-colors open:border-brand/25 open:bg-sprout-soft/35"
          >
            <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="font-mono text-lg text-brand transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
