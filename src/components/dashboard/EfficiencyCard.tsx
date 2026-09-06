import { Gauge } from "./charts/Gauge";
import { efficiency } from "./data";

/** "Energiya samaradorlik indeksi" - minimal oq karta, ko'k gauge accent. */
export function EfficiencyCard() {
  return (
    <div className="rounded-2xl border border-[#ECEEF1] bg-white p-5">
      <p className="text-[11px] font-semibold tracking-wider text-[#9AA0A6] uppercase">
        Energiya samaradorlik indeksi
      </p>

      <div className="relative mt-3 flex justify-center">
        <Gauge value={efficiency.score} max={efficiency.max} size={168} />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-[34px] leading-none font-semibold tracking-tight text-[#16181B]">
            {efficiency.score}
            <span className="text-[15px] font-medium text-[#B4BAC1]">
              /{efficiency.max}
            </span>
          </span>
          <span className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-[#16A34A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
            {efficiency.mood}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-[#F1F2F4] pt-3 text-[12px]">
        <div className="flex items-center justify-between">
          <span className="text-[#9CA3AF]">O&apos;tgan oy</span>
          <span className="flex items-center gap-1.5 font-medium text-[#16181B]">
            {efficiency.prevMonth}
            <span className="text-[#16A34A]">↑ {efficiency.deltaPct}%</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#9CA3AF]">Maqsad</span>
          <span className="font-medium text-[#16181B]">{efficiency.target}</span>
        </div>
      </div>
    </div>
  );
}
