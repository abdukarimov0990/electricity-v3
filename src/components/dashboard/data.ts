// BEAP dashboard (het.mysrv.uz) ma'lumotlari - bizning stilda ko'rsatiladi.
// Barcha vaqt qatorlari DETERMINISTIK (Math.random yo'q) - SSR va klient bir xil
// bo'lishi (hydration mos) uchun.

export const context = {
  scope: "Sarnaul MFY",
  breadcrumb: ["NIM stansiya Chinobod", "Baliqchi Elektraset", "Sarnaul MFY"],
  period: "iyul, 2026",
  asOf: "31-iyul, 2026",
  updatedAt: "6-sentabr, 2026 18:30",
};

export const efficiency = {
  score: 91,
  max: 100,
  mood: "Yaxshi",
  prevMonth: 90,
  deltaPct: 0.8,
  target: "90+",
};

export const aiAdvice = {
  title: "AI tavsiya (bugun)",
  text: "Yo'qotish normadan yuqori: 8.7%. Normativ daraja - 8.0%.",
};

// --- Deterministik qator generatori -----------------------------------------
export function series(n: number, base: number, amp: number, seed: number): number[] {
  return Array.from({ length: n }, (_, i) =>
    Math.round(
      base +
        amp * Math.sin(i * 0.7 + seed) +
        amp * 0.35 * Math.sin(i * 1.9 + seed * 1.7) +
        amp * 0.15 * Math.sin(i * 3.3 + seed),
    ),
  );
}

// --- Dashboard KPI kartalari (8 ta) -----------------------------------------
export type KpiTone = "blue" | "green" | "red" | "amber" | "violet";
export type Trend = "up" | "down" | "flat";

export interface Kpi {
  key: string;
  label: string;
  value: string;
  unit: string;
  icon: string; // lucide nomi
  tone: KpiTone;
  trend: Trend;
  change: string; // masalan "10.4 ming kWh"
  changePct: string; // "4.9%"
  prev: string; // "iyun, 2026: 213.2 ming kWh"
  spark: number[];
  spanLabel: string; // "30 kun" / "12 oy"
  highlight?: boolean;
}

export const kpis: Kpi[] = [
  {
    key: "jami-istemol",
    label: "Jami iste'mol",
    value: "223.6",
    unit: "ming kWh",
    icon: "Zap",
    tone: "blue",
    trend: "up",
    change: "10.4 ming kWh",
    changePct: "4.9%",
    prev: "iyun, 2026: 213.2 ming kWh",
    spark: series(30, 210, 18, 1),
    spanLabel: "30 kun",
  },
  {
    key: "sotilgan",
    label: "Sotilgan elektr energiyasi",
    value: "204.8",
    unit: "ming kWh",
    icon: "BadgeDollarSign",
    tone: "green",
    trend: "up",
    change: "8,813 kWh",
    changePct: "4.5%",
    prev: "iyun, 2026: 196.0 ming kWh",
    spark: series(30, 195, 16, 2),
    spanLabel: "30 kun",
  },
  {
    key: "jami-yoqotish",
    label: "Jami yo'qotish",
    value: "18.8",
    unit: "ming kWh",
    icon: "TrendingDown",
    tone: "red",
    trend: "up",
    change: "1,556 kWh",
    changePct: "9.0%",
    prev: "iyun, 2026: 17.2 ming kWh",
    spark: series(30, 17, 3, 3),
    spanLabel: "30 kun",
  },
  {
    key: "texnologik-yoqotish",
    label: "Texnologik yo'qotish",
    value: "6,955",
    unit: "kWh",
    icon: "Cpu",
    tone: "blue",
    trend: "up",
    change: "605 kWh",
    changePct: "9.5%",
    prev: "iyun, 2026: 6,350 kWh",
    spark: series(30, 6400, 500, 4),
    spanLabel: "30 kun",
  },
  {
    key: "umumiy-abonent",
    label: "Umumiy abonentlar",
    value: "788",
    unit: "ta",
    icon: "Users",
    tone: "red",
    trend: "up",
    change: "1 ta",
    changePct: "0.1%",
    prev: "iyun, 2026: 787 ta",
    spark: series(12, 780, 10, 5),
    spanLabel: "12 oy",
  },
  {
    key: "aloqaga-chiqmaydigan",
    label: "Aloqaga chiquvchi istemolchilar",
    value: "778",
    unit: "ta",
    icon: "UserCheck",
    tone: "blue",
    trend: "down",
    change: "5 ta",
    changePct: "0.6%",
    prev: "iyun, 2026: 783 ta",
    spark: series(12, 775, 8, 6),
    spanLabel: "12 oy",
  },
  {
    key: "aloqaga-chiqmayotgan",
    label: "Aloqaga chiqmayotgan istemolchilar",
    value: "10",
    unit: "ta",
    icon: "UserX",
    tone: "amber",
    trend: "up",
    change: "6 ta",
    changePct: "150.0%",
    prev: "iyun, 2026: 4 ta",
    spark: series(12, 6, 3, 7),
    spanLabel: "12 oy",
    highlight: true,
  },
  {
    key: "transformatorlar",
    label: "Transformatorlar",
    value: "13",
    unit: "ta",
    icon: "Boxes",
    tone: "violet",
    trend: "flat",
    change: "o'zgarmadi",
    changePct: "0.0%",
    prev: "iyun, 2026: 13 ta",
    spark: series(12, 13, 1, 8),
    spanLabel: "12 oy",
  },
];

// --- Iste'mol va yo'qotish grafigi (30 kun) ---------------------------------
export const consumptionChart = {
  labels: Array.from({ length: 30 }, (_, i) => `${i + 1}-iyul`),
  incoming: series(30, 7000, 500, 11), // Tarmoqqa kirgan
  sold: series(30, 6350, 450, 12), // Sotilgan
  loss: series(30, 650, 90, 13), // Yo'qotish
  today: { incoming: 7117, sold: 6482, loss: 634, lossPct: "8.9%" },
  yesterday: { loss: 697, lossPct: "9.4%" },
};

// --- Aniqlangan qoidabuzarliklar --------------------------------------------
export const violationsPeriod = "avgust, 2025 - iyul, 2026 · jami 1 ta dalolatnoma";
export const violations = [
  { key: "maishiy", label: "Maishiy", detail: "9,276 kWh · 1 ta aniqlangan", amount: "0.8 mln so'm", icon: "FileWarning" },
  { key: "jinoiy", label: "Jinoiy", detail: "jarima solinmagan · 0 ta", amount: "—", icon: "Gavel" },
  { key: "istemol", label: "Iste'mol", detail: "jarima solinmagan · 0 ta", amount: "—", icon: "ShieldCheck" },
];

// --- O'ng ustun kartalari ----------------------------------------------------
export const sideCards = [
  { key: "yuridik", label: "Yuridik iste'molchilar", value: "34", unit: "ta", sub: "Jami: 788 ta", subDelta: "↑ 1 ta", icon: "Building2" },
  { key: "ortacha-istemol", label: "O'rtacha iste'mol", value: "8.8", unit: "kWh/kun", sub: "Faol: 778 ta", icon: "Activity" },
  { key: "ortacha-hisob", label: "O'rtacha hisob", value: "118,458", unit: "so'm", sub: "taxminiy tarif bo'yicha", icon: "Wallet" },
  { key: "texnologik", label: "Texnologik yo'qotish", value: "16.0", unit: "ming kWh", sub: "Ulushi: 85.2%", icon: "TrendingDown" },
];

// --- Transformatorlar jadvali ------------------------------------------------
export interface TransformerRow {
  no: number;
  code: string;
  meter: string;
  coeff: string;
  consumers: string;
  online: string;
  offline: string;
  monthly: string;
  share: string;
}

export const transformerSummary = {
  total: 578,
  consumers: 0,
  monthly: 0,
};

export const transformers: TransformerRow[] = Array.from({ length: 24 }, (_, i) => {
  const isNs = i < 4;
  const code = isNs
    ? `NS-0${i + 1}`
    : `TR-0${101 + (i - 4)}`;
  // Namuna maketda ma'lumotlar bo'sh ("-") ko'rsatilgan.
  return {
    no: i + 1,
    code,
    meter: "—",
    coeff: "—",
    consumers: "—",
    online: "—",
    offline: "—",
    monthly: "—",
    share: "—",
  };
});

// --- Energiya balansi --------------------------------------------------------
export const balanceKpis = [
  { key: "kirgan", label: "Tarmoqqa kirgan", value: "12.1", unit: "mln kWh", sub: "fider hisoblagichi bo'yicha", icon: "Zap", tone: "blue" as KpiTone },
  { key: "sotilgan", label: "Sotilgan energiya", value: "11.1", unit: "mln kWh", sub: "Ulushi: 91.3%", icon: "ShoppingCart", tone: "green" as KpiTone },
  { key: "yoqotish", label: "Jami yo'qotish", value: "1.1", unit: "mln kWh", sub: "Yo'qotish darajasi: 8.73%", icon: "TrendingDown", tone: "red" as KpiTone },
  { key: "foydali", label: "Foydali uzatish", value: "91.27", unit: "%", sub: "tarmoqqa kirgan energiyaga nisbatan", icon: "ArrowRight", tone: "green" as KpiTone },
];

export const balanceFlow = {
  source: { label: "Tarmoqqa kirgan energiya", value: "12.1 mln kWh", pct: 100 },
  branches: [
    { key: "sold", label: "Sotilgan energiya", value: "11.1 mln kWh", pct: 91.3, color: "#007CD2" },
    { key: "natural", label: "Tabiiy yo'qotish", value: "492.7 ming kWh", pct: 4.1, color: "#A9B0B8" },
    { key: "tech", label: "Texnik yo'qotish", value: "403.1 ming kWh", pct: 3.3, color: "#E0A54A" },
    { key: "illegal", label: "Noqonuniy foydalanish", value: "161.0 ming kWh", pct: 1.3, color: "#E0533D" },
  ],
};

export const balanceComposition = [
  { key: "kirgan", label: "Tarmoqqa kirgan energiya", energy: "12.1 mln kWh", share: "100.0%", root: true },
  { key: "sotilgan", label: "Sotilgan energiya", energy: "11.1 mln kWh", share: "91.3%", root: true },
  { key: "tabiiy", label: "Tabiiy yo'qotish", energy: "492.7 ming kWh", share: "4.1%", child: true },
  { key: "texnik", label: "Texnik yo'qotish", energy: "403.1 ming kWh", share: "3.3%", child: true },
  { key: "noqonuniy", label: "Noqonuniy foydalanish", energy: "161.0 ming kWh", share: "1.3%", child: true },
];

export const balanceDynamics = {
  labels: Array.from({ length: 90 }, (_, i) => `${i + 1}`),
  incoming: series(90, 400000, 22000, 21),
  sold: series(90, 365000, 20000, 22),
  loss: series(90, 34000, 4000, 23),
};

// --- Rejalashtirilgan ishlar -------------------------------------------------
export interface WorkItem {
  key: string;
  title: string;
  type: string;
  amount: string;
  progress: number;
  status: "jarayonda" | "reja" | "bajarilgan";
}

export const works = {
  counts: { reja: 10, jarayonda: 14, bajarilgan: 36 },
  jarayonda: [
    { key: "w1", title: "Yangi transformator o'rnatish", type: "Transformator o'rnatish", amount: "1.8 ta", progress: 51, status: "jarayonda" as const },
    { key: "w2", title: "Havo liniyasini yangilash", type: "Havo liniyasini yangilash", amount: "3.1 km", progress: 73, status: "jarayonda" as const },
    { key: "w3", title: "0.4 kV kabel liniyasini almashtirish", type: "Kabel almashtirish", amount: "1.6 km", progress: 23, status: "jarayonda" as const },
    { key: "w4", title: "Hisoblagichlarni modernizatsiya qilish", type: "Hisoblagich almashtirish", amount: "120 ta", progress: 64, status: "jarayonda" as const },
    { key: "w5", title: "Yoritish tarmog'ini ta'mirlash", type: "Ta'mirlash", amount: "2.4 km", progress: 38, status: "jarayonda" as const },
  ],
  reja: [
    { key: "p1", title: "Podstansiya rekonstruksiyasi", type: "Rekonstruksiya", amount: "1 ta", progress: 0, status: "reja" as const },
    { key: "p2", title: "Yangi TP qurish", type: "Qurilish", amount: "3 ta", progress: 0, status: "reja" as const },
    { key: "p3", title: "SIP simlarga o'tkazish", type: "Modernizatsiya", amount: "5.0 km", progress: 0, status: "reja" as const },
  ],
};

// --- Hisobotlar --------------------------------------------------------------
export const reportPeriods = ["Kunlik", "Haftalik", "Oylik", "Choraklik", "Yillik"];
export const reportNote =
  "Hisobot tanlangan davrdagi fider balansi, yo'qotish tarkibi, transformatorlar va abonentlar ko'rsatkichlarini qamrab oladi.";
