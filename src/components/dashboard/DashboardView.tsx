import { ConsumptionCard } from "./ConsumptionCard";
import { DashboardShell } from "./DashboardShell";
import { EfficiencyCard } from "./EfficiencyCard";
import { Icon } from "./Icon";
import { EmptyState, KpiCard, SectionCard, SideStatCard } from "./ui";
import {
  kpis,
  sideCards,
  violations,
  violationsPeriod,
} from "./data";

export function DashboardView() {
  return (
    <DashboardShell title="Fider paneli" subtitle="Sarnaul MFY">
      {/* KPI kartalari */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.key} kpi={kpi} />
        ))}
      </div>

      {/* Asosiy tarkib + o'ng rail */}
      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_224px]">
        <div className="grid gap-3 md:grid-cols-2">
          <ConsumptionCard />

          <SectionCard title="Fider hisoblagichi">
            <EmptyState text="Ma'lumot yo'q" />
          </SectionCard>

          <SectionCard title="Aniqlangan qoidabuzarliklar" subtitle={violationsPeriod}>
            <div className="flex flex-col">
              {violations.map((v, i) => (
                <div
                  key={v.key}
                  className={`flex items-center gap-3 py-3 ${i > 0 ? "border-t border-[#F1F2F4]" : ""}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ECEEF1] text-[#9AA0A6]">
                    <Icon name={v.icon} className="h-[17px] w-[17px]" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[#16181B]">{v.label}</p>
                    <p className="truncate text-[11px] text-[#9CA3AF]">{v.detail}</p>
                  </div>
                  <span className="shrink-0 text-[13px] font-semibold text-[#16181B]">
                    {v.amount}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Ma'sul shaxs">
            <EmptyState text="Ma'sul shaxs belgilanmagan" />
          </SectionCard>
        </div>

        {/* O'ng rail: samaradorlik indeksi + kichik statistik kartalar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-1">
          <div className="col-span-2 sm:col-span-4 xl:col-span-1">
            <EfficiencyCard />
          </div>
          {sideCards.map((c) => (
            <SideStatCard
              key={c.key}
              label={c.label}
              value={c.value}
              unit={c.unit}
              sub={c.sub}
              subDelta={c.subDelta}
              icon={c.icon}
            />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
