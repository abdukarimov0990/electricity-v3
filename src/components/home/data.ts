// Home (Asosiy) dashboard ma'lumotlari - Figma "wrapper" (node 4029:931).
// Barcha qatorlar DETERMINISTIK (hydration mos).

export function bars(n: number, seed: number): number[] {
  // 0..1 oralig'idagi ustun balandliklari.
  return Array.from({ length: n }, (_, i) => {
    const v =
      0.55 +
      0.4 * Math.sin(i * 0.9 + seed) +
      0.25 * Math.sin(i * 2.3 + seed * 1.7) +
      0.12 * Math.sin(i * 4.1 + seed);
    return Math.max(0.12, Math.min(1, (v + 1) / 2 + 0.1));
  });
}

// --- Bo'limlar (chap nav) ----------------------------------------------------
export type SectionIcon =
  | "asosiy" | "podstansiya" | "fider" | "transformer" | "abonent" | "qoida";

export const sections: { key: string; label: string; icon: SectionIcon }[] = [
  { key: "asosiy", label: "Asosiy", icon: "asosiy" },
  { key: "podstansiya", label: "Podstansiyalar", icon: "podstansiya" },
  { key: "fider", label: "Fiderlar", icon: "fider" },
  { key: "transformer", label: "Transformatorlar", icon: "transformer" },
  { key: "abonent", label: "Abonentlar", icon: "abonent" },
  { key: "qoida", label: "Qoidabuzarliklar", icon: "qoida" },
];

// --- KPI kartalari (6) -------------------------------------------------------
export interface Kpi {
  key: string;
  title: string;
  icon: string;
  bg: string;
  badge: string;
  bar: string;
  value: string;
  unit: string;
  deltaIcon: string;
  delta: string;
  deltaColor: string;
  prev: string;
  span: string;
  barCount: number;
}

export const kpis: Kpi[] = [
  {
    key: "hisoblangan", title: "Hisoblangan", icon: "Zap",
    bg: "#EFF6FF", badge: "#3B82F6", bar: "#42A5F5",
    value: "220,1", unit: "ming kWh",
    deltaIcon: "ArrowUp", delta: "28,2 ming kWh ga ko'p", deltaColor: "#CF4646",
    prev: "O'tgan oy: 198,1 kWh", span: "30 kun", barCount: 30,
  },
  {
    key: "istemol", title: "Iste'mol", icon: "PlugZap",
    bg: "#EFFFF0", badge: "#22C55E", bar: "#22C55E",
    value: "190,5", unit: "ming kWh",
    deltaIcon: "ArrowDown", delta: "10,5 ming kWh ga kam", deltaColor: "#31AE5F",
    prev: "O'tgan oy: 180,0 kWh", span: "30 kun", barCount: 30,
  },
  {
    key: "yoqotish", title: "Yo'qotish", icon: "ZapOff",
    bg: "#FFEFEF", badge: "#FF383C", bar: "#FF383C",
    value: "30,4", unit: "ming kWh",
    deltaIcon: "ArrowDown", delta: "5,5 ming kWh ga kam", deltaColor: "#31AE5F",
    prev: "O'tgan oy: 35,9 kWh", span: "30 kun", barCount: 30,
  },
  {
    key: "abonent", title: "Abonentlar", icon: "Users",
    bg: "#FEEFFF", badge: "#CB30E0", bar: "#CB30E0",
    value: "2,253", unit: "ta umumiy",
    deltaIcon: "UserMinus", delta: "25 ta aloqada emas", deltaColor: "#CF4646",
    prev: "O'tgan oy: 2,227 ta", span: "12 oy", barCount: 12,
  },
  {
    key: "transformer", title: "Transformatorlar", icon: "CircuitBoard",
    bg: "#F3EFFF", badge: "#6155F5", bar: "#6155F5",
    value: "50", unit: "ta faol",
    deltaIcon: "SquareAlert", delta: "1 ta nofaol", deltaColor: "#CF4646",
    prev: "O'tgan oy: 51 ta", span: "12 oy", barCount: 12,
  },
  {
    key: "qarzdorlik", title: "Qarzdorlik", icon: "HandCoins",
    bg: "#FFF5EF", badge: "#AC7F5E", bar: "#AC7F5E",
    value: "42,1", unit: "mln so'm",
    deltaIcon: "ArrowDown", delta: "14,7 mln so'm ga kam", deltaColor: "#31AE5F",
    prev: "O'tgan oy: 56,8 mln so'm", span: "12 oy", barCount: 12,
  },
];

// --- Iste'mol dinamikasi (line chart) ---------------------------------------
export const consumption = {
  hisoblangan: bars(30, 1).map((v) => 40 + v * 55),
  istemol: bars(30, 5).map((v) => 30 + v * 50),
  yoqotish: bars(30, 9).map((v) => 6 + v * 22),
  legend: [
    { key: "hisoblangan", label: "Hisoblangan", value: "1,234 mln kWh", color: "#3B82F6" },
    { key: "istemol", label: "Iste'mol", value: "1,020 mln kWh", color: "#22C55E" },
    { key: "yoqotish", label: "Yo'qotish", value: "0,214 mln kWh", color: "#EF4444" },
  ],
};

// --- Qoidabuzarliklar --------------------------------------------------------
export const violations = [
  { key: "mamuriy", label: "Ma'muriy holat", value: "4 ta", icon: "FileWarning", color: "#F59E0B", bg: "#FFF6E6" },
  { key: "jinoiy", label: "Jinoiy holat", value: "1 ta", icon: "Gavel", color: "#EF4444", bg: "#FDECEC" },
  { key: "aybsiz", label: "Aybsiz", value: "3 ta", icon: "ShieldCheck", color: "#22C55E", bg: "#E9F9F0" },
];

// --- Mas'ul xodim ------------------------------------------------------------
export const responsible = {
  name: "Karimov Egamberdi",
  phone: "+998 20 007 77 83",
  avatar: "/map/abonent-male.jpg",
};

// --- Eng ko'p sarfga ega transformatorlar -----------------------------------
export type TStatus = "Faol" | "Nofaol" | "Ta'mirda";
export const topTransformers: {
  name: string; status: TStatus; calc: string; use: string; loss: string;
}[] = [
  { name: "TP-001", status: "Faol", calc: "51,5 ming", use: "41,4 ming", loss: "10,1 ming" },
  { name: "TP-002", status: "Faol", calc: "41,2 ming", use: "31,3 ming", loss: "10,0 ming" },
  { name: "TP-003", status: "Nofaol", calc: "40,6 ming", use: "30,0 ming", loss: "10,6 ming" },
  { name: "TP-004", status: "Faol", calc: "31,3 ming", use: "21,3 ming", loss: "10,0 ming" },
  { name: "TP-005", status: "Ta'mirda", calc: "15,1 ming", use: "8,1 ming", loss: "7,0 ming" },
];

// --- Radial chartlar (segmentli halqalar) -----------------------------------
export const debt = {
  title: "Qarzdorlik",
  segments: [
    { key: "umumiy", label: "Umumiy", value: "361,7 mln so'm", pct: 100, color: "#6155F5" },
    { key: "yuridik", label: "Yuridik", value: "100,1 mln so'm", pct: 28, color: "#F59E0B" },
    { key: "aholi", label: "Aholi", value: "261,6 mln so'm", pct: 72, color: "#EF4444" },
  ],
};
export const lossShare = {
  title: "Yo'qotish zarari",
  segments: [
    { key: "tabiiy", label: "Tabiiy", value: "161,7 mln so'm", pct: 59, color: "#22C55E" },
    { key: "texnologik", label: "Texnologik", value: "61,6 mln so'm", pct: 22, color: "#F59E0B" },
    { key: "ogirlik", label: "O'g'irlik", value: "50,1 mln so'm", pct: 18, color: "#EF4444" },
  ],
};

// --- Interaktiv ko'rinish (mini map) ----------------------------------------
export const miniMap = {
  center: { lat: 40.8789, lng: 71.9792 },
  zoom: 14,
  marker: { id: "tp-a303", lat: 40.8846, lng: 71.9701, label: "TP A303" },
  popup: {
    title: "Yuqori sarfga ega transformator",
    tp: "TP A303",
    use: "Bu oy iste'mol 51,5 ming kWh",
    warn: "Ushbu transformatorda iste'mol 20,1 ming kWh ga ko'p bo'lgan.",
  },
};

// --- Tezkor ko'rsatkichlar ---------------------------------------------------
export const quickStats = [
  { key: "iste", label: "Kunlik o'rtacha iste'mol", value: "15,2 ming kWh", icon: "Zap", color: "#3B82F6", bg: "#EEF4FB" },
  { key: "loss", label: "Kunlik o'rtacha yo'qotish", value: "3,3 ming kWh", icon: "TrendingDown", color: "#EF4444", bg: "#FDECEC" },
  { key: "nofaol", label: "Nofaol transformatorlar", value: "1 ta", icon: "CircuitBoard", color: "#F59E0B", bg: "#FFF6E6" },
  { key: "pik", label: "Pik iste'mol vaqti", value: "19:30 - 21:00", icon: "Clock", color: "#8B5CF6", bg: "#F1ECFD" },
  { key: "reja", label: "Reja bajarilishi", value: "89,1%", icon: "SquareCheckBig", color: "#22C55E", bg: "#E9F9F0" },
];

// --- Ishlar jadvallari -------------------------------------------------------
export const doneWorks = [
  { tp: "TP-01", work: "Xatlov o'tkazish", date: "21-avgust, 2026" },
  { tp: "TP-004", work: "Toka transformatorni ta'mirlash", date: "1-avgust, 2026" },
  { tp: "TP-005", work: "Hisoblagich o'rnatish", date: "18-avgust, 2026" },
];

export type PlanStatus = "Yangi" | "Bajarilmoqda" | "Rejada";
export const plannedWorks: {
  tp: string; work: string; status: PlanStatus; date: string;
}[] = [
  { tp: "TP-A303", work: "Transformatorni tekshirish", status: "Yangi", date: "7-sentabr, 2026" },
  { tp: "TP-33", work: "Toka transformatorni ta'mirlash", status: "Bajarilmoqda", date: "23-avgust, 2026" },
  { tp: "TP-08", work: "Hisoblagich chipini almashtirish. Hamda, qayta texnik ko'…", status: "Rejada", date: "Bugun" },
];

// --- Hisobotlar --------------------------------------------------------------
export const reportPeriods = [
  { label: "Kunlik", color: "#3B82F6" },
  { label: "Haftalik", color: "#22C55E" },
  { label: "Oylik", color: "#8B5CF6" },
  { label: "Yillik", color: "#EF4444" },
];
