"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatRupiah } from "@/lib/format";
import { waLink } from "@/lib/site";

export type OrderFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function generateCode() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `ARF-${date}-${random}`;
}

export async function submitOrder(
  _prev: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const productId = String(formData.get("productId") ?? "");
  const customerName = String(formData.get("customerName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const qty = Number(formData.get("qty") ?? 1);
  const deliveryDateRaw = String(formData.get("deliveryDate") ?? "").trim();
  const cardMessage = String(formData.get("cardMessage") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (customerName.length < 2) fieldErrors.customerName = "Nama wajib diisi.";
  if (phone.replace(/\D/g, "").length < 8)
    fieldErrors.phone = "Nomor HP tidak valid.";
  if (address.length < 5) fieldErrors.address = "Alamat wajib diisi.";
  if (!Number.isInteger(qty) || qty < 1)
    fieldErrors.qty = "Jumlah minimal 1.";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.isActive) {
    return { error: "Produk tidak ditemukan atau sudah tidak tersedia." };
  }

  const total = product.price * qty;
  const code = generateCode();
  const deliveryDate = deliveryDateRaw ? new Date(deliveryDateRaw) : null;

  await prisma.order.create({
    data: {
      code,
      customerName,
      phone,
      address,
      qty,
      total,
      cardMessage: cardMessage || null,
      notes: notes || null,
      deliveryDate:
        deliveryDate && !Number.isNaN(deliveryDate.getTime())
          ? deliveryDate
          : null,
      productId: product.id,
    },
  });

  const lines = [
    "Halo Arflora, saya ingin memesan bunga:",
    "",
    `Kode: ${code}`,
    `Produk: ${product.name}`,
    `Jumlah: ${qty}`,
    `Total: ${formatRupiah(total)}`,
    `Nama: ${customerName}`,
    `No. HP: ${phone}`,
    `Alamat: ${address}`,
  ];
  if (deliveryDateRaw) lines.push(`Tanggal kirim: ${deliveryDateRaw}`);
  if (cardMessage) lines.push(`Kartu ucapan: ${cardMessage}`);
  if (notes) lines.push(`Catatan: ${notes}`);

  redirect(waLink(lines.join("\n")));
}
