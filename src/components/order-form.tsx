"use client";

import { useActionState, useState } from "react";
import { submitOrder, type OrderFormState } from "@/lib/actions/order";
import { formatRupiah } from "@/lib/format";

type Props = {
  productId: string;
  productName: string;
  price: number;
};

const initialState: OrderFormState = {};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-accent-dark">{message}</p>;
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

export function OrderForm({ productId, productName, price }: Props) {
  const [state, formAction, isPending] = useActionState(
    submitOrder,
    initialState,
  );
  const [qty, setQty] = useState(1);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="productId" value={productId} />

      <div>
        <label htmlFor="customerName" className="text-sm font-medium text-ink">
          Nama pemesan <span className="text-accent-dark">*</span>
        </label>
        <input
          id="customerName"
          name="customerName"
          required
          autoComplete="name"
          className={inputClass}
        />
        <FieldError message={state.fieldErrors?.customerName} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            No. HP / WhatsApp <span className="text-accent-dark">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="08xxxxxxxxxx"
            className={inputClass}
          />
          <FieldError message={state.fieldErrors?.phone} />
        </div>

        <div>
          <label htmlFor="qty" className="text-sm font-medium text-ink">
            Jumlah <span className="text-accent-dark">*</span>
          </label>
          <input
            id="qty"
            name="qty"
            type="number"
            min={1}
            required
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className={inputClass}
          />
          <FieldError message={state.fieldErrors?.qty} />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="text-sm font-medium text-ink">
          Alamat pengiriman <span className="text-accent-dark">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          required
          rows={3}
          autoComplete="street-address"
          className={inputClass}
        />
        <FieldError message={state.fieldErrors?.address} />
      </div>

      <div>
        <label htmlFor="deliveryDate" className="text-sm font-medium text-ink">
          Tanggal kirim (opsional)
        </label>
        <input
          id="deliveryDate"
          name="deliveryDate"
          type="date"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="cardMessage" className="text-sm font-medium text-ink">
          Kartu ucapan (opsional)
        </label>
        <textarea
          id="cardMessage"
          name="cardMessage"
          rows={2}
          placeholder="Selamat ulang tahun, semoga bahagia selalu!"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-medium text-ink">
          Catatan tambahan (opsional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          className={inputClass}
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent-dark"
        >
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-between rounded-xl border border-brand/10 bg-sprout-soft/70 px-4 py-3">
        <span className="text-sm font-medium text-ink-soft">Total estimasi</span>
        <span className="font-display text-lg font-semibold text-brand-dark">
          {formatRupiah(price * qty)}
        </span>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-cream shadow-md shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "Memproses..."
          : `Pesan ${productName} via WhatsApp`}
      </button>
      <p className="text-center text-xs text-ink-soft">
        Pesanan akan dikirim ke WhatsApp Arflora untuk konfirmasi.
      </p>
    </form>
  );
}
