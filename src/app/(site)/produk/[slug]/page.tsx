import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { FloralMotif } from "@/components/floral-motif";
import { OrderForm } from "@/components/order-form";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
  return prisma.product.findFirst({
    where: { slug, isActive: true },
    include: { category: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produk tidak ditemukan" };
  return {
    title: product.name,
    description:
      product.description ??
      `Pesan ${product.name} dari Arflora, dikirim segar hari ini.`,
  };
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <Container className="py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-brand/10 bg-brand-soft shadow-xs">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <FloralMotif className="h-3/5 w-auto text-brand/30" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {product.category?.name && (
            <span className="inline-flex rounded-full border border-sprout/40 bg-sprout-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sprout-dark shadow-xs">
              {product.category.name}
            </span>
          )}
          <div className="space-y-3">
            <h1 className="font-display text-4xl text-brand sm:text-5xl">
              {product.name}
            </h1>
            <p className="font-display text-3xl font-semibold text-brand-dark">
              {formatRupiah(product.price)}
            </p>
          </div>

          {product.description && (
            <p className="text-base leading-relaxed text-ink-soft">
              {product.description}
            </p>
          )}

          <div className="rounded-[2rem] border border-brand/15 bg-cream-light/90 p-8 shadow-sm">
            <h2 className="font-display text-2xl text-brand">
              Pesan sekarang
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Isi detail di bawah, kami akan menghubungimu via WhatsApp.
            </p>
            <div className="mt-8">
              <OrderForm
                productId={product.id}
                productName={product.name}
                price={product.price}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
