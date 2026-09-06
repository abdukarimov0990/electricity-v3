import { AbonentIcon, FeederIcon, HandIcon, TpIcon } from "./icons";
import type { StatIcon, StationStat } from "./data";

const ICONS: Record<StatIcon, typeof FeederIcon> = {
  feeder: FeederIcon,
  circuit: TpIcon,
  users: AbonentIcon,
  hand: HandIcon,
};

interface StatGridProps {
  stats: readonly StationStat[];
}

/**
 * Podstansiya statistikasi - 2x2 to'r. Har bir katak: kulrang label +
 * #F3F3F3 karta (ikona + qiymat). "Qoidabuzarliklar" ikonasi qizil.
 */
export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stats.map((stat) => {
        const Icon = ICONS[stat.icon];
        return (
          <div key={stat.label} className="flex min-w-0 flex-col gap-2.5">
            <span className="text-[14px] font-bold leading-[18px] text-[#999999]">
              {stat.label}
            </span>
            <div className="flex h-12 items-center gap-3 rounded-lg bg-[#F3F3F3] px-5">
              <Icon
                className={[
                  "h-6 w-6 shrink-0",
                  stat.danger ? "text-[#CF4646]" : "text-[#333333]",
                ].join(" ")}
                strokeWidth={2}
              />
              <span className="truncate text-[16px] font-bold leading-[21px] text-[#333333]">
                {stat.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
