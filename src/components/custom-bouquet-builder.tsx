"use client";

import { useMemo, useState } from "react";
import { formatRupiah } from "@/lib/format";
import { waLink } from "@/lib/site";

// Size Definitions
export type BouquetSize = {
  id: "kecil" | "sedang" | "besar";
  name: string;
  tagline: string;
  maxStems: number;
  wrapPrice: number;
  badge: string;
};

export const SIZES: BouquetSize[] = [
  {
    id: "kecil",
    name: "Buket Kecil",
    tagline: "Compact & manis untuk kejutan simpel",
    maxStems: 5,
    wrapPrice: 10000,
    badge: "Maks 5 Bunga",
  },
  {
    id: "sedang",
    name: "Buket Sedang",
    tagline: "Ukuran ideal & paling disukai pelanggan",
    maxStems: 15,
    wrapPrice: 15000,
    badge: "Maks 15 Bunga (Favorit)",
  },
  {
    id: "besar",
    name: "Buket Besar",
    tagline: "Rangkaian megah & mewah untuk momen istimewa",
    maxStems: 30,
    wrapPrice: 20000,
    badge: "Maks 30 Bunga (Deluxe)",
  },
];

export type BouquetStyle = "standar" | "round" | "lepas";

export type FlowerDef = {
  id: string;
  name: string;
  category: string;
  role: "focal" | "flank" | "filler"; // for smart florist arranging!
  price: number;
  description: string;
  defaultColor: string;
  colors: { name: string; hex: string }[];
};

export const FLOWER_OPTIONS: FlowerDef[] = [
  {
    id: "matahari",
    name: "Bunga Matahari",
    category: "Bunga Utama",
    role: "focal",
    price: 20000,
    description: "Bunga matahari mekar ceria dengan detail kelopak spiral ganda. Selalu ditempatkan di tengah buket.",
    defaultColor: "Kuning Cerah",
    colors: [
      { name: "Kuning Cerah", hex: "#FBBF24" },
      { name: "Oranye Sunset", hex: "#F97316" },
      { name: "Pastel Lemon", hex: "#FEF08A" },
    ],
  },
  {
    id: "tulip",
    name: "Bunga Tulip",
    category: "Bunga Samping",
    role: "flank",
    price: 15000,
    description: "Kuncup tulip kawat bulu anggun nan lentik. Sangat pas ditaruh di sisi samping membingkai buket.",
    defaultColor: "Pink Pastel",
    colors: [
      { name: "Pink Pastel", hex: "#E78B7E" },
      { name: "Soft Lilac", hex: "#C084FC" },
      { name: "Butter Yellow", hex: "#FDE047" },
      { name: "Sky Blue", hex: "#93C5FD" },
      { name: "Putih Ivory", hex: "#FAF2E3" },
    ],
  },
  {
    id: "daisy",
    name: "Bunga Daisy",
    category: "Pemanis & Filler",
    role: "filler",
    price: 12000,
    description: "Daisy mungil ceria dengan kelopak melingkar dan putik pompom lembut. Menyelip manis di antara bunga.",
    defaultColor: "Putih Klasik",
    colors: [
      { name: "Putih Klasik", hex: "#FFFFFF" },
      { name: "Kuning Mentega", hex: "#FDE047" },
      { name: "Pink Blossom", hex: "#F472B6" },
      { name: "Ungu Lavender", hex: "#C084FC" },
    ],
  },
  {
    id: "lili",
    name: "Bunga Lili",
    category: "Bunga Samping",
    role: "flank",
    price: 18000,
    description: "Bunga lili mekar eksotis dengan lekukan kelopak dramatis. Ditempatkan di sisi sayap buket.",
    defaultColor: "Ungu Violet",
    colors: [
      { name: "Ungu Violet", hex: "#A855F7" },
      { name: "Pink Coral", hex: "#E78B7E" },
      { name: "Putih Bersih", hex: "#FFFFFF" },
      { name: "Sky Blue", hex: "#60A5FA" },
    ],
  },
  {
    id: "mawar",
    name: "Bunga Mawar",
    category: "Bunga Utama",
    role: "focal",
    price: 16000,
    description: "Mawar kawat bulu kelopak spiral bertumpuk rapi nan mewah. Elegan di tengah maupun tengah-depan.",
    defaultColor: "Merah Romantis",
    colors: [
      { name: "Merah Romantis", hex: "#EF4444" },
      { name: "Pink Rose", hex: "#E78B7E" },
      { name: "Krem Vanilla", hex: "#FAF2E3" },
      { name: "Biru Pastel", hex: "#93C5FD" },
    ],
  },
  {
    id: "filler",
    name: "Ranting Daun & Mutiara",
    category: "Daun & Filler",
    role: "filler",
    price: 8000,
    description: "Ranting daun kawat bulu dengan sentuhan kuncup mutiara kecil pemanis tekstur buket.",
    defaultColor: "Hijau Sage",
    colors: [
      { name: "Hijau Sage", hex: "#8AA781" },
      { name: "Hijau Botani", hex: "#4F6D4C" },
      { name: "Putih Mutiara", hex: "#FAF9F6" },
    ],
  },
];

export const WRAPPING_PAPERS = [
  { name: "Vanilla Cream Linen", hex: "#FAF2E3", borderHex: "#D8C7A5" },
  { name: "Pink Coral Blossom", hex: "#FCE8E5", borderHex: "#E78B7E" },
  { name: "Soft Lilac Mist", hex: "#F3E8FF", borderHex: "#C084FC" },
  { name: "Sky Blue Cloud", hex: "#E0F2FE", borderHex: "#7DD3FC" },
  { name: "Matcha Sage Green", hex: "#EAF0E8", borderHex: "#8AA781" },
];

export const RIBBON_OPTIONS = [
  "Pita Organza Berkilau (Shimmer)",
  "Pita Satin Lembut",
  "Tali Rami Vintage Rustic",
];

// --- BESPOKE BOTANICAL SKETCH LINE ART ICONS (No WA emojis!) ---
function BotanicalSketch({
  type,
  colorHex,
  size = 64,
}: {
  type: string;
  colorHex: string;
  size?: number;
}) {
  if (type === "matahari") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-xs">
        {/* Stem with fine hatch marks */}
        <path d="M32 38 V60" stroke="#3E543B" strokeWidth="3" strokeLinecap="round" />
        <path d="M31 46 C24 43 20 38 18 45" stroke="#3E543B" strokeWidth="2" strokeLinecap="round" />
        <path d="M33 50 C40 47 44 42 46 48" stroke="#3E543B" strokeWidth="2" strokeLinecap="round" />
        {/* Flower Head */}
        <g transform="translate(32, 26)">
          {/* Double radiating petals with fine etching */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <ellipse cx="0" cy="-17" rx="3.8" ry="9.5" fill={colorHex} stroke="#78350F" strokeWidth="0.8" />
              <line x1="0" y1="-10" x2="0" y2="-23" stroke="#92400E" strokeWidth="0.6" strokeDasharray="1 1" />
            </g>
          ))}
          {/* Central seed disc with concentric rings & stamen texture */}
          <circle cx="0" cy="0" r="10" fill="#713F12" stroke="#451A03" strokeWidth="1" />
          <circle cx="0" cy="0" r="7.5" fill="#451A03" />
          <circle cx="0" cy="0" r="4" fill="#B45309" stroke="#FDE047" strokeWidth="0.6" />
        </g>
      </svg>
    );
  }

  if (type === "tulip") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-xs">
        {/* Stem */}
        <path d="M32 36 V60" stroke="#3E543B" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 46 C40 40 44 32 48 38" stroke="#3E543B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 52 C24 46 20 38 16 44" stroke="#3E543B" strokeWidth="2.5" strokeLinecap="round" />
        {/* Tulip Cup with classical sketch lines */}
        <g transform="translate(32, 22)">
          {/* Back petal */}
          <path d="M-8 6 C-12 -6 0 -14 0 -14 C0 -14 12 -6 8 6 Z" fill={colorHex} fillOpacity="0.8" />
          {/* Left Wing Petal */}
          <path
            d="M-2 14 C-16 12 -18 -4 -6 -12 C-3 -6 0 4 -2 14 Z"
            fill={colorHex}
            stroke="#243322"
            strokeWidth="1.2"
          />
          {/* Right Wing Petal */}
          <path
            d="M2 14 C16 12 18 -4 6 -12 C3 -6 0 4 2 14 Z"
            fill={colorHex}
            stroke="#243322"
            strokeWidth="1.2"
          />
          {/* Center Petal Overlay with sketch lines */}
          <path
            d="M0 -14 C-5 -4 -6 8 0 16 C6 8 5 -4 0 -14 Z"
            fill="#FFFFFF"
            fillOpacity="0.3"
            stroke="#243322"
            strokeWidth="1"
          />
          <line x1="0" y1="-8" x2="0" y2="10" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        </g>
      </svg>
    );
  }

  if (type === "daisy") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-xs">
        <path d="M32 36 V60" stroke="#3E543B" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 46 C38 42 42 38 45 44" stroke="#3E543B" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(32, 24)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <ellipse cx="0" cy="-14" rx="4.5" ry="8" fill={colorHex} stroke="#475569" strokeWidth="0.8" />
              <line x1="0" y1="-8" x2="0" y2="-19" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="1 1" />
            </g>
          ))}
          {/* Button center */}
          <circle cx="0" cy="0" r="7.5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <circle cx="0" cy="0" r="4.5" fill="#F59E0B" />
        </g>
      </svg>
    );
  }

  if (type === "lili") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-xs">
        <path d="M32 36 V60" stroke="#3E543B" strokeWidth="3" strokeLinecap="round" />
        <g transform="translate(32, 26)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M0 -22 C-6 -14 -6 -6 0 0 C6 -6 6 -14 0 -22 Z"
              transform={`rotate(${deg})`}
              fill={colorHex}
              stroke="#312E81"
              strokeWidth="0.9"
            />
          ))}
          {/* Stamen anthers */}
          <circle cx="0" cy="0" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
          <line x1="-3" y1="-8" x2="0" y2="0" stroke="#CA8A04" strokeWidth="0.8" />
          <line x1="3" y1="-8" x2="0" y2="0" stroke="#CA8A04" strokeWidth="0.8" />
          <line x1="0" y1="-9" x2="0" y2="0" stroke="#CA8A04" strokeWidth="0.8" />
        </g>
      </svg>
    );
  }

  if (type === "mawar") {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-xs">
        <path d="M32 38 V60" stroke="#3E543B" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 48 C26 44 22 40 20 46" stroke="#3E543B" strokeWidth="2" strokeLinecap="round" />
        {/* Layered Rose petals */}
        <g transform="translate(32, 25)">
          <circle cx="0" cy="0" r="17" fill={colorHex} stroke="#7F1D1D" strokeWidth="1" />
          {/* Spiraling petal folds */}
          <path
            d="M-8 -6 C-12 6 -4 14 6 12 C14 10 16 -2 8 -8 C2 -12 -4 -10 -8 -6 Z"
            fill="#FFFFFF"
            fillOpacity="0.25"
            stroke="#991B1B"
            strokeWidth="0.9"
          />
          <path
            d="M-4 -2 C-6 4 -2 8 4 6 C8 4 8 -2 4 -4 Z"
            fill="#FFFFFF"
            fillOpacity="0.35"
            stroke="#7F1D1D"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    );
  }

  // filler twig & mini pearls
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-xs">
      <path d="M32 60 V16" stroke="#3E543B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M32 44 C24 40 20 34 22 30 C28 32 32 36 32 44 Z" fill={colorHex} stroke="#3E543B" strokeWidth="1" />
      <path d="M32 34 C40 30 44 24 42 20 C36 22 32 26 32 34 Z" fill={colorHex} stroke="#3E543B" strokeWidth="1" />
      <path d="M32 24 C24 20 20 14 22 10 C28 12 32 16 32 24 Z" fill={colorHex} stroke="#3E543B" strokeWidth="1" />
      {/* Mini Pearls */}
      <circle cx="21" cy="28" r="3.5" fill="#FAF9F6" stroke="#94A3B8" strokeWidth="0.8" />
      <circle cx="43" cy="18" r="3.5" fill="#FAF9F6" stroke="#94A3B8" strokeWidth="0.8" />
      <circle cx="32" cy="12" r="4.2" fill="#FAF9F6" stroke="#94A3B8" strokeWidth="0.8" />
    </svg>
  );
}

// Visual icons for Bouquet Style
function StyleSketch({ style }: { style: BouquetStyle }) {
  if (style === "standar") {
    return (
      <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
        {/* Back wrapper folds */}
        <polygon points="18,6 6,24 30,24" fill="#F1E2C8" stroke="#4F6D4C" strokeWidth="1.2" />
        <polygon points="18,12 11,32 25,32" fill="#FAF2E3" stroke="#4F6D4C" strokeWidth="1.2" />
        <circle cx="18" cy="16" r="3" fill="#E78B7E" />
        <circle cx="14" cy="18" r="2.5" fill="#FBBF24" />
        <circle cx="22" cy="18" r="2.5" fill="#C084FC" />
        {/* Ribbon */}
        <ellipse cx="18" cy="26" rx="4" ry="2" fill="#E78B7E" />
      </svg>
    );
  }
  if (style === "round") {
    return (
      <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
        {/* Round dome cluster */}
        <circle cx="18" cy="16" r="11" fill="#FAF2E3" stroke="#4F6D4C" strokeWidth="1.2" />
        <circle cx="18" cy="14" r="3.5" fill="#FBBF24" />
        <circle cx="13" cy="15" r="3" fill="#E78B7E" />
        <circle cx="23" cy="15" r="3" fill="#C084FC" />
        <circle cx="18" cy="19" r="3" fill="#8AA781" />
        {/* Handle wrap */}
        <path d="M15 25 L16 33 L20 33 L21 25 Z" fill="#F1E2C8" stroke="#4F6D4C" strokeWidth="1.2" />
      </svg>
    );
  }
  // Lepas / Single Stems
  return (
    <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <line x1="18" y1="8" x2="18" y2="30" stroke="#4F6D4C" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="12" r="4.5" fill="#E78B7E" stroke="#4F6D4C" strokeWidth="1" />
      <path d="M18 20 C14 18 12 14 13 12" stroke="#4F6D4C" strokeWidth="1.2" />
      <path d="M18 22 C22 20 24 16 23 14" stroke="#4F6D4C" strokeWidth="1.2" />
      <ellipse cx="18" cy="25" rx="3" ry="1.5" fill="#8AA781" />
    </svg>
  );
}

type SelectedItem = {
  qty: number;
  colorName: string;
  colorHex: string;
};

export function CustomBouquetBuilder() {
  // 1. Size
  const [selectedSize, setSelectedSize] = useState<BouquetSize>(SIZES[1]); // default Buket Sedang (max 15)

  // 2. Style
  const [bouquetStyle, setBouquetStyle] = useState<BouquetStyle>("standar");

  // 3. Flower Selections
  const [selections, setSelections] = useState<Record<string, SelectedItem>>({
    matahari: { qty: 1, colorName: "Kuning Cerah", colorHex: "#FBBF24" },
    tulip: { qty: 2, colorName: "Pink Pastel", colorHex: "#E78B7E" },
    daisy: { qty: 2, colorName: "Putih Klasik", colorHex: "#FFFFFF" },
  });

  // 4. Wrapping & Packaging options
  const [selectedWrapping, setSelectedWrapping] = useState(WRAPPING_PAPERS[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(RIBBON_OPTIONS[0]);

  // 5. Checkout inputs
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  // Total stem calculation
  const totalStems = useMemo(() => {
    return Object.values(selections).reduce((acc, curr) => acc + (curr?.qty || 0), 0);
  }, [selections]);

  const updateQty = (id: string, delta: number) => {
    if (delta > 0 && totalStems >= selectedSize.maxStems) {
      alert(
        `Kapasitas ${selectedSize.name} sudah penuh (maksimal ${selectedSize.maxStems} bunga).\nSilakan naikkan ukuran buket di atas jika ingin menambahkan bunga lagi!`
      );
      return;
    }

    setSelections((prev) => {
      const flower = FLOWER_OPTIONS.find((f) => f.id === id);
      const current = prev[id] || {
        qty: 0,
        colorName: flower?.defaultColor || "",
        colorHex: flower?.colors[0]?.hex || "#E78B7E",
      };
      const nextQty = Math.max(0, current.qty + delta);
      if (nextQty === 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: { ...current, qty: nextQty },
      };
    });
  };

  const updateColor = (id: string, colorName: string, colorHex: string) => {
    setSelections((prev) => {
      const current = prev[id] || {
        qty: 1,
        colorName,
        colorHex,
      };
      return {
        ...prev,
        [id]: { ...current, colorName, colorHex },
      };
    });
  };

  // Price calculations
  const { flowersTotal, wrapFee, grandTotal, itemsList } = useMemo(() => {
    let flowersSum = 0;
    const list: {
      flower: FlowerDef;
      qty: number;
      colorName: string;
      colorHex: string;
      subtotal: number;
    }[] = [];

    for (const flower of FLOWER_OPTIONS) {
      const item = selections[flower.id];
      if (item && item.qty > 0) {
        const sub = flower.price * item.qty;
        flowersSum += sub;
        list.push({
          flower,
          qty: item.qty,
          colorName: item.colorName,
          colorHex: item.colorHex,
          subtotal: sub,
        });
      }
    }

    const wFee = bouquetStyle !== "lepas" && totalStems > 0 ? selectedSize.wrapPrice : 0;
    const total = flowersSum + wFee;

    return {
      flowersTotal: flowersSum,
      wrapFee: wFee,
      grandTotal: total,
      itemsList: list,
    };
  }, [selections, bouquetStyle, selectedSize, totalStems]);

  // SMART FLORIST ARRANGEMENT ALGORITHM
  // Arranges stems naturally: Focal flowers in center, Tulips/Lilies on sides, Daisies/Fillers in crowns and gaps!
  const arrangedStems = useMemo(() => {
    const stems: {
      key: string;
      flower: FlowerDef;
      colorHex: string;
      colorName: string;
      slot: "center" | "flank-left" | "flank-right" | "top" | "gap";
      xOffset: number; // percentage px
      yOffset: number;
      rotation: number; // deg
      scale: number;
      zIndex: number;
    }[] = [];

    // Separate by roles
    const focalItems: { flower: FlowerDef; colorHex: string; colorName: string }[] = [];
    const flankItems: { flower: FlowerDef; colorHex: string; colorName: string }[] = [];
    const fillerItems: { flower: FlowerDef; colorHex: string; colorName: string }[] = [];

    itemsList.forEach((it) => {
      for (let i = 0; i < it.qty; i++) {
        if (it.flower.role === "focal") focalItems.push(it);
        else if (it.flower.role === "flank") flankItems.push(it);
        else fillerItems.push(it);
      }
    });

    let count = 0;

    // 1. Place Focal Flowers (Matahari / Mawar) in Center Rows
    focalItems.forEach((f, idx) => {
      count++;
      const isFirst = idx === 0;
      const x = isFirst ? 0 : (idx % 2 === 1 ? -1 : 1) * (14 + idx * 8);
      const y = isFirst ? 6 : -4 + idx * 6;
      const rot = isFirst ? 0 : (idx % 2 === 1 ? -6 : 6);

      stems.push({
        key: `focal-${idx}-${count}`,
        flower: f.flower,
        colorHex: f.colorHex,
        colorName: f.colorName,
        slot: "center",
        xOffset: x,
        yOffset: y,
        rotation: rot,
        scale: 1.08,
        zIndex: 20 + idx,
      });
    });

    // 2. Place Flank Flowers (Tulip / Lili) on Left and Right Wings
    flankItems.forEach((f, idx) => {
      count++;
      const isLeft = idx % 2 === 0;
      const step = Math.floor(idx / 2);
      const x = isLeft ? -(28 + step * 16) : 28 + step * 16;
      const y = -12 + step * 10;
      const rot = isLeft ? -(12 + step * 5) : 12 + step * 5;

      stems.push({
        key: `flank-${idx}-${count}`,
        flower: f.flower,
        colorHex: f.colorHex,
        colorName: f.colorName,
        slot: isLeft ? "flank-left" : "flank-right",
        xOffset: x,
        yOffset: y,
        rotation: rot,
        scale: 0.95,
        zIndex: 10 + idx,
      });
    });

    // 3. Place Filler Flowers (Daisy / Leaf pearls) in Upper Crown and Gaps
    fillerItems.forEach((f, idx) => {
      count++;
      const isTop = idx % 3 === 0;
      const sign = idx % 2 === 0 ? -1 : 1;
      const x = sign * (12 + (idx % 4) * 14);
      const y = isTop ? -28 - (idx % 2) * 6 : 14 + (idx % 3) * 6;
      const rot = sign * (8 + (idx % 3) * 6);

      stems.push({
        key: `filler-${idx}-${count}`,
        flower: f.flower,
        colorHex: f.colorHex,
        colorName: f.colorName,
        slot: isTop ? "top" : "gap",
        xOffset: x,
        yOffset: y,
        rotation: rot,
        scale: 0.88,
        zIndex: isTop ? 5 : 30 + idx,
      });
    });

    return stems;
  }, [itemsList]);

  // WhatsApp checkout message generator
  const whatsappUrl = useMemo(() => {
    let msg = `Halo Arflora, saya ingin memesan Custom Rangkaian Bunga Kawat Bulu:\n\n`;
    msg += `*UKURAN & MODEL BUKET:*\n`;
    msg += `• Ukuran: ${selectedSize.name} (Maks ${selectedSize.maxStems} bunga)\n`;

    if (bouquetStyle === "standar") {
      msg += `• Model: Buket Standar (Front-Facing Layered) (+${formatRupiah(selectedSize.wrapPrice)})\n`;
      msg += `  - Kertas Wrapping: ${selectedWrapping.name}\n`;
      msg += `  - Pita: ${selectedRibbon}\n`;
    } else if (bouquetStyle === "round") {
      msg += `• Model: Round Bouquet 360° (+${formatRupiah(selectedSize.wrapPrice)})\n`;
      msg += `  - Kertas Wrapping: ${selectedWrapping.name}\n`;
      msg += `  - Pita: ${selectedRibbon}\n`;
    } else {
      msg += `• Model: Tangkai Lepas / Single Stems (Tanpa Wrapping)\n`;
    }

    msg += `\n*RINCIAN BUNGA (${totalStems}/${selectedSize.maxStems} Tangkai):*\n`;
    if (itemsList.length === 0) {
      msg += `- Belum ada bunga dipilih\n`;
    } else {
      itemsList.forEach((it) => {
        msg += `• ${it.qty}x ${it.flower.name} (Warna: ${it.colorName}) — ${formatRupiah(it.subtotal)}\n`;
      });
    }

    if (cardMessage.trim()) {
      msg += `\n*KARTU UCAPAN:*\n"${cardMessage.trim()}"\n`;
    }

    if (specialRequest.trim()) {
      msg += `\n*CATATAN KHUSUS:*\n${specialRequest.trim()}\n`;
    }

    msg += `\n*TOTAL ESTIMASI:* ${formatRupiah(grandTotal)}\n\n`;

    if (customerName.trim() || customerPhone.trim() || customerAddress.trim()) {
      msg += `*DATA PEMESAN:*\n`;
      if (customerName.trim()) msg += `• Nama: ${customerName.trim()}\n`;
      if (customerPhone.trim()) msg += `• No. HP: ${customerPhone.trim()}\n`;
      if (customerAddress.trim()) msg += `• Alamat: ${customerAddress.trim()}\n`;
    }

    return waLink(msg);
  }, [
    selectedSize,
    bouquetStyle,
    selectedWrapping,
    selectedRibbon,
    totalStems,
    itemsList,
    cardMessage,
    specialRequest,
    grandTotal,
    customerName,
    customerPhone,
    customerAddress,
  ]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
      {/* LEFT COLUMN: CUSTOMIZATION STEPS */}
      <div className="space-y-10">
        {/* STEP 1: PILIH UKURAN BUKET */}
        <div className="rounded-3xl border border-brand/15 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="eyebrow text-sprout-dark">Langkah 1</span>
              <h2 className="mt-1 font-display text-2xl text-brand sm:text-3xl">
                Pilih Ukuran Buket
              </h2>
            </div>
            <span className="rounded-full bg-sprout-soft px-3.5 py-1 text-xs font-bold text-brand-dark">
              {totalStems} / {selectedSize.maxStems} Bunga Terpasang
            </span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            Tentukan kapasitas buket yang diinginkan. Setiap ukuran memiliki batas jumlah bunga dan harga wrap yang berbeda.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {SIZES.map((size) => {
              const isSelected = selectedSize.id === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? "border-brand bg-sprout-soft/40 shadow-sm ring-2 ring-brand/20 scale-[1.02]"
                      : "border-brand/15 bg-cream-light/30 hover:border-brand/35 hover:bg-cream-light"
                  }`}
                >
                  <div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
                        isSelected ? "bg-brand text-cream" : "bg-black/5 text-ink-soft"
                      }`}
                    >
                      {size.badge}
                    </span>
                    <h3 className="mt-2.5 font-display text-lg font-bold text-ink">
                      {size.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                      {size.tagline}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-brand/10 pt-3">
                    <span className="text-[0.68rem] text-ink-soft">Biaya Wrap / Kertas:</span>
                    <p className="font-display text-sm font-bold text-brand-dark">
                      +{formatRupiah(size.wrapPrice)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress Capacity Bar */}
          <div className="mt-6 rounded-2xl border border-brand/10 bg-cream-light/60 p-4">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-ink">Kapasitas {selectedSize.name}:</span>
              <span className={totalStems >= selectedSize.maxStems ? "text-accent-dark" : "text-brand-dark"}>
                {totalStems} dari {selectedSize.maxStems} bunga maksimal
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/10">
              <div
                className={`h-full transition-all duration-300 ${
                  totalStems >= selectedSize.maxStems ? "bg-accent-dark" : "bg-brand"
                }`}
                style={{
                  width: `${Math.min(100, (totalStems / selectedSize.maxStems) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* STEP 2: PILIH BENTUK BUKET */}
        <div className="rounded-3xl border border-brand/15 bg-white p-6 shadow-xs sm:p-8">
          <span className="eyebrow text-sprout-dark">Langkah 2</span>
          <h2 className="mt-1 font-display text-2xl text-brand sm:text-3xl">
            Pilihan Bentuk Buket
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Pilih model buket standar, buket melingkar (round), atau sekadar tangkai lepas tanpa kertas buket.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {/* 1. Standar */}
            <button
              type="button"
              onClick={() => setBouquetStyle("standar")}
              className={`flex items-start gap-3.5 rounded-2xl border p-4.5 text-left transition-all ${
                bouquetStyle === "standar"
                  ? "border-brand bg-sprout-soft/40 shadow-sm ring-2 ring-brand/20"
                  : "border-brand/15 bg-cream-light/30 hover:border-brand/35"
              }`}
            >
              <StyleSketch style="standar" />
              <div>
                <h3 className="font-display text-base font-bold text-ink">Buket Standar</h3>
                <p className="mt-0.5 text-xs text-ink-soft">
                  Front-facing layered wrap berjenjang di belakang dan samping.
                </p>
                <span className="mt-2 inline-block text-[0.7rem] font-bold text-brand-dark">
                  +{formatRupiah(selectedSize.wrapPrice)}
                </span>
              </div>
            </button>

            {/* 2. Round */}
            <button
              type="button"
              onClick={() => setBouquetStyle("round")}
              className={`flex items-start gap-3.5 rounded-2xl border p-4.5 text-left transition-all ${
                bouquetStyle === "round"
                  ? "border-brand bg-sprout-soft/40 shadow-sm ring-2 ring-brand/20"
                  : "border-brand/15 bg-cream-light/30 hover:border-brand/35"
              }`}
            >
              <StyleSketch style="round" />
              <div>
                <h3 className="font-display text-base font-bold text-ink">Round Bouquet</h3>
                <p className="mt-0.5 text-xs text-ink-soft">
                  Bentuk bulat melingkar 360° dome shape ala Korean bridal.
                </p>
                <span className="mt-2 inline-block text-[0.7rem] font-bold text-brand-dark">
                  +{formatRupiah(selectedSize.wrapPrice)}
                </span>
              </div>
            </button>

            {/* 3. Lepas */}
            <button
              type="button"
              onClick={() => setBouquetStyle("lepas")}
              className={`flex items-start gap-3.5 rounded-2xl border p-4.5 text-left transition-all ${
                bouquetStyle === "lepas"
                  ? "border-brand bg-sprout-soft/40 shadow-sm ring-2 ring-brand/20"
                  : "border-brand/15 bg-cream-light/30 hover:border-brand/35"
              }`}
            >
              <StyleSketch style="lepas" />
              <div>
                <h3 className="font-display text-base font-bold text-ink">Tangkai Lepas</h3>
                <p className="mt-0.5 text-xs text-ink-soft">
                  Single stems tanpa kertas buket, diikat pita minimalis.
                </p>
                <span className="mt-2 inline-block text-[0.7rem] font-bold text-sprout-dark">
                  Gratis (Rp 0)
                </span>
              </div>
            </button>
          </div>

          {/* If wrap is selected, show wrapping colors and ribbons */}
          {bouquetStyle !== "lepas" && (
            <div className="mt-6 space-y-6 rounded-2xl border border-brand/10 bg-cream-light/70 p-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Pilih Warna Kertas Wrapping:
                </label>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {WRAPPING_PAPERS.map((wp) => {
                    const isSelected = selectedWrapping.name === wp.name;
                    return (
                      <button
                        key={wp.name}
                        type="button"
                        onClick={() => setSelectedWrapping(wp)}
                        className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-brand bg-white text-brand shadow-xs ring-1 ring-brand"
                            : "border-brand/15 bg-white/70 text-ink-soft hover:bg-white"
                        }`}
                      >
                        <span
                          className="h-4 w-4 shrink-0 rounded-full border border-black/10"
                          style={{ backgroundColor: wp.hex }}
                        />
                        <span className="truncate">{wp.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Pilih Gaya Pita:
                </label>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {RIBBON_OPTIONS.map((ribbon) => {
                    const isSelected = selectedRibbon === ribbon;
                    return (
                      <button
                        key={ribbon}
                        type="button"
                        onClick={() => setSelectedRibbon(ribbon)}
                        className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-brand bg-brand text-cream shadow-xs"
                            : "border-brand/15 bg-white text-ink-soft hover:bg-sprout-soft hover:text-brand"
                        }`}
                      >
                        {ribbon}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STEP 3: PILIH BUNGA & WARNA */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="eyebrow text-sprout-dark">Langkah 3</span>
              <h2 className="mt-1 font-display text-2xl text-brand sm:text-3xl">
                Pilih Jenis Bunga & Warna
              </h2>
            </div>
            <p className="text-xs font-medium text-ink-soft">
              Simulasi tata letak otomatis: bunga fokus di tengah, aksen tulip di sisi samping.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {FLOWER_OPTIONS.map((flower) => {
              const current = selections[flower.id] || {
                qty: 0,
                colorName: flower.defaultColor,
                colorHex: flower.colors[0]?.hex || "#E78B7E",
              };
              const isSelected = current.qty > 0;

              return (
                <div
                  key={flower.id}
                  className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
                    isSelected
                      ? "border-brand bg-white shadow-md ring-2 ring-brand/15"
                      : "border-brand/10 bg-white hover:border-brand/30 hover:bg-cream-light/30 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-brand/10 bg-brand-soft/50 p-1">
                        <BotanicalSketch type={flower.id} colorHex={current.colorHex} size={54} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-sprout-soft px-2 py-0.5 text-[0.65rem] font-bold text-brand-dark">
                            {flower.category}
                          </span>
                          <span className="font-display text-sm font-bold text-brand-dark">
                            {formatRupiah(flower.price)}
                          </span>
                        </div>
                        <h3 className="mt-1 font-display text-base font-bold text-ink">
                          {flower.name}
                        </h3>
                        <p className="mt-0.5 text-[0.72rem] text-ink-soft line-clamp-2">
                          {flower.description}
                        </p>
                      </div>
                    </div>

                    {/* Color Swatch */}
                    <div className="mt-3.5 border-t border-brand/10 pt-3">
                      <div className="flex items-center justify-between text-[0.72rem]">
                        <span className="font-medium text-ink-soft">Warna Kelopak:</span>
                        <span className="font-bold text-brand-dark">{current.colorName}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {flower.colors.map((c) => {
                          const isColorActive = current.colorName === c.name;
                          return (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => updateColor(flower.id, c.name, c.hex)}
                              title={c.name}
                              className={`group relative flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
                                isColorActive
                                  ? "scale-110 border-brand shadow-xs ring-2 ring-brand/30"
                                  : "border-black/20 hover:scale-105"
                              }`}
                              style={{ backgroundColor: c.hex }}
                            >
                              {isColorActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-deep" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="mt-4 flex items-center justify-between border-t border-brand/10 pt-3">
                    <span className="text-xs font-medium text-ink-soft">Jumlah Tangkai:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(flower.id, -1)}
                        disabled={current.qty === 0}
                        aria-label={`Kurangi ${flower.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-brand/20 bg-cream-light font-display text-sm font-bold text-brand-dark transition-colors hover:bg-sprout-soft disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        &minus;
                      </button>
                      <span className="w-6 text-center font-display text-base font-bold text-ink">
                        {current.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(flower.id, 1)}
                        disabled={totalStems >= selectedSize.maxStems}
                        aria-label={`Tambah ${flower.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-cream shadow-xs transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 4: KARTU UCAPAN & DATA PEMESAN */}
        <div className="rounded-3xl border border-brand/15 bg-white p-6 shadow-xs sm:p-8">
          <span className="eyebrow text-sprout-dark">Langkah 4</span>
          <h2 className="mt-1 font-display text-2xl text-brand sm:text-3xl">
            Kartu Ucapan & Pengiriman
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Gratis kartu ucapan dengan pesan pribadimu untuk orang tersayang.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="card-text" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                Isi Pesan Kartu Ucapan (Gratis):
              </label>
              <textarea
                id="card-text"
                rows={3}
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                placeholder="Tulis pesanmu di sini (misal: Selamat hari kelulusan! Semoga senantiasa sukses)"
                className="mt-1.5 w-full rounded-xl border border-brand/20 bg-cream-light/40 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="client-name" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                  Nama Pemesan:
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="mt-1.5 w-full rounded-xl border border-brand/20 bg-cream-light/40 px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15"
                />
              </div>

              <div>
                <label htmlFor="client-phone" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                  No. WhatsApp:
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="mt-1.5 w-full rounded-xl border border-brand/20 bg-cream-light/40 px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15"
                />
              </div>
            </div>

            <div>
              <label htmlFor="client-address" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                Alamat Pengiriman (Opsional):
              </label>
              <textarea
                id="client-address"
                rows={2}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Alamat lengkap, nomor rumah, kecamatan, kota"
                className="mt-1.5 w-full rounded-xl border border-brand/20 bg-cream-light/40 px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15"
              />
            </div>

            <div>
              <label htmlFor="client-req" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                Catatan Khusus (Opsional):
              </label>
              <input
                id="client-req"
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="Contoh: minta wrapping nuansa pastel kalem / pita jangan terlalu panjang"
                className="mt-1.5 w-full rounded-xl border border-brand/20 bg-cream-light/40 px-3.5 py-2.5 text-sm text-ink focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: LIVE REAL-TIME FLORIST ARRANGEMENT PREVIEW */}
      <div className="space-y-6">
        <div className="sticky top-24 space-y-6">
          {/* Smart Arrangement Canvas */}
          <div className="overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-b from-cream via-cream-light to-sprout-soft/40 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-brand/10 pb-3">
              <div>
                <span className="font-display text-sm font-bold text-brand">
                  Simulasi Tata Letak Buket
                </span>
                <p className="text-[0.68rem] text-ink-soft">
                  Otomatis tersusun proporsional sesuai kaidah florist
                </p>
              </div>
              <span className="rounded-full bg-brand px-3 py-1 font-display text-xs font-bold text-cream">
                {selectedSize.name}
              </span>
            </div>

            {/* Visual Canvas Area */}
            <div className="relative mx-auto mt-6 flex min-h-[320px] w-full max-w-[300px] flex-col items-center justify-end pb-2">
              {totalStems === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-2">
                    <BotanicalSketch type="tulip" colorHex="#E78B7E" size={56} />
                  </div>
                  <p className="font-display text-base font-bold text-brand-dark">
                    Buket Masih Kosong
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    Pilih bunga di sebelah kiri untuk melihat buketmu otomatis tersusun di sini.
                  </p>
                </div>
              ) : (
                <div className="relative flex w-full flex-col items-center">
                  {/* Real-time flower bouquet cluster arranged by algorithm */}
                  <div className="relative -mb-10 flex h-48 w-full items-center justify-center">
                    {arrangedStems.map((stem) => (
                      <div
                        key={stem.key}
                        className="absolute transition-all duration-500 ease-out hover:scale-125"
                        style={{
                          transform: `translate(${stem.xOffset}px, ${stem.yOffset}px) rotate(${stem.rotation}deg) scale(${stem.scale})`,
                          zIndex: stem.zIndex,
                        }}
                      >
                        <BotanicalSketch
                          type={stem.flower.id}
                          colorHex={stem.colorHex}
                          size={stem.flower.role === "focal" ? 64 : 52}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Wrapper Sleeve based on style */}
                  {bouquetStyle === "standar" && (
                    <div className="relative z-30 w-full">
                      {/* Front-facing layered cone */}
                      <div
                        className="mx-auto h-32 w-52 rounded-b-[2.5rem] rounded-t-xl border shadow-sm transition-colors duration-300"
                        style={{
                          backgroundColor: selectedWrapping.hex,
                          borderColor: selectedWrapping.borderHex,
                        }}
                      >
                        <div className="flex h-full flex-col items-center justify-center p-2 text-center">
                          <span className="font-display text-xs font-bold tracking-wider text-brand-dark">
                            ARFLORA
                          </span>
                          <span className="text-[0.62rem] text-ink-soft">
                            {selectedWrapping.name}
                          </span>
                        </div>
                      </div>

                      {/* Ribbon */}
                      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-40">
                        <div className="flex items-center gap-1 rounded-full border border-brand/20 bg-white/95 px-3.5 py-1 text-[0.68rem] font-medium text-brand-dark shadow-xs backdrop-blur">
                          <span>Pita: {selectedRibbon}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {bouquetStyle === "round" && (
                    <div className="relative z-30 w-full">
                      {/* Round bouquet dome sleeve */}
                      <div
                        className="mx-auto h-24 w-44 rounded-full border shadow-sm transition-colors duration-300"
                        style={{
                          backgroundColor: selectedWrapping.hex,
                          borderColor: selectedWrapping.borderHex,
                        }}
                      >
                        <div className="flex h-full flex-col items-center justify-center p-2 text-center">
                          <span className="font-display text-xs font-bold text-brand-dark">
                            Round Bouquet 360°
                          </span>
                        </div>
                      </div>
                      <div className="mx-auto -mt-2 h-10 w-8 rounded-b-xl border border-brand/20 bg-[#F1E2C8]" />
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
                        <div className="rounded-full border border-brand/20 bg-white/95 px-3 py-0.5 text-[0.65rem] font-medium text-brand-dark shadow-xs">
                          <span>Pita: {selectedRibbon}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {bouquetStyle === "lepas" && (
                    <div className="relative z-30 mt-4 rounded-full border border-dashed border-brand/30 bg-white/90 px-4 py-1.5 text-xs font-medium text-brand-dark shadow-xs">
                      Tangkai Lepas (Tanpa Wrapping Buket)
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-brand/10 pt-3 text-[0.7rem] text-ink-soft">
              <span>Bunga Utama: Tengah</span>
              <span>Tulip/Lili: Sisi Samping</span>
              <span>Daisy: Sela & Atas</span>
            </div>
          </div>

          {/* Pricing & Order Breakdown */}
          <div className="rounded-3xl border border-brand/15 bg-white p-6 shadow-xs">
            <h3 className="font-display text-xl font-bold text-brand">
              Rincian Pemesanan
            </h3>

            <div className="mt-4 space-y-2 border-b border-brand/10 pb-4 text-xs">
              {itemsList.length === 0 ? (
                <p className="italic text-ink-soft">Belum ada bunga dipilih.</p>
              ) : (
                itemsList.map((it) => (
                  <div key={it.flower.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-ink">
                        {it.qty}x {it.flower.name}
                      </span>
                      <span className="ml-1.5 rounded-full bg-cream-light px-2 py-0.5 text-[0.65rem] font-medium text-brand-dark">
                        {it.colorName}
                      </span>
                    </div>
                    <span className="font-semibold text-ink-soft">
                      {formatRupiah(it.subtotal)}
                    </span>
                  </div>
                ))
              )}

              {bouquetStyle !== "lepas" && totalStems > 0 && (
                <div className="flex items-center justify-between text-brand-dark">
                  <span>Jasa Wrapping & Buket ({selectedSize.name})</span>
                  <span className="font-bold">+{formatRupiah(selectedSize.wrapPrice)}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-ink-soft">Total Estimasi:</span>
                <p className="font-display text-3xl font-extrabold text-brand-dark">
                  {formatRupiah(grandTotal)}
                </p>
              </div>
              <span className="rounded-full bg-sprout-soft px-3 py-1 text-xs font-bold text-brand-dark">
                {totalStems} / {selectedSize.maxStems} Tangkai
              </span>
            </div>

            {/* WhatsApp Checkout Button */}
            <div className="mt-6">
              <a
                href={totalStems > 0 ? whatsappUrl : "#"}
                target={totalStems > 0 ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (totalStems === 0) {
                    e.preventDefault();
                    alert("Silakan pilih minimal 1 tangkai bunga untuk memesan.");
                  }
                }}
                className={`flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-center font-display text-sm font-semibold shadow-md transition-all ${
                  totalStems > 0
                    ? "bg-brand text-cream shadow-brand/20 hover:scale-[1.01] hover:bg-brand-dark hover:shadow-lg"
                    : "cursor-not-allowed bg-black/10 text-ink-soft opacity-60"
                }`}
              >
                <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.122-.52-1.825-.757-3.003-2.617-3.094-2.738-.09-.12-0.741-.987-.741-1.884 0-.897.469-1.339.636-1.518.167-.18.365-.225.487-.225.121 0 .243.002.348.007.111.005.259-.042.405.31.149.362.51 1.244.554 1.334.045.09.075.195.015.315-.059.12-.089.195-.178.299-.089.105-.188.234-.268.315-.09.09-.184.188-.079.368.105.18.468.772 1.004 1.25.688.614 1.269.805 1.449.895.18.09.285.075.39-.045.105-.12.45-.524.57-.704.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84z"/>
                </svg>
                <span>Pesan Rangkaian via WhatsApp</span>
              </a>
              <p className="mt-2.5 text-center text-[0.68rem] text-ink-soft">
                Pesan WhatsApp otomatis terangkum dengan rincian ukuran buket, bunga, warna, wrapping, dan kartu ucapan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
