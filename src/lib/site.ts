export const site = {
  name: "Arflora",
  tagline: "Buket Bunga Kawat Bulu Handmade & Rangkai Sendiri",
  description:
    "Arflora menghadirkan buket kawat bulu (pipe cleaner) handmade premium: Buket Sedang, Buket Besar, Single Flower, dan studio Rangkai Bunga Sendiri custom warna.",
  whatsapp: "6289524066166",
  whatsappDisplay: "0895-2406-6166",
  email: "hello@arflora.id",
  instagram: "https://instagram.com/arflora",
  address: "Jakarta, Indonesia",
} as const;

export const nav = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Rangkai Sendiri ✨", href: "/rangkai-sendiri" },
  { label: "Cara Pesan", href: "/cara-pesan" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
] as const;

export function waLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function waLinkTo(phone: string, message?: string) {
  const base = `https://wa.me/${normalizePhone(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
