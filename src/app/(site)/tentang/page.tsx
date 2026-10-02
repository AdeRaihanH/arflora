import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Arflora adalah toko bunga yang merangkai buket dan dekorasi bunga segar untuk setiap momen berharga.",
};

export default function TentangPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-4xl text-brand sm:text-5xl">Tentang Arflora</h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
        <p>
          Arflora lahir dari kecintaan pada bunga dan keinginan untuk membantu
          orang menyampaikan perasaan lewat rangkaian yang indah. Kami percaya
          setiap momen — ulang tahun, pernikahan, sampai ucapan duka — layak
          dirayakan dengan bunga terbaik.
        </p>
        <div className="my-8 rounded-2xl border border-brand/10 bg-gradient-to-r from-sprout-soft via-cream to-accent-soft p-6 font-display text-lg italic text-brand-dark shadow-xs">
          &ldquo;Bunga segar pilihan, dirangkai dengan sepenuh hati untuk menghadirkan senyum di setiap momen istimewa.&rdquo;
        </div>
        <p>
          Setiap rangkaian kami buat dengan bunga segar pilihan, dirangkai
          langsung oleh florist berpengalaman, dan dikemas rapi sebelum
          dikirim. Kami juga menyediakan kartu ucapan gratis untuk pesanmu.
        </p>
        <p>
          Butuh rangkaian custom? Ceritakan idemu, kami bantu wujudkan sesuai
          tema dan warna favoritmu.
        </p>
      </div>
    </Container>
  );
}
