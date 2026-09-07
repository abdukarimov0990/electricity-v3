"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { FeederIcon, TpIcon } from "./icons";
import { SafeImage } from "./SafeImage";
import type { Feeder, Tp } from "./data";

export type SelKind = "feeder" | "tp" | "abonent";

interface LocationPanelProps {
  feeder: Feeder;
  tp: Tp | null;
  selKind: SelKind;
  selId: string;
  onSelectFeeder: () => void;
  onSelectTp: (tpId: string) => void;
  onSelectAbonent: (abonentId: string) => void;
  onBack: () => void;
}

/**
 * Chap oq panel - drill-down: Fider darajasida TP'lar ro'yxati; TP tanlansa
 * (drill) Abonentlar ro'yxatiga o'tadi. Tanlangan element #007CD2.
 */
export function LocationPanel({
  feeder,
  tp,
  selKind,
  selId,
  onSelectFeeder,
  onSelectTp,
  onSelectAbonent,
  onBack,
}: LocationPanelProps) {
  return (
    <aside className="flex h-full w-full flex-col gap-2.5 rounded-2xl border-2 border-[#DDDDDD] bg-white p-4">
      {tp ? (
        // --- TP darajasi: back + TP + Abonentlar ---
        <>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 px-1 text-[13px] font-medium text-[#8A9099] transition-colors hover:text-[#333333]"
          >
            <ChevronLeft className="h-4 w-4" />
            {feeder.label}
          </button>

          <ul className="flex flex-col gap-2.5 overflow-y-auto">
            <Row
              icon={<TpIcon className="h-6 w-6 shrink-0" strokeWidth={2} />}
              label={tp.label}
              selected={selKind === "tp"}
              onClick={() => onSelectTp(tp.id)}
            />

            <li className="px-1 pt-1.5 text-[12px] font-semibold tracking-wide text-[#9AA0A6] uppercase">
              Abonentlar
            </li>

            {tp.abonents.map((a) => {
              const selected = selKind === "abonent" && selId === a.id;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => onSelectAbonent(a.id)}
                    aria-pressed={selected}
                    className={[
                      "flex h-12 w-full items-center gap-3 rounded-xl px-4 text-left transition-colors",
                      selected
                        ? "bg-[#007CD2] text-white"
                        : "text-[#333333] hover:bg-[#F3F3F3]",
                    ].join(" ")}
                  >
                    <SafeImage
                      src={a.avatar}
                      alt={a.name}
                      className={[
                        "h-8 w-8 shrink-0 rounded-full",
                        selected ? "ring-2 ring-white/60" : "",
                      ].join(" ")}
                    />
                    <span className="min-w-0 flex-1 truncate text-[14px] font-medium leading-tight">
                      {a.name}
                    </span>
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          a.status === "Aloqada" ? "#16A34A" : "#DC2626",
                      }}
                      title={a.status}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        // --- Fider darajasi: Fider + TP'lar ---
        <>
          <h2 className="px-1 text-[16px] font-bold leading-[21px] text-[#333333]">
            Joylashuvlar
          </h2>

          <ul className="flex flex-col gap-2.5 overflow-y-auto">
            <Row
              icon={<FeederIcon className="h-6 w-6 shrink-0" strokeWidth={2} />}
              label={feeder.label}
              selected={selKind === "feeder"}
              onClick={onSelectFeeder}
            />

            <li className="px-1 pt-1.5 text-[12px] font-semibold tracking-wide text-[#9AA0A6] uppercase">
              Transformatorlar
            </li>

            {feeder.tps.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onSelectTp(t.id)}
                  className="group flex h-12 w-full items-center gap-4 rounded-xl px-5 text-[#333333] transition-colors hover:bg-[#F3F3F3]"
                >
                  <TpIcon className="h-6 w-6 shrink-0 text-[#9AA1A9]" strokeWidth={2} />
                  <span className="min-w-0 flex-1 truncate text-[18px] font-semibold leading-[23px]">
                    {t.label}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#C4CAD1] transition-colors group-hover:text-[#8A9099]" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}

function Row({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={[
          "flex h-12 w-full items-center gap-4 rounded-xl px-5 transition-colors",
          selected ? "bg-[#007CD2] text-white" : "text-[#333333] hover:bg-[#F3F3F3]",
        ].join(" ")}
      >
        <span className={selected ? "text-white" : "text-[#333333]"}>{icon}</span>
        <span className="truncate text-[18px] font-semibold leading-[23px]">
          {label}
        </span>
      </button>
    </li>
  );
}
