import { BoltIcon } from "@/components/map/icons";

import { homeCards } from "./home-data";

/**
 * Home asosiy maydoni - stat kartalar (Figma "Main"). Har bir karta #EFF6FF,
 * r12, #C0E3FF ramka; tepada label + ko'k zap badge, ostida qiymat + birlik.
 */
export function HomeMain() {
  return (
    <div className="flex flex-wrap gap-2">
      {homeCards.map((card) => (
        <div
          key={card.key}
          className="flex h-[196px] w-[239px] flex-col rounded-xl border border-[#C0E3FF] bg-[#EFF6FF] p-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium leading-4 text-[#333333]">
              {card.label}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3B82F6]">
              <BoltIcon className="h-5 w-5 text-white" strokeWidth={2} />
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-bold leading-[26px] text-black">
              {card.value}
            </span>
            <span className="text-[14px] font-medium leading-[18px] text-[#555555]">
              {card.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
