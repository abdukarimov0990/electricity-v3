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

export interface MapLocation {
  id: string;
  kind: LocationKind;
  label: string;
  lat: number;
  lng: number;
  zoom: number;
  data: StationData;
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

// Chinobod / Kiyali hududi (Farg'ona vodiysi) - taxminiy koordinatalar.
export const locations: MapLocation[] = [
  {
    id: "f-xaqulobod",
    kind: "feeder",
    label: "Xaqulobod fider",
    lat: 40.9515,
    lng: 71.715,
    zoom: 14,
    data: makeStation(0, "A374 - 3B Podstansiyasi", [
      ["TP A303", 3021],
      ["TP B86", 1502],
      ["TP 43", 302],
    ]),
  },
  {
    id: "tp-a303",
    kind: "tp",
    label: "TP A303",
    lat: 40.9605,
    lng: 71.706,
    zoom: 16,
    data: makeStation(1, "TP A303 punkti", [
      ["TP A303", 2890],
      ["TP A19", 1204],
      ["TP 12", 268],
    ]),
  },
  {
    id: "tp-a31",
    kind: "tp",
    label: "TP A31",
    lat: 40.9578,
    lng: 71.723,
    zoom: 16,
    data: makeStation(2, "TP A31 punkti", [
      ["TP A31", 2610],
      ["TP C40", 1130],
      ["TP 8", 244],
    ]),
  },
  {
    id: "tp-a03",
    kind: "tp",
    label: "TP A03",
    lat: 40.9562,
    lng: 71.735,
    zoom: 16,
    data: makeStation(3, "TP A03 punkti", [
      ["TP A03", 2350],
      ["TP D21", 980],
      ["TP 5", 190],
    ]),
  },
  {
    id: "tp-a321",
    kind: "tp",
    label: "TP A321",
    lat: 40.9524,
    lng: 71.7108,
    zoom: 16,
    data: makeStation(4, "TP A321 punkti", [
      ["TP A321", 2140],
      ["TP B15", 870],
      ["TP 3", 156],
    ]),
  },
  {
    id: "tp-a32-1",
    kind: "tp",
    label: "TP A32",
    lat: 40.9496,
    lng: 71.7285,
    zoom: 16,
    data: makeStation(5, "TP A32 punkti", [
      ["TP A32", 1980],
      ["TP A7", 760],
      ["TP 2", 132],
    ]),
  },
  {
    id: "tp-a32-2",
    kind: "tp",
    label: "TP A32",
    lat: 40.9472,
    lng: 71.6975,
    zoom: 16,
    data: makeStation(6, "TP A32 punkti", [
      ["TP A32", 1760],
      ["TP A9", 690],
      ["TP 1", 110],
    ]),
  },
  {
    id: "tp-a32-3",
    kind: "tp",
    label: "TP A32",
    lat: 40.9448,
    lng: 71.7325,
    zoom: 16,
    data: makeStation(7, "TP A32 punkti", [
      ["TP A32", 1540],
      ["TP A2", 610],
      ["TP 6", 96],
    ]),
  },
];

export const mapCenter = { lat: locations[0]!.lat, lng: locations[0]!.lng };
export const mapZoom = locations[0]!.zoom;
