"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
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

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
      >
        {isPending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
