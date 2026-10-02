import { ProductForm } from "@/components/admin/product-form";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewProdukPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Tambah Produk
      </h1>
      <ProductForm categories={categories} />
    </div>
  );
}
