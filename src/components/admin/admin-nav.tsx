"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Ringkasan", href: "/admin" },
  { label: "Produk", href: "/admin/produk" },
  { label: "Kategori", href: "/admin/kategori" },
  { label: "Pesanan", href: "/admin/pesanan" },
  { label: "Pengaturan", href: "/admin/pengaturan" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigasi admin" className="flex gap-1 overflow-x-auto">
      {items.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-brand text-white"
                : "text-ink-soft hover:bg-black/5 hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
