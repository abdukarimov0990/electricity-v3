// Home sahifasi ma'lumotlari (Figma node 3939:83).

export type SectionIcon =
  | "asosiy"
  | "podstansiya"
  | "fider"
  | "transformer"
  | "abonent"
  | "qoida";

export interface HomeSection {
  key: string;
  label: string;
  icon: SectionIcon;
}

export const sections: HomeSection[] = [
  { key: "asosiy", label: "Asosiy", icon: "asosiy" },
  { key: "podstansiya", label: "Podstansiyalar", icon: "podstansiya" },
  { key: "fider", label: "Fiderlar", icon: "fider" },
  { key: "transformer", label: "Transformatorlar", icon: "transformer" },
  { key: "abonent", label: "Abonentlar", icon: "abonent" },
  { key: "qoida", label: "Qoidabuzarliklar", icon: "qoida" },
];

export interface HomeStatCard {
  key: string;
  label: string;
  value: string;
  unit: string;
}

// Figma "Main" - "Iste'mol" kartasi. Ro'yxat sifatida (kengaytirilishi mumkin).
export const homeCards: HomeStatCard[] = [
  { key: "istemol", label: "Iste'mol", value: "220.1", unit: "ming kWh" },
];
