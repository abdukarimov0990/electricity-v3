"use client";

import { useState } from "react";
import { BarChart3, Download, Table2 } from "lucide-react";

import { AreaLineChart, type ChartSeries } from "./charts/AreaLineChart";
import { SectionCard } from "./ui";
import { consumptionChart } from "./data";

const LEGEND = [
  { label: "Tarmoqqa kirgan (kWh)", color: "#007CD2" },
  { label: "Sotilgan (kWh)", color: "#16A34A" },
  { label: "Yo'qotish (kWh)", color: "#E0533D" },
];

const chartSeries: ChartSeries[] = [
  { key: "incoming", data: consumptionChart.incoming, color: "#007CD2", area: true },
  { key: "sold", data: consumptionChart.sold, color: "#16A34A" },
  { key: "loss", data: consumptionChart.loss, color: "#E0533D" },
];

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(0)}k` : `${n}`);
const thousands = (n: number) => n.toLocaleString("en-US");

/** "Iste'mol va yo'qotish" - grafik/jadval almashinuvi + bugungi ko'rsatkichlar. */
export function ConsumptionCard() {
  const [view, setView] = useState<"chart" | "table">("chart");
  const { today, yesterday } = consumptionChart;

  return (
    <SectionCard
      title="Iste'mol va yo'qotish"
      className="md:col-span-2"
      actions={
        <div className="flex items-center gap-1.5">
          <span className="rounded-lg border border-[#E5E8EC] px-2.5 py-1 text-[12px] font-medium text-[#333333]">
            Kunlik
          </span>
          <div className="flex items-center rounded-lg border border-[#E5E8EC] p-0.5">
            <button
              type="button"
              aria-label="Grafik"
              onClick={() => setView("chart")}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${view === "chart" ? "bg-[#EEF4FB] text-[#007CD2]" : "text-[#8A9099]"}`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Jadval"
              onClick={() => setView("table")}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${view === "table" ? "bg-[#EEF4FB] text-[#007CD2]" : "text-[#8A9099]"}`}
            >
              <Table2 className="h-4 w-4" />
            </button>
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

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_170px]">
        <div className="min-w-0">
          {view === "chart" ? (
            <AreaLineChart series={chartSeries} height={210} format={fmt} className="h-[210px] w-full" />
          ) : (
            <div className="max-h-[210px] overflow-y-auto rounded-lg border border-[#EEF0F3]">
              <table className="w-full text-[12px]">
                <thead className="sticky top-0 bg-[#F7F8FA] text-[#8A9099]">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Kun</th>
                    <th className="px-3 py-2 text-right font-medium">Kirgan</th>
                    <th className="px-3 py-2 text-right font-medium">Sotilgan</th>
                    <th className="px-3 py-2 text-right font-medium">Yo&apos;qotish</th>
                  </tr>
                </thead>
                <tbody>
                  {consumptionChart.labels.map((lab, i) => (
                    <tr key={lab} className="border-t border-[#F0F1F4]">
                      <td className="px-3 py-1.5 text-[#333333]">{lab}</td>
                      <td className="px-3 py-1.5 text-right text-[#3B82F6]">{thousands(consumptionChart.incoming[i]!)}</td>
                      <td className="px-3 py-1.5 text-right text-[#10B981]">{thousands(consumptionChart.sold[i]!)}</td>
                      <td className="px-3 py-1.5 text-right text-[#EF4444]">{thousands(consumptionChart.loss[i]!)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <Stat label="Bugun tarmoqqa kirgan" value={`${thousands(today.incoming)} kWh`} color="#007CD2" />
          <Stat label="Bugun sotilgan" value={`${thousands(today.sold)} kWh`} color="#16A34A" />
          <Stat label="Bugun yo'qotish" value={`${thousands(today.loss)} kWh`} note={today.lossPct} color="#E0533D" />
          <div className="rounded-lg bg-[#F7F8FA] px-3 py-2">
            <p className="text-[11px] text-[#8A9099]">Kecha yo&apos;qotish</p>
            <p className="text-[14px] font-bold text-[#333333]">
              {thousands(yesterday.loss)} kWh{" "}
              <span className="text-[12px] font-medium text-[#EF4444]">({yesterday.lossPct})</span>
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function Stat({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string;
  note?: string;
  color: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[11px] text-[#8A9099]">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </p>
      <p className="text-[15px] font-bold text-[#16181B]">
        {value}
        {note && <span className="ml-1 text-[12px] font-medium text-[#EF4444]">({note})</span>}
      </p>
    </div>
  );
}
