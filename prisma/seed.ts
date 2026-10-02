import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/password";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Buket Sedang", slug: "buket-sedang", sortOrder: 1 },
  { name: "Buket Besar", slug: "buket-besar", sortOrder: 2 },
  { name: "Single Flower", slug: "single-flower", sortOrder: 3 },
];

const products = [
  {
    name: "Buket Sedang Pastel Chenille",
    slug: "buket-sedang-pastel-chenille",
    description:
      "Buket kawat bulu (pipe cleaner) handmade ukuran sedang dengan kombinasi bunga daisy kuning, tulip pink lembut, dan bunga putih mini berhias pita organza berkilau.",
    price: 85000,
    categorySlug: "buket-sedang",
    imageUrl: "/images/products/buket-sedang-pastel.jpg",
    isFeatured: true,
  },
  {
    name: "Buket Koleksi Pastel Signature",
    slug: "buket-koleksi-pastel-signature",
    description:
      "Rangkaian buket kawat bulu premium dengan variasi warna pastel (Pink Blossom, Butter Yellow, Soft Lilac, Sky Blue) dilengkapi mutiara cantik dan wrapping berlayer.",
    price: 95000,
    categorySlug: "buket-sedang",
    imageUrl: "/images/products/buket-koleksi-pastel.png",
    isFeatured: true,
  },
  {
    name: "Buket Besar Deluxe Blossom",
    slug: "buket-besar-deluxe-blossom",
    description:
      "Buket kawat bulu jumbo mewah dengan kombinasi lengkap bunga matahari ceria, lili ungu anggun, mawar pink mekar, serta daisy mini dan pita organza lebar.",
    price: 165000,
    categorySlug: "buket-besar",
    imageUrl: "/images/products/buket-besar-deluxe.jpg",
    isFeatured: true,
  },
  {
    name: "Buket Besar Sun & Lilac Grandeur",
    slug: "buket-besar-sun-lilac-grandeur",
    description:
      "Kombinasi bunga matahari pipe cleaner ekstra mekar dengan lili ungu dan mawar. Cocok untuk momen wisuda megah, ulang tahun, dan anniversary spesial.",
    price: 185000,
    categorySlug: "buket-besar",
    imageUrl: "/images/products/buket-besar-deluxe.jpg",
    isFeatured: false,
  },
  {
    name: "Single Flower Tulip Pink",
    slug: "single-flower-tulip-pink",
    description:
      "Satu tangkai bunga tulip kawat bulu warna pink pastel dengan daun hijau segar, dibungkus kertas wrapping vintage bertekstur dan diikat pita putih cantik.",
    price: 25000,
    categorySlug: "single-flower",
    imageUrl: "/images/products/single-flower-tulip.jpg",
    isFeatured: true,
  },
  {
    name: "Single Flower Daisy Sunshine",
    slug: "single-flower-daisy-sunshine",
    description:
      "Satu tangkai bunga daisy kawat bulu warna kuning ceria dengan kelopak detail lembut. Hadiah manis dan awet selamanya untuk orang terkasih.",
    price: 22000,
    categorySlug: "single-flower",
    imageUrl: "/images/products/buket-sedang-pastel.jpg",
    isFeatured: false,
  },
];

async function main() {
  const categoryIdBySlug = new Map<string, string>();

  for (const category of categories) {
    const row = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, sortOrder: category.sortOrder },
      create: category,
    });
    categoryIdBySlug.set(row.slug, row.id);
  }

  for (const product of products) {
    const { categorySlug, ...data } = product;
    const payload = {
      ...data,
      imageUrl: data.imageUrl ?? null,
      categoryId: categoryIdBySlug.get(categorySlug) ?? null,
    };
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: payload,
      create: payload,
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash: hashPassword(adminPassword) },
      create: {
        email: adminEmail,
        name: "Admin Arflora",
        passwordHash: hashPassword(adminPassword),
      },
    });
  }

  const [categoryCount, productCount] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
  ]);
  console.log(`Seed selesai: ${categoryCount} kategori, ${productCount} produk.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
