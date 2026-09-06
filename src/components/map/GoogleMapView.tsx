"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Markaziy xarita - HAQIQIY Google Maps JavaScript API (AdvancedMarkerElement).
// Kalit faqat NEXT_PUBLIC_GOOGLE_MAPS_API_KEY dan. Joylashuv tanlanganda xarita
// o'sha nuqtaga uchadi (panTo) va yaqinlashadi. Kalit yo'q/yaroqsiz bo'lsa -
// toza ko'rsatma paneli.

import { useEffect, useRef, useState } from "react";

import { MapIcon } from "./icons";
import type { MapLocation } from "./data";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
// AdvancedMarkerElement uchun mapId shart. Google'ning ochiq demo ID'si.
const MAP_ID = "DEMO_MAP_ID";

let loaderPromise: Promise<void> | null = null;

function loadGoogleMaps(key: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if ((window as any).google?.maps) return Promise.resolve();
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise<void>((resolve, reject) => {
    const cbName = "__electricityInitGmap";
    (window as any)[cbName] = () => resolve();
    (window as any).gm_authFailure = () => reject(new Error("auth"));
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      key,
    )}&v=weekly&libraries=marker&loading=async&callback=${cbName}`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps yuklanmadi"));
    document.head.appendChild(script);
  });

  return loaderPromise;
}

// Marker tarkibi (HTML) - ko'k pin + ustida to'q yorliq (Figma marker).
function markerContent(label: string, selected: boolean): HTMLElement {
  const w = selected ? 33 : 27;
  const h = Math.round((w * 41) / 27);
  const el = document.createElement("div");
  el.style.cssText =
    "display:flex;flex-direction:column;align-items:center;cursor:pointer;";
  el.innerHTML = `
    <div style="position:relative;background:rgba(15,15,20,.88);color:#fff;font:500 11px/1 Inter,system-ui,sans-serif;padding:6px 10px;border-radius:8px;white-space:nowrap;margin-bottom:6px;">
      ${label}
      <div style="position:absolute;left:50%;bottom:-5px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(15,15,20,.88);"></div>
    </div>
    <svg width="${w}" height="${h}" viewBox="0 0 27 41" style="display:block;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3));">
      <path d="M13.5 0C6 0 0 6 0 13.4c0 9.9 12.1 26 12.6 26.6a1.1 1.1 0 0 0 1.8 0C14.9 39.4 27 23.3 27 13.4 27 6 21 0 13.5 0Z" fill="#42A5F5" stroke="#ffffff" stroke-width="1.5"/>
      <circle cx="13.5" cy="13.5" r="5" fill="#ffffff"/>
    </svg>`;
  return el;
}

interface GoogleMapViewProps {
  locations: MapLocation[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function GoogleMapView({
  locations,
  selectedId,
  onSelect,
  className,
}: GoogleMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const readyRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    API_KEY ? "loading" : "idle",
  );

  useEffect(() => {
    if (!API_KEY) return;
    (window as any).gm_authFailure = () => setStatus("error");
  }, []);

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;

    loadGoogleMaps(API_KEY)
      .then(async () => {
        if (cancelled || !containerRef.current) return;
        const g = (window as any).google;
        const { AdvancedMarkerElement } = await g.maps.importLibrary("marker");
        if (cancelled) return;

        const start =
          locations.find((l) => l.id === selectedId) ?? locations[0];

        const map = new g.maps.Map(containerRef.current, {
          center: { lat: start.lat, lng: start.lng },
          zoom: start.zoom,
          mapId: MAP_ID,
          disableDefaultUI: true,
          clickableIcons: false,
        });
        mapRef.current = map;

        locations.forEach((loc) => {
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: loc.lat, lng: loc.lng },
            title: loc.label,
            content: markerContent(loc.label, loc.id === selectedId),
            zIndex: loc.id === selectedId ? 999 : 1,
            gmpClickable: true,
          });
          marker.addListener("click", () => onSelect(loc.id));
          markersRef.current[loc.id] = marker;
        });

        readyRef.current = true;
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;
    const map = mapRef.current;
    const loc = locations.find((l) => l.id === selectedId);
    if (!map || !loc) return;

    map.panTo({ lat: loc.lat, lng: loc.lng });
    map.setZoom(loc.zoom);

    Object.entries(markersRef.current).forEach(([id, marker]: [string, any]) => {
      const target = locations.find((l) => l.id === id);
      if (!target) return;
      marker.content = markerContent(target.label, id === selectedId);
      marker.zIndex = id === selectedId ? 999 : 1;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  if (!API_KEY || status === "error") {
    return (
      <div
        className={[
          "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[#DDDDDD] bg-[#EEF0F3]",
          className ?? "",
        ].join(" ")}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(#dcdfe4_1px,transparent_1px),linear-gradient(90deg,#dcdfe4_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="relative flex max-w-sm flex-col items-center gap-3 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#007CD2] shadow-sm">
            <MapIcon className="h-7 w-7" />
          </div>
          <p className="text-[15px] font-semibold text-[#16181B]">
            {status === "error"
              ? "Xarita yuklanmadi (kalit yaroqsiz yoki Maps JS API yoqilmagan)"
              : "Google Maps sozlanmagan"}
          </p>
          <p className="text-[13px] leading-relaxed text-[#6B7178]">
            Google Maps <b>JavaScript API</b> kalitini{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[12px] text-[#007CD2]">
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            </code>{" "}
            (<code className="font-mono text-[12px]">.env.local</code>) ga qo&apos;shing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border-2 border-[#DDDDDD] bg-[#EDECE6]",
        className ?? "",
      ].join(" ")}
    >
      <div ref={containerRef} className="h-full w-full" />
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#EEF0F3] text-[13px] text-[#6B7178]">
          Xarita yuklanmoqda…
        </div>
      )}
    </div>
  );
}
