import Link from "next/link";
import { deleteProduct } from "@/app/admin/actions";
import { ConfirmForm } from "@/components/admin/confirm-form";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminProdukPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Produk
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {products.length} produk terdaftar.
          </p>
        </div>
        <Link
          href="/admin/produk/new"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          + Tambah Produk
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/10 bg-white p-10 text-center text-sm text-ink-soft">
          Belum ada produk. Klik &ldquo;Tambah Produk&rdquo; untuk memulai.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-5 py-3 font-medium">Produk</th>
                <th className="px-5 py-3 font-medium">Kategori</th>
                <th className="px-5 py-3 font-medium">Harga</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink">{product.name}</p>
                    <p className="text-xs text-ink-soft">/{product.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">
                    {product.category?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">
                    {formatRupiah(product.price)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.isActive
                          ? "bg-brand-soft text-brand-dark"
                          : "bg-black/5 text-ink-soft"
                      }`}
                    >
                      {product.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/produk/${product.id}`}
                        className="font-medium text-brand-dark hover:underline"
                      >
                        Edit
                      </Link>
                      <ConfirmForm
                        action={deleteProduct}
                        id={product.id}
                        confirmMessage={`Hapus produk "${product.name}"?`}
                      >
                        <button
                          type="submit"
                          className="font-medium text-accent-dark hover:underline"
                        >
                          Hapus
                        </button>
                      </ConfirmForm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
