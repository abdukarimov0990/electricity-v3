"use client";

import { useState } from "react";
import {
  ChartColumnBig,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Phone,
  Table2,
} from "lucide-react";

import { SafeImage } from "@/components/map/SafeImage";

import { LineChart, Legend, RadialChart } from "./charts";
import { Icon } from "./Icon";
import {
  consumption,
  debt,
  doneWorks,
  lossShare,
  plannedWorks,
  quickStats,
  reportPeriods,
  responsible,
  topTransformers,
  violations,
  type PlanStatus,
  type TStatus,
} from "./data";

// --- Umumiy karta + toolbar --------------------------------------------------
export function Card({
  title,
  actions,
  children,
  className,
}: {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["rounded-2xl bg-white p-4", className ?? ""].join(" ")}>
      {(title || actions) && (
        <header className="mb-3 flex items-center justify-between gap-2">
          {title && (
            <h3 className="text-[14px] font-bold leading-[18px] text-[#333333]">
              {title}
            </h3>
          )}
          {actions}
        </header>
      )}
      {children}
    </div>
  );
}

function ChartTools() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 rounded-full bg-[#F3F3F3] p-0.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#007CD2] text-white">
          <ChartColumnBig className="h-4 w-4" />
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full text-[#8A9099]">
          <Table2 className="h-4 w-4" />
        </span>
      </div>
      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9EBEE] text-[#8A9099] hover:bg-[#F3F3F3]">
        <Download className="h-4 w-4" />
      </button>
    </div>
  );
}

function IconBtn() {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9EBEE] text-[#8A9099] hover:bg-[#F3F3F3]">
      <ExternalLink className="h-4 w-4" />
    </button>
  );
}

// --- Iste'mol dinamikasi -----------------------------------------------------
export function IstemolCard() {
  return (
    <Card title="Iste'mol dinamikasi" actions={<ChartTools />} className="flex h-full flex-col">
      <div className="flex flex-1 gap-3">
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="min-h-0 flex-1">
            <LineChart
              lines={[
                { data: consumption.hisoblangan, color: "#3B82F6" },
                { data: consumption.istemol, color: "#22C55E" },
                { data: consumption.yoqotish, color: "#EF4444" },
              ]}
            />
          </div>
          <span className="mt-1 self-start rounded-full bg-[#F3F3F3] px-3 py-1 text-[12px] font-medium text-[#6B7178]">
            7 kun
          </span>
        </div>
        <Legend items={consumption.legend} className="w-[132px] shrink-0 justify-center" />
      </div>
    </Card>
  );
}

// --- Qoidabuzarliklar --------------------------------------------------------
export function ViolationsCard() {
  return (
    <Card title="Qoidabuzarliklar" actions={<IconBtn />}>
      <div className="grid grid-cols-3 gap-3">
        {violations.map((v) => (
          <div key={v.key}>
            <p className="text-[12px] text-[#8A9099]">{v.label}</p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: v.bg, color: v.color }}
              >
                <Icon name={v.icon} className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <span className="text-[16px] font-bold text-[#333333]">{v.value}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// --- Mas'ul xodim ------------------------------------------------------------
export function ResponsibleCard({ className }: { className?: string }) {
  return (
    <Card title="Mas'ul xodim" actions={<IconBtn />} className={className}>
      <div className="flex items-center gap-3">
        <SafeImage src={responsible.avatar} alt={responsible.name} className="h-11 w-11 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-[#16181B]">{responsible.name}</p>
          <p className="flex items-center gap-1 text-[13px] text-[#8A9099]">
            <Phone className="h-3.5 w-3.5" />
            {responsible.phone}
          </p>
        </div>
        <button className="shrink-0 rounded-lg bg-[#EEF4FB] px-3 py-2 text-[13px] font-semibold text-[#007CD2] hover:bg-[#e0eefb]">
          Bog&apos;lanish
        </button>
      </div>
    </Card>
  );
}

// --- Eng ko'p sarfga ega transformatorlar -----------------------------------
const T_STATUS: Record<TStatus, string> = {
  Faol: "text-[#16A34A]",
  Nofaol: "text-[#DC2626]",
  "Ta'mirda": "text-[#E08A0B]",
};

export function TopTransformersCard() {
  return (
    <Card title="Eng ko'p sarfga ega transformatorlar" actions={<ChartTools />} className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-[#8A9099]">
              <th className="pb-2 text-left font-medium">Nomi</th>
              <th className="pb-2 text-left font-medium">Holat</th>
              <th className="pb-2 text-right font-medium">Hisoblangan</th>
              <th className="pb-2 text-right font-medium">Iste&apos;mol</th>
              <th className="pb-2 text-right font-medium">Yo&apos;qotish</th>
            </tr>
          </thead>
          <tbody>
            {topTransformers.map((r, i) => (
              <tr key={i} className="border-t border-[#F2F3F5]">
                <td className="py-2 font-semibold text-[#007CD2]">{r.name}</td>
                <td className={`py-2 font-medium ${T_STATUS[r.status]}`}>{r.status}</td>
                <td className="py-2 text-right text-[#333333]">{r.calc}</td>
                <td className="py-2 text-right text-[#333333]">{r.use}</td>
                <td className="py-2 text-right text-[#333333]">{r.loss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a className="mt-1 text-center text-[13px] font-semibold text-[#007CD2]">Batafsil</a>
    </Card>
  );
}

// --- Radial (Qarzdorlik / Yo'qotish zarari) ---------------------------------
export function RadialCard({ data }: { data: typeof debt | typeof lossShare }) {
  return (
    <Card title={data.title} actions={<ChartTools />} className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <RadialChart segments={data.segments} size={150} />
      </div>
      <Legend items={data.segments} className="mt-1 !flex-row flex-wrap justify-between gap-x-2" />
    </Card>
  );
}

// --- Tezkor ko'rsatkichlar ---------------------------------------------------
export function QuickStatsCard() {
  return (
    <Card title="Tezkor ko'rsatkichlar" actions={<IconBtn />} className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-between">
        {quickStats.map((q) => (
          <div key={q.key} className="flex items-center gap-2.5 py-1">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: q.bg, color: q.color }}
            >
              <Icon name={q.icon} className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] text-[#8A9099]">{q.label}</p>
              <p className="text-[14px] font-bold text-[#16181B]">{q.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// --- Ishlar jadvallari -------------------------------------------------------
function ThBlue({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={["bg-[#3186DD] px-3 py-2.5 text-[12px] font-semibold text-white first:rounded-l-lg last:rounded-r-lg", className ?? ""].join(" ")}>
      {children}
    </th>
  );
}

export function DoneWorksCard() {
  return (
    <Card title="Bajarilgan ishlar" actions={<IconBtn />}>
      <table className="w-full border-separate border-spacing-y-0 text-[13px]">
        <thead>
          <tr>
            <ThBlue className="text-left">Transformator</ThBlue>
            <ThBlue className="text-left">Bajarilgan Ish</ThBlue>
            <ThBlue className="text-right">Sana</ThBlue>
          </tr>
        </thead>
        <tbody>
          {doneWorks.map((w, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-[#F7F8FA]" : ""}>
              <td className="px-3 py-2.5 font-semibold text-[#007CD2]">{w.tp}</td>
              <td className="px-3 py-2.5 text-[#333333]">{w.work}</td>
              <td className="px-3 py-2.5 text-right text-[#6B7178]">{w.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

const P_STATUS: Record<PlanStatus, string> = {
  Yangi: "bg-[#EEF4FB] text-[#3B82F6]",
  Bajarilmoqda: "bg-[#E9F9F0] text-[#16A34A]",
  Rejada: "bg-[#FFF3DD] text-[#E08A0B]",
};

export function PlannedWorksCard() {
  return (
    <Card title="Rejalashtirilgan ishlar" actions={<IconBtn />}>
      <table className="w-full text-[13px]">
        <thead>
          <tr>
            <ThBlue className="text-left">Transformator</ThBlue>
            <ThBlue className="text-left">Ish</ThBlue>
            <ThBlue className="text-center">Holat</ThBlue>
            <ThBlue className="text-right">Sana</ThBlue>
          </tr>
        </thead>
        <tbody>
          {plannedWorks.map((w, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-[#F7F8FA]" : ""}>
              <td className="px-3 py-2.5 font-semibold text-[#007CD2]">{w.tp}</td>
              <td className="max-w-[280px] truncate px-3 py-2.5 text-[#333333]">{w.work}</td>
              <td className="px-3 py-2.5 text-center">
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${P_STATUS[w.status]}`}>
                  {w.status}
                </span>
              </td>
              <td className="px-3 py-2.5 text-right text-[#6B7178]">{w.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

// --- Hisobotlar --------------------------------------------------------------
export function ReportsCard() {
  return (
    <Card title="Hisobotlarni yuklab olish" className="flex h-full flex-col">
      <div className="grid grid-cols-4 gap-2">
        {reportPeriods.map((p, i) => (
          <button
            key={p.label}
            className={[
              "flex flex-col items-center gap-1.5 rounded-xl border py-2.5 text-[12px] font-medium transition-colors",
              i === 0 ? "border-[#BFDCF6] bg-[#F5FAFE] text-[#007CD2]" : "border-[#E9EBEE] text-[#6B7178] hover:bg-[#F7F8FA]",
            ].join(" ")}
          >
            <FileText className="h-5 w-5" style={{ color: p.color }} />
            {p.label}
          </button>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#E9F7EF] py-2.5 text-[13px] font-semibold text-[#16A34A] hover:bg-[#dff3e7]">
          <FileSpreadsheet className="h-4 w-4" />
          Excel
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#FDECEC] py-2.5 text-[13px] font-semibold text-[#DC2626] hover:bg-[#fbe0e0]">
          <FileText className="h-4 w-4" />
          PDF
        </button>
      </div>
      <a className="mt-auto pt-2 text-center text-[13px] font-semibold text-[#007CD2]">Ko&apos;proq</a>
    </Card>
  );
}
