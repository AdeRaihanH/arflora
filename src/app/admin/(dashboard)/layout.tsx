import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { Logo } from "@/components/logo";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";

export const metadata = {
  title: "Dashboard Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" aria-label="Dashboard Arflora">
              <Logo />
            </Link>
            <span className="hidden text-xs font-medium uppercase tracking-wide text-ink-soft sm:inline">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-soft sm:inline">
              {admin.email}
            </span>
            <Link
              href="/"
              className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-black/5"
            >
              Lihat situs
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand-dark transition-colors hover:bg-brand hover:text-white"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-3 sm:px-6">
          <AdminNav />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
