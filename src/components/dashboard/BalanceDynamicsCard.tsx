"use client";

import { useState } from "react";
import { BarChart3, Download, Table2 } from "lucide-react";

import { AreaLineChart, type ChartSeries } from "./charts/AreaLineChart";
import { SectionCard } from "./ui";
import { balanceDynamics } from "./data";

const LEGEND = [
  { label: "Tarmoqqa kirgan (kWh)", color: "#007CD2" },
  { label: "Sotilgan (kWh)", color: "#16A34A" },
  { label: "Yo'qotish (kWh)", color: "#E0533D" },
];

const series: ChartSeries[] = [
  { key: "incoming", data: balanceDynamics.incoming, color: "#007CD2", area: true },
  { key: "sold", data: balanceDynamics.sold, color: "#16A34A", area: true },
  { key: "loss", data: balanceDynamics.loss, color: "#E0533D" },
];

const PERIODS = ["Kunlik", "Haftalik", "Oylik"];
const fmt = (n: number) => `${Math.round(n / 1000)}k`;

/** "Balans dinamikasi" - davr toggle + ko'p qatorli grafik. */
export function BalanceDynamicsCard() {
  const [period, setPeriod] = useState("Kunlik");

  return (
    <SectionCard
      title="Balans dinamikasi"
      subtitle="oxirgi 90 kun"
      actions={
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-lg bg-[#F3F3F3] p-0.5">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-md px-3 py-1 text-[12px] font-medium ${period === p ? "bg-white text-[#007CD2] shadow-sm" : "text-[#8A9099]"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center rounded-lg border border-[#E5E8EC] p-0.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF4FB] text-[#007CD2]">
              <BarChart3 className="h-4 w-4" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-[#8A9099]">
              <Table2 className="h-4 w-4" />
            </span>
          </div>
          <button
            type="button"
            aria-label="Yuklab olish"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E8EC] text-[#8A9099] hover:bg-[#F3F3F3]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      }
    >
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[12px] text-[#6B7178]">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
      <AreaLineChart series={series} height={240} format={fmt} className="h-[240px] w-full" />
    </SectionCard>
  );
}
