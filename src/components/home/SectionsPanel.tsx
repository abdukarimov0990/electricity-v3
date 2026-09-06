"use client";

import { useState } from "react";

import {
  AbonentIcon,
  AsosiyIcon,
  FeederIcon,
  HandIcon,
  PodstansiyaIcon,
  TpIcon,
} from "@/components/map/icons";

import { sections, type SectionIcon } from "./home-data";

const ICONS: Record<SectionIcon, typeof FeederIcon> = {
  asosiy: AsosiyIcon,
  podstansiya: PodstansiyaIcon,
  fider: FeederIcon,
  transformer: TpIcon,
  abonent: AbonentIcon,
  qoida: HandIcon,
};

/**
 * Home "Bo'limlar" paneli (Figma "Black" 340, r16, pad16). Tanlangan bo'lim
 * #007CD2. Bo'limlar hozircha bitta sahifa ichida (alohida route yo'q).
 */
export function SectionsPanel() {
  const [active, setActive] = useState("asosiy");

  return (
    <aside className="flex h-full w-full flex-col gap-2.5 rounded-2xl border-2 border-[#DDDDDD] bg-white p-4">
      <h2 className="px-1 text-[16px] font-bold leading-[21px] text-[#333333]">
        Bo&apos;limlar
      </h2>

      <ul className="flex flex-col gap-2.5 overflow-y-auto">
        {sections.map((s) => {
          const isActive = s.key === active;
          const Icon = ICONS[s.icon];
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => setActive(s.key)}
                aria-pressed={isActive}
                className={[
                  "flex h-12 w-full items-center gap-4 rounded-xl px-5 transition-colors",
                  isActive
                    ? "bg-[#007CD2] text-white"
                    : "text-[#333333] hover:bg-[#F3F3F3]",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-6 w-6 shrink-0",
                    isActive ? "text-white" : "text-[#333333]",
                  ].join(" ")}
                  strokeWidth={2}
                />
                <span className="truncate text-[18px] font-semibold leading-[23px]">
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
