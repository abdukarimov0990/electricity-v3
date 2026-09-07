"use client";

import { useMemo, useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";

import { AbonentPanel } from "./AbonentPanel";
import { GoogleMapView, type MapMarker } from "./GoogleMapView";
import { InformationPanel } from "./InformationPanel";
import { LocationPanel, type SelKind } from "./LocationPanel";
import { ExpandIcon, FeederIcon } from "./icons";
import { feeders } from "./data";

type Drawer = "none" | "locations" | "info";

const shortLabel = (name: string) => {
  const first = name.replace(/["]/g, "").split(" ")[0]!;
  return first.length > 12 ? `${first.slice(0, 12)}…` : first;
};

/**
 * Xarita sahifasi - Fider -> TP -> Abonent ierarxiyasi. Har element bosilganda
 * chap panel, xarita va o'ng panel tanlangan obyektga mos yangilanadi.
 */
export function MapScreen() {
  const feeder = feeders[0]!;
  const [sel, setSel] = useState<{ tpId: string | null; abonentId: string | null }>({
    tpId: null,
    abonentId: null,
  });
  const [locationsOpen, setLocationsOpen] = useState(true);
  const [drawer, setDrawer] = useState<Drawer>("none");

  const tp = sel.tpId ? feeder.tps.find((t) => t.id === sel.tpId) ?? null : null;
  const abonent =
    tp && sel.abonentId ? tp.abonents.find((a) => a.id === sel.abonentId) ?? null : null;

  const selKind: SelKind = abonent ? "abonent" : tp ? "tp" : "feeder";
  const selId = abonent?.id ?? tp?.id ?? feeder.id;

  // Xarita markerlari: TP darajasida - abonentlar, aks holda - TP'lar.
  const markers: MapMarker[] = useMemo(() => {
    if (tp) {
      return tp.abonents.map((a) => ({
        id: a.id,
        lat: a.lat,
        lng: a.lng,
        label: shortLabel(a.name),
      }));
    }
    return feeder.tps.map((t) => ({
      id: t.id,
      lat: t.lat,
      lng: t.lng,
      label: t.label,
    }));
  }, [feeder, tp]);

  const focus = abonent
    ? { lat: abonent.lat, lng: abonent.lng, zoom: 18 }
    : tp
      ? { lat: tp.lat, lng: tp.lng, zoom: tp.zoom }
      : { lat: feeder.lat, lng: feeder.lng, zoom: feeder.zoom };

  const selectFeeder = () => setSel({ tpId: null, abonentId: null });
  const selectTp = (tpId: string) => setSel({ tpId, abonentId: null });
  const selectAbonent = (abonentId: string) =>
    setSel((s) => ({ ...s, abonentId }));

  // Markerni bosish: TP darajasida abonent tanlanadi, aks holda TP'ga kiriladi.
  const onMarkerSelect = (id: string) => {
    if (tp) selectAbonent(id);
    else selectTp(id);
    setDrawer("none");
  };

  const rightPanel = abonent ? (
    <AbonentPanel abonent={abonent} />
  ) : (
    <InformationPanel data={tp ? tp.data : feeder.data} />
  );

  const leftPanel = (
    <LocationPanel
      feeder={feeder}
      tp={tp}
      selKind={selKind}
      selId={selId}
      onSelectFeeder={() => {
        selectFeeder();
        setDrawer("none");
      }}
      onSelectTp={(id) => {
        selectTp(id);
      }}
      onSelectAbonent={(id) => {
        selectAbonent(id);
        setDrawer("none");
      }}
      onBack={selectFeeder}
    />
  );

  return (
    <div className="flex h-screen w-full gap-2 overflow-hidden bg-white p-2">
      <Sidebar onMapDoubleClick={() => setLocationsOpen((o) => !o)} />

      {locationsOpen && (
        <div className="hidden w-[340px] shrink-0 xl:block">{leftPanel}</div>
      )}

      <div className="relative min-w-0 flex-1">
        <GoogleMapView
          markers={markers}
          selectedId={abonent ? abonent.id : null}
          center={{ lat: focus.lat, lng: focus.lng }}
          zoom={focus.zoom}
          onSelect={onMarkerSelect}
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

      <div className="hidden w-[340px] shrink-0 xl:block">{rightPanel}</div>

      {/* Mobil/planshet: drawerlar */}
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
          {leftPanel}
        </div>
        <div
          className={[
            "absolute top-2 right-2 bottom-2 w-[90vw] max-w-[340px] transition-transform duration-300",
            drawer === "info" ? "translate-x-0" : "translate-x-[115%]",
          ].join(" ")}
        >
          {rightPanel}
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
