"use client";

import { updateOrderStatus } from "@/app/admin/actions";

const options = [
  { value: "NEW", label: "Baru" },
  { value: "CONFIRMED", label: "Dikonfirmasi" },
  { value: "SENT", label: "Dikirim" },
  { value: "DONE", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
];

export function OrderStatusForm({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  return (
    <form action={updateOrderStatus}>
      <input type="hidden" name="id" value={id} />
      <label htmlFor={`status-${id}`} className="sr-only">
        Ubah status pesanan
      </label>
      <select
        id={`status-${id}`}
        name="status"
        defaultValue={status}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="ml-2 text-xs font-medium text-brand-dark">
          Simpan
        </button>
      </noscript>
    </form>
  );
}
