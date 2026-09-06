import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

import { context } from "./data";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Sarlavha va boshqaruvlar orasidagi qo'shimcha element (masalan Hisobot tugmasi). */
  actions?: React.ReactNode;
}

/** Sahifa sarlavhasi: nom + izoh (chapda), oy tanlagich + sana + Kirish (o'ngda). */
export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-[20px] font-semibold tracking-tight text-[#16181B]">
          {title}
        </h1>
        {subtitle && (
          <span className="text-[13px] text-[#9CA3AF]">{subtitle}</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions}

        <div className="flex items-center gap-1 rounded-lg border border-[#E5E8EC] bg-white px-1 py-1">
          <button
            type="button"
            aria-label="Oldingi oy"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#6B7178] hover:bg-[#F3F3F3]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-[13px] font-medium text-[#333333]">
            {context.period}
          </span>
          <button
            type="button"
            aria-label="Keyingi oy"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#6B7178] hover:bg-[#F3F3F3]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <span className="hidden items-center gap-1.5 rounded-lg border border-[#E5E8EC] bg-white px-3 py-1.5 text-[13px] text-[#333333] sm:flex">
          <Calendar className="h-4 w-4 text-[#8A9099]" />
          {context.asOf}
        </span>

        <button
          type="button"
          className="rounded-lg bg-[#007CD2] px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#0069b4]"
        >
          Kirish
        </button>
      </div>
    </header>
  );
}
