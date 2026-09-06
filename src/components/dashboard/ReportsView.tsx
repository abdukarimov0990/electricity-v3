"use client";

import { useState } from "react";
import { Calendar, FileSpreadsheet, FileText } from "lucide-react";

import { DashboardShell } from "./DashboardShell";
import { reportNote, reportPeriods } from "./data";

export function ReportsView() {
  const [period, setPeriod] = useState("Oylik");

  return (
    <DashboardShell title="Hisobotlar" subtitle="fider bo'yicha davriy hisobotlar">
      <div className="max-w-3xl rounded-2xl border border-[#EAECEF] bg-white p-5">
        <h3 className="text-[13px] font-bold tracking-wide text-[#333333] uppercase">
          Davriy hisobot
        </h3>
        <p className="mt-0.5 text-[12px] text-[#8A9099]">
          tanlangan davr bo&apos;yicha to&apos;liq ma&apos;lumot
        </p>

        <div className="mt-4 flex items-center gap-2 text-[12px] font-medium text-[#8A9099]">
          <Calendar className="h-4 w-4" />
          HISOBOT DAVRI
        </div>

        <div className="mt-2 inline-flex flex-wrap items-center gap-1 rounded-xl bg-[#F3F3F3] p-1">
          {reportPeriods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${period === p ? "bg-white text-[#007CD2] shadow-sm" : "text-[#6B7178] hover:text-[#333333]"}`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-xl border border-[#E5E8EC] bg-white px-4 py-3 text-[14px] font-semibold text-[#16A34A] transition-colors hover:bg-[#F3FBF6]"
          >
            <FileSpreadsheet className="h-5 w-5" />
            Excel eksport
          </button>
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-xl border border-[#E5E8EC] bg-white px-4 py-3 text-[14px] font-semibold text-[#E0592A] transition-colors hover:bg-[#FEF5F1]"
          >
            <FileText className="h-5 w-5" />
            PDF eksport
          </button>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-[#8A9099]">{reportNote}</p>
      </div>
    </DashboardShell>
  );
}
