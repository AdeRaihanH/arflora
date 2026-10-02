import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/admin/login/login-form";
import { Logo } from "@/components/logo";
import { getCurrentAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Masuk Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin");

  return (
    <main className="flex flex-1 items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-semibold text-ink">
          Masuk ke Dashboard
        </h1>
        <p className="mt-1 text-center text-sm text-ink-soft">
          Kelola produk dan pesanan Arflora.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
