import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/format";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  NEW: "Baru",
  CONFIRMED: "Dikonfirmasi",
  SENT: "Dikirim",
  DONE: "Selesai",
  CANCELLED: "Dibatalkan",
};

export default async function AdminHomePage() {
  const [productCount, activeCount, orderCount, newCount, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "NEW" } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { product: { select: { name: true } } },
      }),
    ]);

  const stats = [
    { label: "Total Produk", value: productCount, href: "/admin/produk" },
    { label: "Produk Aktif", value: activeCount, href: "/admin/produk" },
    { label: "Total Pesanan", value: orderCount, href: "/admin/pesanan" },
    { label: "Pesanan Baru", value: newCount, href: "/admin/pesanan" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Ringkasan
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Kondisi toko Arflora hari ini.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-black/5 bg-white p-5 transition-colors hover:border-brand/30"
          >
            <p className="text-sm text-ink-soft">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-brand-dark">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-black/5 bg-white">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">
            Pesanan Terbaru
          </h2>
          <Link
            href="/admin/pesanan"
            className="text-sm font-medium text-brand-dark hover:underline"
          >
            Lihat semua
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-ink-soft">
            Belum ada pesanan.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {recentOrders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 px-5 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-ink">
                    {order.code} &middot; {order.customerName}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {order.product?.name ?? "Produk dihapus"} &middot;{" "}
                    {formatRupiah(order.total)}
                  </p>
                </div>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-dark">
                  {statusLabel[order.status] ?? order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
