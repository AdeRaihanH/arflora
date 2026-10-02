"use client";

import { useActionState } from "react";
import { saveSettingsAction, type SettingsState } from "@/app/admin/actions";

const initialState: SettingsState = {};

const inputClass =
  "mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export function SettingsForm({
  settings,
}: {
  settings: Record<string, string>;
}) {
  const [state, formAction, isPending] = useActionState(
    saveSettingsAction,
    initialState,
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <fieldset className="space-y-5 rounded-2xl border border-black/5 bg-white p-5">
        <legend className="px-1 text-sm font-semibold text-ink">
          Informasi Pembayaran
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="bankName" className="text-sm font-medium text-ink">
              Nama bank
            </label>
            <input
              id="bankName"
              name="bankName"
              defaultValue={settings.bankName}
              placeholder="BCA"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="bankAccount" className="text-sm font-medium text-ink">
              Nomor rekening
            </label>
            <input
              id="bankAccount"
              name="bankAccount"
              defaultValue={settings.bankAccount}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="bankHolder" className="text-sm font-medium text-ink">
            Atas nama
          </label>
          <input
            id="bankHolder"
            name="bankHolder"
            defaultValue={settings.bankHolder}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="paymentNote" className="text-sm font-medium text-ink">
            Catatan pembayaran
          </label>
          <textarea
            id="paymentNote"
            name="paymentNote"
            rows={3}
            defaultValue={settings.paymentNote}
            placeholder="Kirim bukti transfer via WhatsApp setelah membayar."
            className={inputClass}
          />
        </div>
      </fieldset>

      {state.success && (
        <p role="status" className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand-dark">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {isPending ? "Menyimpan..." : "Simpan Pengaturan"}
      </button>
    </form>
  );
}
