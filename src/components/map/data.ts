// Xarita sahifasi ma'lumotlari - Figma "Map -> main" (node 3947:167) ga mos.
// Har bir joylashuvning o'z koordinatasi va o'z paneli ma'lumoti bor: chapdagi
// tugma bosilganda xarita o'sha nuqtaga uchadi va aynan o'sha joyning
// ma'lumoti o'ng panelda ko'rsatiladi.

export type LocationKind = "feeder" | "tp";
export type StatIcon = "feeder" | "circuit" | "users" | "hand";

export interface StationStat {
  label: string;
  value: string;
  icon: StatIcon;
  danger?: boolean;
}

export interface DonutSegment {
  key: string;
  label: string;
  value: number;
  display: string;
  color: string;
}

export interface TopConsumer {
  id: string;
  label: string;
  value: string;
}

export interface StationData {
  title: string;
  gallery: string[];
  stats: StationStat[];
  donut: DonutSegment[];
  operator: string;
  topConsumers: TopConsumer[];
}

// --- Ierarxiya: Fider -> TP -> Abonent --------------------------------------

export interface Abonent {
  id: string;
  name: string;
  avatar: string;
  kind: "Yuridik" | "Jismoniy";
  status: "Aloqada" | "Aloqadamas";
  meter: string;
  address: string;
  phone: string;
  tariff: string;
  balance: string;
  balancePositive: boolean;
  monthly: string;
  monthlyDelta: string;
  monthlyUp: boolean;
  consumption: number[]; // oxirgi 12 oy, kWh
  payments: { date: string; amount: string }[];
  lat: number;
  lng: number;
}

export interface Tp {
  id: string;
  label: string;
  lat: number;
  lng: number;
  zoom: number;
  data: StationData;
  abonents: Abonent[];
}

export interface Feeder {
  id: string;
  label: string;
  lat: number;
  lng: number;
  zoom: number;
  data: StationData;
  tps: Tp[];
}

// --- Ranglar (Figma'dan) ------------------------------------------------------
export const DONUT_BLUE = "#467ACF";
export const DONUT_GREEN = "#46CF61";
export const DONUT_RED = "#CF4646";

// --- Rasmlar ------------------------------------------------------------------
// Figma thumbnail tartibi: station-1, station-3, station-2, station-4.
const GALLERY = [
  "/map/station-1.png",
  "/map/station-3.png",
  "/map/station-2.png",
  "/map/station-4.png",
];

// Ming ajratgichi (deterministik - hydration mos): 25133 -> "25,133".
const th = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// O'nlik (vergul bilan): 3021 -> "302,1".
const dec1 = (n: number) => (n / 10).toFixed(1).replace(".", ",");

function makeStation(
  i: number,
  title: string,
  seedConsumers: [string, number][],
): StationData {
  const fiders = Math.max(1, 23 - i * 3);
  const transformers = 3123 - i * 137;
  const abonents = 25133 - i * 1750;
  const violations = Math.max(0, 5 - i);

  const hisob = 1234 - i * 87;
  const istemol = Math.round(hisob * 0.8266);
  const yoqotish = hisob - istemol;
  const mln = (n: number) => `${th(Math.floor(n / 1000))},${(n % 1000)
    .toString()
    .padStart(3, "0")} mln KwH`;

  return {
    title,
    gallery: GALLERY.slice(i % 4).concat(GALLERY.slice(0, i % 4)),
    stats: [
      { label: "Fiderlar", value: `${fiders} ta`, icon: "feeder" },
      { label: "Transformatorlar", value: `${th(transformers)} ta`, icon: "circuit" },
      { label: "Abonentlar", value: `${th(abonents)} ta`, icon: "users" },
      {
        label: "Qoidabuzarliklar",
        value: `${violations} ta`,
        icon: "hand",
        danger: true,
      },
    ],
    donut: [
      { key: "hisoblangan", label: "Hisoblangan", value: hisob, display: mln(hisob), color: DONUT_BLUE },
      { key: "istemol", label: "Iste'mol", value: istemol, display: mln(istemol), color: DONUT_GREEN },
      { key: "yoqotish", label: "Yo'qotish", value: yoqotish, display: mln(yoqotish), color: DONUT_RED },
    ],
    operator: "Yaxyobek Xabibulloyev",
    topConsumers: seedConsumers.map(([label, v], idx) => ({
      id: `${title}-${idx}`,
      label,
      value: `${dec1(v)} ming KwH`,
    })),
  };
}

// --- Abonent generatori (deterministik) -------------------------------------

// Jinsga qarab ism va demo foto.
const FEMALE: [string, string][] = [
  ["Dilnoza", "Rahimova"], ["Nodira", "Saidova"], ["Feruza", "Ergasheva"],
  ["Gulnora", "Yusupova"], ["Ozoda", "Qodirova"], ["Malika", "Islomova"],
];
const MALE: [string, string][] = [
  ["Alisher", "Karimov"], ["Bobur", "Toshmatov"], ["Sardor", "Aliyev"],
  ["Jasur", "Umarov"], ["Otabek", "Nazarov"], ["Aziz", "Xolmatov"],
];
const FEMALE_PHOTO = "/map/abonent-female.jpg";
const MALE_PHOTO = "/map/abonent-male.jpg";
const STREETS = ["Navoiy", "Amir Temur", "Mustaqillik", "Bobur", "Chinobod"];
const OFF: [number, number][] = [
  [0.0009, 0.0011], [-0.0011, 0.0007], [0.0007, -0.0012],
];

const money = (n: number) => `${th(Math.abs(n))} so'm`;
const shortName = (s: string) => (s.length > 15 ? `${s.slice(0, 14)}…` : s);

function makeAbonents(
  tpId: string,
  tpLat: number,
  tpLng: number,
  count: number,
  seed: number,
): Abonent[] {
  return Array.from({ length: count }, (_, i) => {
    const g = seed * 5 + i * 3;
    const female = (seed + i) % 2 === 1;
    // Bir TP ichida bir xil jinsli abonentlar (i=0,2) turli ismga ega bo'lsin.
    const [fn, ln] = (female ? FEMALE : MALE)[(seed * 2 + i) % 6]!;
    const base = 200 + (g % 6) * 22;
    const amp = 45 + (g % 4) * 12;
    const consumption = Array.from({ length: 12 }, (_, m) =>
      Math.round(
        base + amp * Math.sin(m * 0.7 + g) + amp * 0.4 * Math.sin(m * 1.9 + g),
      ),
    );
    const monthly = consumption[11]!;
    const prev = consumption[10]!;
    const deltaPct = (((monthly - prev) / prev) * 100)
      .toFixed(1)
      .replace("-", "")
      .replace(".", ",");
    const bal = ((g % 5) - 2) * 32400;
    const off = OFF[i % OFF.length]!;
    return {
      id: `${tpId}-ab${i + 1}`,
      name: `${fn} ${ln}`,
      avatar: female ? FEMALE_PHOTO : MALE_PHOTO,
      kind: "Jismoniy",
      status: (seed * 3 + i) % 5 === 0 ? "Aloqadamas" : "Aloqada",
      meter: `UZ${10402000 + g * 137}`,
      address: `${STREETS[g % STREETS.length]} ko'chasi ${1 + ((g * 7) % 80)}-uy`,
      phone: `+998 9${(g % 8) + 1} ${100 + ((g * 13) % 899)}-${10 + ((g * 7) % 89)}-${10 + ((g * 3) % 89)}`,
      tariff: "450 so'm/kWh",
      balance: `${bal >= 0 ? "+" : "−"}${money(bal)}`,
      balancePositive: bal >= 0,
      monthly: `${th(monthly)} kWh`,
      monthlyDelta: `${monthly >= prev ? "↑" : "↓"} ${deltaPct}%`,
      monthlyUp: monthly >= prev,
      consumption,
      payments: [
        { date: "iyul, 2026", amount: money(140_000 + (g % 5) * 8000) },
        { date: "iyun, 2026", amount: money(128_000 + (g % 4) * 7000) },
        { date: "may, 2026", amount: money(132_000 + (g % 3) * 6000) },
      ],
      lat: tpLat + off[0],
      lng: tpLng + off[1],
    };
  });
}

// TP ma'lumoti - StationData, lekin TP miqyosidagi statistikalar bilan.
function makeTpData(
  idx: number,
  title: string,
  abonents: Abonent[],
): StationData {
  const d = makeStation(idx, title, []);
  // TP rasmi feeder'dan farqlanadi (asosiy rasm - taqsimlash transformatori).
  d.gallery = [
    "/map/tp.jpg",
    "/map/station-2.png",
    "/map/station-4.png",
    "/map/station-3.png",
  ];
  d.stats = [
    { label: "Fiderlar", value: "1 ta", icon: "feeder" },
    { label: "Transformatorlar", value: "1 ta", icon: "circuit" },
    { label: "Abonentlar", value: `${abonents.length} ta`, icon: "users" },
    {
      label: "Qoidabuzarliklar",
      value: `${abonents.filter((a) => a.status === "Aloqadamas").length} ta`,
      icon: "hand",
      danger: true,
    },
  ];
  d.topConsumers = [...abonents]
    .sort((a, b) => b.consumption[11]! - a.consumption[11]!)
    .slice(0, 3)
    .map((a, i) => ({
      id: `${title}-c${i}`,
      label: shortName(a.name),
      value: `${th(a.consumption[11]!)} kWh`,
    }));
  return d;
}

// Chinobod (Baliqchi tumani, Andijon viloyati) hududi.
const FEEDER0_TPS: [string, string, number, number, number, number][] = [
  ["tp-a303", "TP A303", 40.8846, 71.9701, 16, 3],
  ["tp-a31", "TP A31", 40.8827, 71.9884, 16, 3],
  ["tp-a03", "TP A03", 40.8806, 71.9955, 16, 3],
  ["tp-a321", "TP A321", 40.8757, 71.9726, 16, 3],
  ["tp-a32-1", "TP A32", 40.8734, 71.9866, 16, 3],
  ["tp-a32-2", "TP A32", 40.8712, 71.9664, 16, 3],
  ["tp-a32-3", "TP A32", 40.869, 71.9906, 16, 3],
];

export const feeders: Feeder[] = [
  {
    id: "f-xaqulobod",
    label: "Xaqulobod fider",
    lat: 40.8789,
    lng: 71.9792,
    zoom: 14,
    data: makeStation(0, "A374 - 3B Podstansiyasi", [
      ["TP A303", 3021],
      ["TP B86", 1502],
      ["TP 43", 302],
    ]),
    tps: FEEDER0_TPS.map(([id, label, lat, lng, zoom, count], idx) => {
      const abonents = makeAbonents(id, lat, lng, count, idx + 1);
      return {
        id,
        label,
        lat,
        lng,
        zoom,
        data: makeTpData(idx + 1, `${label} punkti`, abonents),
        abonents,
      };
    }),
  },
];

export const mapCenter = { lat: feeders[0]!.lat, lng: feeders[0]!.lng };
export const mapZoom = feeders[0]!.zoom;
