"use client";

import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";

import { GoogleMapView } from "./GoogleMapView";
import { InformationPanel } from "./InformationPanel";
import { LocationPanel } from "./LocationPanel";
import { ExpandIcon, FeederIcon } from "./icons";
import { locations } from "./data";

type Drawer = "none" | "locations" | "info";

/**
 * Xarita sahifasi kompozitsiyasi (Figma "main"): qora nav (72) + oq
 * joylashuvlar paneli (340) + Google Maps + ma'lumotlar paneli (340), gap 8.
 * - Sidebar'dagi xarita ikonasini 2x bosib oq panel ochiladi/yopiladi.
 * - Oq paneldagi tugma bosilsa xarita o'sha nuqtaga uchadi va o'ng panelda
 *   aynan o'sha joylashuvning ma'lumoti ko'rsatiladi.
 */
export function MapScreen() {
  const [selectedId, setSelectedId] = useState(locations[0]!.id);
  const [locationsOpen, setLocationsOpen] = useState(true);
  const [drawer, setDrawer] = useState<Drawer>("none");

  const selected = locations.find((l) => l.id === selectedId) ?? locations[0]!;

  const select = (id: string) => {
    setSelectedId(id);
    setDrawer("none");
  };

  return (
    <div className="flex h-screen w-full gap-2 overflow-hidden bg-white">
      <Sidebar onMapDoubleClick={() => setLocationsOpen((o) => !o)} />

      {/* Desktop: joylashuvlar ustuni (2x-click bilan ochib/yopiladi) */}
      {locationsOpen && (
        <div className="hidden w-[340px] shrink-0 xl:block">
          <LocationPanel
            locations={locations}
            selectedId={selectedId}
            onSelect={select}
          />
        </div>
      )}

      {/* Markaziy xarita */}
      <div className="relative min-w-0 flex-1">
        <GoogleMapView
          locations={locations}
          selectedId={selectedId}
          onSelect={select}
          className="h-full w-full"
        />

        <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between xl:hidden">
          <DrawerToggle
            onClick={() => setDrawer("locations")}
            label="Joylashuvlar"
            icon={<FeederIcon className="h-4 w-4" strokeWidth={2} />}
          />
          <DrawerToggle
            onClick={() => setDrawer("info")}
            label="Ma'lumotlar"
            icon={<ExpandIcon className="h-4 w-4" strokeWidth={2} />}
          />
        </div>
      </div>

      {/* Desktop: ma'lumotlar ustuni */}
      <div className="hidden w-[340px] shrink-0 xl:block">
        <InformationPanel data={selected.data} />
      </div>

      {/* Mobil/planshet: drawerlar (viewportga clip qilingan) */}
      <div
        className={[
          "fixed inset-0 z-40 overflow-hidden xl:hidden",
          drawer === "none" ? "pointer-events-none" : "pointer-events-auto",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Yopish"
          tabIndex={drawer === "none" ? -1 : 0}
          onClick={() => setDrawer("none")}
          className={[
            "absolute inset-0 bg-black/30 transition-opacity duration-300",
            drawer === "none" ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <div
          className={[
            "absolute top-2 bottom-2 left-2 w-[86vw] max-w-[340px] transition-transform duration-300",
            drawer === "locations" ? "translate-x-0" : "-translate-x-[115%]",
          ].join(" ")}
        >
          <LocationPanel
            locations={locations}
            selectedId={selectedId}
            onSelect={select}
          />
        </div>
        <div
          className={[
            "absolute top-2 right-2 bottom-2 w-[90vw] max-w-[340px] transition-transform duration-300",
            drawer === "info" ? "translate-x-0" : "translate-x-[115%]",
          ].join(" ")}
        >
          <InformationPanel data={selected.data} />
        </div>
      </div>
    </div>
  );
}

function DrawerToggle({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-[13px] font-medium text-[#333333] shadow-md ring-1 ring-black/5 backdrop-blur transition-colors hover:bg-white"
    >
      <span className="text-[#007CD2]">{icon}</span>
      {label}
    </button>
  );
}
