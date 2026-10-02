"use client";

import { useActionState } from "react";
import { saveCategory, type ProductFormState } from "@/app/admin/actions";

const initialState: ProductFormState = {};

export function CategoryForm() {
  const [state, formAction, isPending] = useActionState(
    saveCategory,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="flex flex-wrap items-end gap-3 rounded-2xl border border-black/5 bg-white p-5"
    >
      <div className="flex-1">
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Nama kategori
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-xs text-accent-dark">
            {state.fieldErrors.name}
          </p>
        )}
      </div>
      <div className="w-28">
        <label htmlFor="sortOrder" className="text-sm font-medium text-ink">
          Urutan
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={0}
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {isPending ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  );
}
