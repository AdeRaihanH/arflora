"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveProduct, type ProductFormState } from "@/app/admin/actions";

type Category = { id: string; name: string };
type ProductInput = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  categoryId: string | null;
  isActive: boolean;
  isFeatured: boolean;
};

const initialState: ProductFormState = {};

const inputClass =
  "mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-accent-dark">{message}</p>;
}

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductInput;
}) {
  const [state, formAction, isPending] = useActionState(
    saveProduct,
    initialState,
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {product && <input type="hidden" name="id" value={product.id} />}

      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Nama produk <span className="text-accent-dark">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={product?.name}
          className={inputClass}
        />
        <ErrorText message={state.fieldErrors?.name} />
      </div>

      <div>
        <label htmlFor="slug" className="text-sm font-medium text-ink">
          Slug URL
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={product?.slug}
          placeholder="otomatis dari nama bila kosong"
          className={inputClass}
        />
        <ErrorText message={state.fieldErrors?.slug} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="text-sm font-medium text-ink">
            Harga (Rp) <span className="text-accent-dark">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={1000}
            required
            defaultValue={product?.price}
            className={inputClass}
          />
          <ErrorText message={state.fieldErrors?.price} />
        </div>

        <div>
          <label htmlFor="categoryId" className="text-sm font-medium text-ink">
            Kategori
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={product?.categoryId ?? ""}
            className={inputClass}
          >
            <option value="">Tanpa kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" className="text-sm font-medium text-ink">
          URL gambar
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          defaultValue={product?.imageUrl ?? ""}
          placeholder="/produk/buket.jpg atau https://..."
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-ink">
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className={inputClass}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={product ? product.isActive : true}
            className="h-4 w-4 rounded border-black/20 accent-brand"
          />
          Tampilkan di katalog
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={product?.isFeatured ?? false}
            className="h-4 w-4 rounded border-black/20 accent-brand"
          />
          Jadikan produk unggulan
        </label>
      </div>

      {state.error && (
        <p role="alert" className="rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent-dark">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {isPending ? "Menyimpan..." : "Simpan"}
        </button>
        <Link
          href="/admin/produk"
          className="rounded-full border border-black/10 px-6 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-black/5"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
