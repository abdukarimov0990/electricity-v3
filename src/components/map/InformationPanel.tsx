"use client";

import { useState } from "react";

import { EnergyDonutChart } from "./EnergyDonutChart";
import { ExpandIcon } from "./icons";
import { ImageGallery } from "./ImageGallery";
import { OperatorCard } from "./OperatorCard";
import { ProductionList } from "./ProductionList";
import { StationModal } from "./StationModal";
import { StatGrid } from "./StatGrid";
import type { StationData } from "./data";

interface InformationPanelProps {
  data: StationData;
}

/**
 * O'ng "Ma'lumotlar" paneli (Figma "Right" 340x1064, r16, pad16, gap10).
 * Tanlangan joylashuvning ma'lumotini ko'rsatadi. Expand -> to'liq modal.
 */
export function InformationPanel({ data }: InformationPanelProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <aside className="flex h-full w-full flex-col gap-2.5 overflow-hidden rounded-2xl border-2 border-[#DDDDDD] bg-white p-4">
      <div className="flex shrink-0 items-center justify-between">
        <h2 className="text-[16px] font-bold leading-[21px] text-[#333333]">
          Ma&apos;lumotlar
        </h2>
        <button
          type="button"
          aria-label="To'liq ochish"
          onClick={() => setModalOpen(true)}
          className="flex h-5 w-5 items-center justify-center text-[#333333] transition-opacity hover:opacity-60"
        >
          <ExpandIcon className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto">
        <ImageGallery key={data.title} images={data.gallery} alt={data.title} />

        <h3 className="text-[16px] font-bold leading-[21px] text-[#333333]">
          {data.title}
        </h3>

        <StatGrid stats={data.stats} />
        <EnergyDonutChart segments={data.donut} />
        <OperatorCard name={data.operator} />
        <ProductionList items={data.topConsumers} />
      </div>

      <StationModal
        open={modalOpen}
        data={data}
        onClose={() => setModalOpen(false)}
      />
    </aside>
  );
}
