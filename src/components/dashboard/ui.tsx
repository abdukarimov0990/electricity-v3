import { Sparkline } from "./charts/Sparkline";
import { Icon } from "./Icon";
import type { Kpi } from "./data";

const ACCENT = "#007CD2";

const TREND = {
  up: { arrow: "↑", color: "text-[#16A34A]" },
  down: { arrow: "↓", color: "text-[#DC2626]" },
  flat: { arrow: "→", color: "text-[#9CA3AF]" },
} as const;

/** Minimalist KPI kartasi: uppercase label, katta raqam, nozik chiziq. */
export function KpiCard({ kpi }: { kpi: Kpi }) {
  const t = TREND[kpi.trend];
  return (
    <div
      className={[
        "group flex flex-col rounded-2xl border bg-white p-5 transition-colors",
        kpi.highlight
          ? "border-[#D8E7F8] bg-[#F8FBFE]"
          : "border-[#ECEEF1] hover:border-[#D8DCE1]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] leading-tight font-semibold tracking-wider text-[#9AA0A6] uppercase">
          {kpi.label}
        </p>
        <Icon
          name={kpi.icon}
          className="h-[17px] w-[17px] shrink-0 text-[#C4CAD1]"
          strokeWidth={2}
        />
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[26px] leading-none font-semibold tracking-tight text-[#16181B]">
          {kpi.value}
        </span>
        <span className="text-[12px] font-medium text-[#9CA3AF]">{kpi.unit}</span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[12px]">
        <span className={`font-semibold ${t.color}`}>
          {t.arrow} {kpi.changePct}
        </span>
        <span className="truncate text-[#AEB4BC]">{kpi.prev}</span>
      </div>

      <div className="mt-4">
        <Sparkline data={kpi.spark} uid={kpi.key} color={ACCENT} className="h-8 w-full" />
      </div>
    </div>
  );
}

/** Oq bo'lim kartasi: uppercase nozik sarlavha (+izoh, +o'ng amallar). */
export function SectionCard({
  title,
  subtitle,
  actions,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "rounded-2xl border border-[#ECEEF1] bg-white p-5",
        className ?? "",
      ].join(" ")}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[12px] font-semibold tracking-wider text-[#9AA0A6] uppercase">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-[12px] text-[#9CA3AF]">{subtitle}</p>
          )}
        </div>
        {actions}
      </header>
      {children}
    </section>
  );
}

/** O'ng ustun kichik statistik kartasi (minimal). */
export function SideStatCard({
  label,
  value,
  unit,
  sub,
  subDelta,
  icon,
}: {
  label: string;
  value: string;
  unit: string;
  sub: string;
  subDelta?: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[#ECEEF1] bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold tracking-wider text-[#9AA0A6] uppercase">
          {label}
        </p>
        <Icon name={icon} className="h-[17px] w-[17px] shrink-0 text-[#C4CAD1]" strokeWidth={2} />
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[22px] leading-none font-semibold tracking-tight text-[#16181B]">
          {value}
        </span>
        <span className="text-[12px] font-medium text-[#9CA3AF]">{unit}</span>
      </div>
      <p className="mt-2 text-[12px] text-[#9CA3AF]">
        {sub}
        {subDelta && <span className="ml-1 text-[#16A34A]">{subDelta}</span>}
      </p>
    </div>
  );
}

/** Bo'sh holat ("Ma'lumot yo'q"). */
export function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-[130px] flex-col items-center justify-center gap-2 text-[13px] text-[#B4BAC1]">
      <span className="h-8 w-8 rounded-full border border-dashed border-[#D8DCE1]" />
      {text}
    </div>
  );
}
