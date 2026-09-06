"use client";

import { useState } from "react";

import { DashboardShell } from "./DashboardShell";
import { works, type WorkItem } from "./data";

type Tab = "jarayonda" | "reja" | "bajarilgan";

// "Bajarilgan" ro'yxati (namuna) - hammasi 100%.
const bajarilgan: WorkItem[] = [
  { key: "d1", title: "Transformator ta'mirlash", type: "Ta'mirlash", amount: "2 ta", progress: 100, status: "bajarilgan" },
  { key: "d2", title: "Hisoblagichlarni tekshirish", type: "Tekshiruv", amount: "340 ta", progress: 100, status: "bajarilgan" },
  { key: "d3", title: "Yoritish liniyasini almashtirish", type: "Almashtirish", amount: "1.2 km", progress: 100, status: "bajarilgan" },
];

const STATUS_BADGE: Record<Tab, string> = {
  jarayonda: "bg-[#EEF4FB] text-[#3B82F6]",
  reja: "bg-[#F3F3F3] text-[#8A9099]",
  bajarilgan: "bg-[#E9F9F0] text-[#10B981]",
};

const STATUS_LABEL: Record<Tab, string> = {
  jarayonda: "Jarayonda",
  reja: "Reja",
  bajarilgan: "Bajarilgan",
};

function barColor(p: number) {
  if (p >= 100) return "#16A34A";
  if (p > 0) return "#007CD2";
  return "#E5E8EC";
}

export function WorksView() {
  const [tab, setTab] = useState<Tab>("jarayonda");

  const TABS: { key: Tab; label: string; count: number }[] = [
    { key: "jarayonda", label: "Jarayonda", count: works.counts.jarayonda },
    { key: "reja", label: "Reja", count: works.counts.reja },
    { key: "bajarilgan", label: "Bajarilgan", count: works.counts.bajarilgan },
  ];

  const list: WorkItem[] =
    tab === "jarayonda" ? works.jarayonda : tab === "reja" ? works.reja : bajarilgan;

  return (
    <DashboardShell
      title="Ishlar"
      subtitle={`${works.counts.reja} ta reja · ${works.counts.jarayonda} ta jarayonda · ${works.counts.bajarilgan} ta bajarilgan`}
    >
      {/* Tablar */}
      <div className="mb-3 grid grid-cols-3 gap-1 rounded-2xl border border-[#EAECEF] bg-white p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-xl py-2.5 text-[14px] font-semibold transition-colors ${tab === t.key ? "bg-[#F5F9FE] text-[#007CD2]" : "text-[#8A9099] hover:bg-[#F7F8FA]"}`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Ro'yxat */}
      <div className="rounded-2xl border border-[#EAECEF] bg-white">
        {list.map((w, i) => (
          <div
            key={w.key}
            className={`px-5 py-4 ${i > 0 ? "border-t border-[#F2F3F5]" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-[#333333]">{w.title}</p>
                <p className="mt-0.5 text-[12px] text-[#8A9099]">
                  {w.type} · {w.amount}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_BADGE[w.status]}`}
              >
                {STATUS_LABEL[w.status]}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F0F1F4]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${w.progress}%`, backgroundColor: barColor(w.progress) }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-[13px] font-semibold text-[#333333]">
                {w.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 px-1 text-[12px] text-[#9AA1A9]">Manba: fact.work</p>
    </DashboardShell>
  );
}
