import { deleteCategory } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminKategoriPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Kategori
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Kelompokkan produk agar mudah ditemukan.
        </p>
      </div>

      <CategoryForm />

      {categories.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/10 bg-white p-10 text-center text-sm text-ink-soft">
          Belum ada kategori.
        </p>
      ) : (
        <ul className="divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div>
                <p className="font-medium text-ink">{category.name}</p>
                <p className="text-xs text-ink-soft">
                  /{category.slug} &middot; {category._count.products} produk
                </p>
              </div>
              <ConfirmForm
                action={deleteCategory}
                id={category.id}
                confirmMessage={`Hapus kategori "${category.name}"? Produk tidak ikut terhapus.`}
              >
                <button
                  type="submit"
                  className="text-sm font-medium text-accent-dark hover:underline"
                >
                  Hapus
                </button>
              </ConfirmForm>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
