"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSessionCookie, requireAdmin, setSessionCookie, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { settingKeys, type SettingKey } from "@/lib/settings";
import { slugify } from "@/lib/slug";
import { OrderStatus } from "@/generated/prisma/enums";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return { error: "Email atau password salah." };
  }

  await setSessionCookie(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export type ProductFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/katalog");
  revalidatePath("/admin/produk");
}

export async function saveProduct(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const isActive = formData.get("isActive") === "on";
  const isFeatured = formData.get("isFeatured") === "on";

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Nama produk wajib diisi.";
  if (!Number.isInteger(price) || price < 0)
    fieldErrors.price = "Harga harus berupa angka.";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const slug = slugify(slugInput || name);

  const data = {
    name,
    slug,
    description: description || null,
    price,
    imageUrl: imageUrl || null,
    categoryId: categoryId || null,
    isActive,
    isFeatured,
  };

  try {
    if (id) {
      await prisma.product.update({ where: { id }, data });
    } else {
      await prisma.product.create({ data });
    }
  } catch {
    return { fieldErrors: { slug: "Slug sudah dipakai produk lain." } };
  }

  revalidateCatalog();
  redirect("/admin/produk");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await prisma.product.delete({ where: { id } });
  revalidateCatalog();
}

export async function saveCategory(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0);

  if (name.length < 2) return { fieldErrors: { name: "Nama kategori wajib diisi." } };

  const data = { name, slug: slugify(name), sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0 };

  try {
    if (id) await prisma.category.update({ where: { id }, data });
    else await prisma.category.create({ data });
  } catch {
    return { fieldErrors: { name: "Kategori dengan nama serupa sudah ada." } };
  }

  revalidatePath("/admin/kategori");
  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/admin/kategori");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/kategori");
  revalidatePath("/katalog");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const valid = Object.values(OrderStatus) as string[];
  if (!id || !valid.includes(status)) return;
  await prisma.order.update({
    where: { id },
    data: { status: status as OrderStatus },
  });
  revalidatePath("/admin/pesanan");
}

export type SettingsState = { success?: string; error?: string };

export async function saveSettingsAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  await requireAdmin();
  for (const key of settingKeys) {
    const value = String(formData.get(key) ?? "").trim();
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key: key satisfies SettingKey, value },
    });
  }
  revalidatePath("/admin/pengaturan");
  revalidatePath("/cara-pesan");
  return { success: "Pengaturan tersimpan." };
}
