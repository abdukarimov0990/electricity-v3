import { Gauge, MapPin, Phone, Receipt } from "lucide-react";

import { SafeImage } from "./SafeImage";
import { Section } from "./Section";
import type { Abonent } from "./data";

/** O'ng panel - Abonent to'liq ma'lumoti. Fider/TP paneli bilan bir uslubda. */
export function AbonentPanel({ abonent: a }: { abonent: Abonent }) {
  const isOrg = a.kind === "Yuridik";
  const online = a.status === "Aloqada";

  return (
    <aside className="flex h-full w-full flex-col gap-2.5 overflow-hidden rounded-2xl border-2 border-[#DDDDDD] bg-white p-4">
      <h2 className="shrink-0 text-[16px] font-bold leading-[21px] text-[#333333]">
        Ma&apos;lumotlar
      </h2>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto">
        {/* Kim */}
        <div className="flex items-center gap-3.5">
          <SafeImage
            src={a.avatar}
            alt={a.name}
            className="h-16 w-16 shrink-0 rounded-full ring-2 ring-[#EEF4FB]"
          />
          <div className="min-w-0">
            <p className="truncate text-[16px] font-bold text-[#16181B]">
              {a.name}
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={[
                  "rounded-md px-2 py-0.5 text-[11px] font-semibold",
                  isOrg ? "bg-[#EEF4FB] text-[#007CD2]" : "bg-[#F3F3F3] text-[#6B7178]",
                ].join(" ")}
              >
                {a.kind}
              </span>
              <span
                className={[
                  "flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold",
                  online ? "bg-[#E7F7EE] text-[#16A34A]" : "bg-[#FDECEC] text-[#DC2626]",
                ].join(" ")}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: online ? "#16A34A" : "#DC2626" }}
                />
                {a.status}
              </span>
            </div>
          </div>
        </div>

        {/* Faktlar */}
        <div className="flex flex-col gap-2">
          <Fact icon={<Gauge className="h-[18px] w-[18px]" />} label="Hisoblagich" value={a.meter} />
          <Fact icon={<MapPin className="h-[18px] w-[18px]" />} label="Manzil" value={a.address} />
          <Fact icon={<Phone className="h-[18px] w-[18px]" />} label="Telefon" value={a.phone} />
          <Fact icon={<Receipt className="h-[18px] w-[18px]" />} label="Tarif" value={a.tariff} />
        </div>

        {/* Iste'mol */}
        <Section label="Iste'mol (oxirgi 12 oy)">
          <div className="rounded-lg bg-[#F3F3F3] p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[18px] font-bold text-[#16181B]">
                {a.monthly}
                <span className="ml-1 text-[12px] font-medium text-[#8A9099]">bu oy</span>
              </span>
              <span
                className={[
                  "text-[13px] font-semibold",
                  a.monthlyUp ? "text-[#DC2626]" : "text-[#16A34A]",
                ].join(" ")}
              >
                {a.monthlyDelta}
              </span>
            </div>
            <MiniBars data={a.consumption} />
          </div>
        </Section>

        {/* Balans */}
        <Section label="Balans">
          <div className="flex items-center justify-between rounded-lg bg-[#F3F3F3] px-4 py-3">
            <div>
              <p className="text-[11px] text-[#8A9099]">Joriy balans</p>
              <p
                className={[
                  "text-[16px] font-bold",
                  a.balancePositive ? "text-[#16A34A]" : "text-[#DC2626]",
                ].join(" ")}
              >
                {a.balance}
              </p>
            </div>
            <span className="text-[11px] text-[#9AA1A9]">{a.tariff}</span>
          </div>
        </Section>

        {/* To'lovlar */}
        <Section label="To'lovlar tarixi">
          <div className="flex flex-col gap-1.5">
            {a.payments.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-[#F3F3F3] px-4 py-2.5"
              >
                <span className="text-[13px] text-[#6B7178]">{p.date}</span>
                <span className="text-[13px] font-semibold text-[#16181B]">{p.amount}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </aside>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-[#F3F3F3] px-4 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#007CD2]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-[#8A9099]">{label}</p>
        <p className="truncate text-[13px] font-semibold text-[#333333]">{value}</p>
      </div>
    </div>
  );
}

function MiniBars({ data }: { data: number[] }) {
  const max = Math.max(...data) || 1;
  const bw = 100 / data.length;
  return (
    <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="mt-2 h-14 w-full" aria-hidden>
      {data.map((v, i) => {
        const h = (v / max) * 40 + 2;
        return (
          <rect
            key={i}
            x={i * bw + bw * 0.18}
            y={44 - h}
            width={bw * 0.64}
            height={h}
            rx={0.8}
            fill="#007CD2"
            opacity={0.35 + 0.65 * (v / max)}
          />
        );
      })}
    </svg>
  );
}
