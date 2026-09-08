"use client";

import { Maximize2, TriangleAlert } from "lucide-react";

import { GoogleMapView } from "@/components/map/GoogleMapView";

import { miniMap } from "./data";

/** "Interaktiv ko'rinish" - kichik jonli xarita + TP popup. */
export function MiniMapCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-4">
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-bold leading-[18px] text-[#333333]">
          Interaktiv ko&apos;rinish
        </h3>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9EBEE] text-[#8A9099] hover:bg-[#F3F3F3]">
          <Maximize2 className="h-4 w-4" />
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl">
        <GoogleMapView
          markers={[miniMap.marker]}
          selectedId={miniMap.marker.id}
          center={miniMap.center}
          zoom={miniMap.zoom}
          onSelect={() => {}}
          className="h-full w-full"
        />

        {/* Popup */}
        <div className="absolute top-3 right-3 w-[220px] rounded-xl bg-white/95 p-3 shadow-lg ring-1 ring-black/5 backdrop-blur">
          <p className="text-[11px] text-[#8A9099]">{miniMap.popup.title}</p>
          <p className="text-[14px] font-bold text-[#007CD2]">{miniMap.popup.tp}</p>
          <p className="mt-1 text-[12px] font-medium text-[#333333]">{miniMap.popup.use}</p>
          <p className="mt-1.5 flex items-start gap-1 rounded-lg bg-[#FFF6E6] p-1.5 text-[11px] leading-tight text-[#B5820F]">
            <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {miniMap.popup.warn}
          </p>
        </div>
      </div>

      <a className="mt-2 text-center text-[13px] font-semibold text-[#007CD2]">
        Asosiy xaritani ochish
      </a>
    </div>
  );
}
