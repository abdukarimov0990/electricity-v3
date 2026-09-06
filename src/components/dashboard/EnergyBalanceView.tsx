import { BalanceDynamicsCard } from "./BalanceDynamicsCard";
import { DashboardShell } from "./DashboardShell";
import { FlowDiagram } from "./charts/FlowDiagram";
import { Icon } from "./Icon";
import { SectionCard } from "./ui";
import { balanceComposition, balanceFlow, balanceKpis } from "./data";

export function EnergyBalanceView() {
  return (
    <DashboardShell
      title="Energiya balansi"
      subtitle="tarmoqqa kirgan energiya taqsimoti"
    >
      {/* 4 KPI */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {balanceKpis.map((k) => (
          <div
            key={k.key}
            className="rounded-2xl border border-[#ECEEF1] bg-white p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-semibold tracking-wider text-[#9AA0A6] uppercase">
                {k.label}
              </p>
              <Icon
                name={k.icon}
                className="h-[17px] w-[17px] shrink-0 text-[#C4CAD1]"
                strokeWidth={2}
              />
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-[24px] leading-none font-semibold tracking-tight text-[#16181B]">
                {k.value}
              </span>
              <span className="text-[12px] font-medium text-[#9CA3AF]">{k.unit}</span>
            </div>
            <p className="mt-2 text-[12px] text-[#9CA3AF]">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Energiya oqimi + Balans tarkibi */}
      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard
          title="Energiya oqimi"
          subtitle="manbadan iste'molchigacha bo'lgan oqim"
        >
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
            {balanceFlow.branches.map((b) => (
              <span key={b.key} className="flex items-center gap-1.5 text-[12px] text-[#6B7178]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                {b.label}
              </span>
            ))}
          </div>
          <FlowDiagram flow={balanceFlow} height={300} />
        </SectionCard>

        <SectionCard title="Balans tarkibi">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-4 text-[13px]">
            <div className="border-b border-[#EAECEF] pb-2 text-[11px] font-medium tracking-wide text-[#8A9099] uppercase">
              Modda
            </div>
            <div className="border-b border-[#EAECEF] pb-2 text-right text-[11px] font-medium tracking-wide text-[#8A9099] uppercase">
              Energiya
            </div>
            <div className="border-b border-[#EAECEF] pb-2 text-right text-[11px] font-medium tracking-wide text-[#8A9099] uppercase">
              Ulushi
            </div>

            {balanceComposition.map((r, i) => (
              <div key={r.key} className="contents">
                <div
                  className={[
                    "flex items-center gap-2 py-2.5",
                    i > 0 ? "border-t border-[#F2F3F5]" : "",
                    r.child ? "pl-4 text-[#6B7178]" : "font-semibold text-[#333333]",
                    i === 0 ? "border-l-2 border-l-[#007CD2] bg-[#F5F9FE] pl-3" : "",
                  ].join(" ")}
                >
                  {r.child && <span className="text-[#B4BAC1]">└</span>}
                  {r.label}
                </div>
                <div
                  className={[
                    "flex items-center justify-end py-2.5 text-right",
                    i > 0 ? "border-t border-[#F2F3F5]" : "",
                    r.child ? "text-[#6B7178]" : "font-semibold text-[#333333]",
                  ].join(" ")}
                >
                  {r.energy}
                </div>
                <div
                  className={[
                    "flex items-center justify-end py-2.5 text-right text-[#8A9099]",
                    i > 0 ? "border-t border-[#F2F3F5]" : "",
                  ].join(" ")}
                >
                  {r.share}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Balans dinamikasi */}
      <div className="mt-3">
        <BalanceDynamicsCard />
      </div>
    </DashboardShell>
  );
}
