"use client";

import { useEffect } from "react";

import { X } from "lucide-react";

import { EnergyDonutChart } from "./EnergyDonutChart";
import { ImageGallery } from "./ImageGallery";
import { OperatorCard } from "./OperatorCard";
import { ProductionList } from "./ProductionList";
import { StatGrid } from "./StatGrid";
import type { StationData } from "./data";

interface StationModalProps {
  open: boolean;
  data: StationData;
  onClose: () => void;
}

/**
 * Expand tugmasi ochadigan to'liq modal - podstansiyaning barcha ma'lumotlari
 * va chartlari kengaytirilgan 2 ustunli ko'rinishda. Backdrop/Escape yopadi.
 */
export function StationModal({ open, data, onClose }: StationModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Yopish"
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={data.title}
        className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-[#EDEDED] px-6 py-4">
          <div>
            <p className="text-[13px] font-bold text-[#999999]">Ma&apos;lumotlar</p>
            <h2 className="text-[19px] font-bold text-[#333333]">{data.title}</h2>
          </div>
          <button
            type="button"
            aria-label="Yopish"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-[#F3F3F3] hover:text-[#333]"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="grid grid-cols-1 gap-8 overflow-y-auto p-6 lg:grid-cols-2">
          <ImageGallery
            key={data.title}
            images={data.gallery}
            alt={data.title}
            mainClassName="aspect-[16/10] w-full rounded-2xl"
            thumbWidth={104}
          />

          <div className="flex flex-col gap-5">
            <StatGrid stats={data.stats} />
            <EnergyDonutChart segments={data.donut} size={96} />
            <OperatorCard name={data.operator} />
            <ProductionList items={data.topConsumers} />
          </div>
        </div>
      </div>
    </div>
  );
}
