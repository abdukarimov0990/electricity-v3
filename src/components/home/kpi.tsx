import { Icon } from "./Icon";
import { bars, kpis, type Kpi } from "./data";

function MiniBars({ count, seed, color }: { count: number; seed: number; color: string }) {
  const data = bars(count, seed);
  return (
    <div className="flex h-[39px] flex-1 items-end gap-[2px]">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-[1px]"
          style={{ height: `${Math.round(v * 100)}%`, backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function KpiCard({ kpi, seed }: { kpi: Kpi; seed: number }) {
  return (
    <div
      className="flex h-[196px] flex-col rounded-xl p-4"
      style={{ backgroundColor: kpi.bg }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium leading-[18px] text-[#333333]">
          {kpi.title}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: kpi.badge }}
        >
          <Icon name={kpi.icon} className="h-5 w-5 text-white" strokeWidth={1.5} />
        </span>
      </div>

      <div className="mt-2.5 flex items-baseline gap-1">
        <span className="text-[24px] font-bold leading-[31px] text-[#333333]">
          {kpi.value}
        </span>
        <span className="text-[14px] font-medium leading-[18px] text-[#555555]">
          {kpi.unit}
        </span>
      </div>

      <div
        className="mt-1.5 flex items-center gap-1 text-[14px] font-medium leading-[18px]"
        style={{ color: kpi.deltaColor }}
      >
        <Icon name={kpi.deltaIcon} className="h-[18px] w-[18px]" strokeWidth={1.5} />
        {kpi.delta}
      </div>

      <p className="mt-1 text-[14px] leading-[18px] text-[#555555]">{kpi.prev}</p>

      <div className="mt-auto flex items-end gap-2">
        <MiniBars count={kpi.barCount} seed={seed} color={kpi.bar} />
        <span className="shrink-0 text-[14px] leading-[18px] text-[#555555]">
          {kpi.span}
        </span>
      </div>
    </div>
  );
}

/** KPI kartalari qatori (6 ta). */
export function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
      {kpis.map((k, i) => (
        <KpiCard key={k.key} kpi={k} seed={i * 3 + 1} />
      ))}
    </div>
  );
}
