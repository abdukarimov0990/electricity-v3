"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { DashboardShell } from "./DashboardShell";
import { transformers, transformerSummary } from "./data";

const COLS = [
  "Transformator",
  "Hisoblagich",
  "Koeffitsient",
  "Iste'molchilar",
  "Aloqada",
  "Aloqada emas",
  "Oylik iste'mol (kWh)",
  "Ulushi",
];

export function TransformersView() {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return transformers;
    return transformers.filter((r) => r.code.toLowerCase().includes(s));
  }, [q]);

  return (
    <DashboardShell
      title="Transformatorlar"
      subtitle={`${transformerSummary.total} ta transformator · ${transformerSummary.consumers} ta iste'molchi · ${transformerSummary.monthly} kWh oylik iste'mol`}
    >
      <div className="rounded-2xl border border-[#EAECEF] bg-white p-4">
        {/* Qidiruv + belgilar */}
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9AA1A9]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="TP kodi yoki hisoblagich raqami"
              className="h-10 w-full rounded-lg border border-[#E5E8EC] bg-[#F7F8FA] pr-3 pl-9 text-[13px] text-[#333333] outline-none placeholder:text-[#B4BAC1] focus:border-[#007CD2] focus:bg-white"
            />
          </div>
          <span className="rounded-lg bg-[#EEF4FB] px-3 py-1.5 text-[13px] font-semibold text-[#007CD2]">
            {transformerSummary.total} ta
          </span>
          <span className="rounded-lg bg-[#FFF6E6] px-3 py-1.5 text-[13px] font-medium text-[#C98A15]">
            {transformerSummary.total} ta TP bo&apos;yicha hisobot yo&apos;q
          </span>
        </div>

        {/* Jadval */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-[13px]">
            <thead>
              <tr className="border-b border-[#EAECEF] text-[#8A9099]">
                <th className="w-12 px-3 py-2.5 text-left font-medium">№</th>
                {COLS.map((c, i) => (
                  <th
                    key={c}
                    className={`px-3 py-2.5 font-medium ${i === 0 ? "text-left" : "text-right"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.code}
                  className="border-b border-[#F2F3F5] transition-colors hover:bg-[#F7F8FA]"
                >
                  <td className="px-3 py-2.5 text-[#9AA1A9]">{r.no}</td>
                  <td className="px-3 py-2.5 text-left font-semibold text-[#007CD2]">
                    {r.code}
                  </td>
                  <td className="px-3 py-2.5 text-right text-[#9AA1A9]">{r.meter}</td>
                  <td className="px-3 py-2.5 text-right text-[#9AA1A9]">{r.coeff}</td>
                  <td className="px-3 py-2.5 text-right text-[#9AA1A9]">{r.consumers}</td>
                  <td className="px-3 py-2.5 text-right text-[#10B981]">{r.online}</td>
                  <td className="px-3 py-2.5 text-right text-[#9AA1A9]">{r.offline}</td>
                  <td className="px-3 py-2.5 text-right text-[#9AA1A9]">{r.monthly}</td>
                  <td className="px-3 py-2.5 text-right text-[#9AA1A9]">{r.share}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-[13px] text-[#B4BAC1]">
                    Natija topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
