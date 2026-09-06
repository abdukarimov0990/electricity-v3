"use client";

import { FeederIcon, TpIcon } from "./icons";
import type { MapLocation } from "./data";

interface LocationPanelProps {
  locations: MapLocation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * "Joylashuvlar" oq paneli (Figma "Black" 340x1064, r16, pad16). Tanlangan
 * element #007CD2, ichida `workflow` ikonasi; TP'larda `circuit-board`.
 */
export function LocationPanel({
  locations,
  selectedId,
  onSelect,
}: LocationPanelProps) {
  return (
    <aside className="flex h-full w-full flex-col gap-2.5 rounded-2xl border-2 border-[#DDDDDD] bg-white p-4">
      <h2 className="px-1 text-[16px] font-bold leading-[21px] text-[#333333]">
        Joylashuvlar
      </h2>

      <ul className="flex flex-col gap-2.5 overflow-y-auto">
        {locations.map((loc) => {
          const isSelected = loc.id === selectedId;
          const Icon = loc.kind === "feeder" ? FeederIcon : TpIcon;

          return (
            <li key={loc.id}>
              <button
                type="button"
                onClick={() => onSelect(loc.id)}
                aria-pressed={isSelected}
                className={[
                  "flex h-12 w-full items-center gap-4 rounded-xl px-5 transition-colors",
                  isSelected
                    ? "bg-[#007CD2] text-white"
                    : "text-[#333333] hover:bg-[#F3F3F3]",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-6 w-6 shrink-0",
                    isSelected ? "text-white" : "text-[#333333]",
                  ].join(" ")}
                  strokeWidth={2}
                />
                <span className="truncate text-[18px] font-semibold leading-[23px]">
                  {loc.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
