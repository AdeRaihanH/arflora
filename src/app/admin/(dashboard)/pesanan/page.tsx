import Link from "next/link";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/format";
import { waLinkTo } from "@/lib/site";

export const dynamic = "force-dynamic";

const filters = [
  { value: "", label: "Semua" },
  { value: "NEW", label: "Baru" },
  { value: "CONFIRMED", label: "Dikonfirmasi" },
  { value: "SENT", label: "Dikirim" },
  { value: "DONE", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
];

export default async function AdminPesananPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = filters.some((f) => f.value === status) ? status : "";

  const orders = await prisma.order.findMany({
    where: activeStatus ? { status: activeStatus as never } : undefined,
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Pesanan
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {orders.length} pesanan ditampilkan.
        </p>
      </div>

      <nav aria-label="Filter status" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const href = filter.value
            ? `/admin/pesanan?status=${filter.value}`
            : "/admin/pesanan";
          const active = activeStatus === filter.value;
          return (
            <Link
              key={filter.value || "all"}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand text-white"
                  : "bg-white text-ink-soft hover:bg-brand-soft hover:text-brand-dark"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </nav>

      {orders.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/10 bg-white p-10 text-center text-sm text-ink-soft">
          Belum ada pesanan.
        </p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-2xl border border-black/5 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">
                    {order.code}{" "}
                    <span className="font-normal text-ink-soft">
                      &middot; {order.customerName}
                    </span>
                  </p>
                  <p className="text-xs text-ink-soft">
                    {order.createdAt.toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <OrderStatusForm id={order.id} status={order.status} />
              </div>

              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div className="flex gap-2">
                  <dt className="text-ink-soft">Produk:</dt>
                  <dd className="text-ink">
                    {order.product?.name ?? "Produk dihapus"} ({order.qty}x)
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-ink-soft">Total:</dt>
                  <dd className="font-medium text-brand-dark">
                    {formatRupiah(order.total)}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-ink-soft">HP:</dt>
                  <dd>
                    <a
                      href={waLinkTo(
                        order.phone,
                        `Halo ${order.customerName}, terima kasih sudah memesan di Arflora (${order.code}).`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-dark hover:underline"
                    >
                      {order.phone}
                    </a>
                  </dd>
                </div>
                {order.deliveryDate && (
                  <div className="flex gap-2">
                    <dt className="text-ink-soft">Tanggal kirim:</dt>
                    <dd className="text-ink">
                      {order.deliveryDate.toLocaleDateString("id-ID", {
                        dateStyle: "medium",
                      })}
                    </dd>
                  </div>
                )}
              </dl>

              {order.address && (
                <p className="mt-3 text-sm text-ink-soft">
                  <span className="text-ink-soft">Alamat: </span>
                  {order.address}
                </p>
              )}
              {order.cardMessage && (
                <p className="mt-1 text-sm text-ink-soft">
                  <span className="text-ink-soft">Kartu ucapan: </span>
                  {order.cardMessage}
                </p>
              )}
              {order.notes && (
                <p className="mt-1 text-sm text-ink-soft">
                  <span className="text-ink-soft">Catatan: </span>
                  {order.notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
