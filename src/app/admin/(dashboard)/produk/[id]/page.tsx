import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditProdukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Edit Produk
      </h1>
      <ProductForm
        categories={categories}
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          categoryId: product.categoryId,
          isActive: product.isActive,
          isFeatured: product.isFeatured,
        }}
      />
    </div>
  );
}
