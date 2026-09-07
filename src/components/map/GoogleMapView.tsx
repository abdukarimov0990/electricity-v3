"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Markaziy xarita - HAQIQIY Google Maps JavaScript API. Figma uslubi (ochiq
// roadmap). Markerlar dinamik: `markers` to'plami o'zgarsa qayta chiziladi
// (Fider darajasida - TP'lar, TP darajasida - Abonentlar). `center/zoom`
// o'zgarsa xarita panTo bilan uchadi. Markerlar custom OverlayView (mapId'siz).

import { useEffect, useRef, useState } from "react";

import { MapIcon } from "./icons";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

const MAP_STYLE: any[] = [
  { elementType: "geometry", stylers: [{ color: "#f4f2ed" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8f8f8f" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }, { weight: 3 }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.neighborhood", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e3e9d5" }, { visibility: "on" }] },
  { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#eeece6" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#f7d979" }] },
  { featureType: "road.arterial", elementType: "geometry.stroke", stylers: [{ color: "#ecc85e" }] },
  { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#f5cd5f" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e6b94c" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c4dcef" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9db6cc" }] },
];

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
    )}&v=weekly&loading=async&callback=${cbName}`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps yuklanmadi"));
    document.head.appendChild(script);
  });

  return loaderPromise;
}

function markerHtml(label: string, selected: boolean): string {
  const w = selected ? 33 : 27;
  const h = Math.round((w * 41) / 27);
  return `
    <div style="display:flex;flex-direction:column;align-items:center;pointer-events:auto;">
      <div style="position:relative;background:${selected ? "#007CD2" : "rgba(15,15,20,.88)"};color:#fff;font:600 11px/1 Inter,system-ui,sans-serif;padding:6px 10px;border-radius:8px;white-space:nowrap;margin-bottom:6px;">
        ${label}
        <div style="position:absolute;left:50%;bottom:-5px;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid ${selected ? "#007CD2" : "rgba(15,15,20,.88)"};"></div>
      </div>
      <svg width="${w}" height="${h}" viewBox="0 0 27 41" style="display:block;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3));">
        <path d="M13.5 0C6 0 0 6 0 13.4c0 9.9 12.1 26 12.6 26.6a1.1 1.1 0 0 0 1.8 0C14.9 39.4 27 23.3 27 13.4 27 6 21 0 13.5 0Z" fill="${selected ? "#007CD2" : "#42A5F5"}" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="13.5" cy="13.5" r="5" fill="#ffffff"/>
      </svg>
    </div>`;
}

interface GoogleMapViewProps {
  markers: MapMarker[];
  selectedId: string | null;
  center: { lat: number; lng: number };
  zoom: number;
  onSelect: (id: string) => void;
  className?: string;
}

export function GoogleMapView({
  markers,
  selectedId,
  center,
  zoom,
  onSelect,
  className,
}: GoogleMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const overlaysRef = useRef<Record<string, { overlay: any; el: HTMLElement }>>({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    API_KEY ? "loading" : "idle",
  );

  const markersKey = markers.map((m) => m.id).join(",");

  useEffect(() => {
    if (!API_KEY) return;
    (window as any).gm_authFailure = () => setStatus("error");
  }, []);

  // Xaritani bir marta yaratish.
  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;
    loadGoogleMaps(API_KEY)
      .then(() => {
        if (cancelled || !containerRef.current) return;
        const g = (window as any).google;
        mapRef.current = new g.maps.Map(containerRef.current, {
          center,
          zoom,
          disableDefaultUI: true,
          clickableIcons: false,
          styles: MAP_STYLE,
          backgroundColor: "#f4f2ed",
        });
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

  // Marker to'plami o'zgarsa - qayta chizish.
  useEffect(() => {
    if (status !== "ready") return;
    const g = (window as any).google;
    const map = mapRef.current;
    if (!g || !map) return;

    // Eski overlaylarni tozalash.
    Object.values(overlaysRef.current).forEach(({ overlay }) => overlay.setMap(null));
    overlaysRef.current = {};

    class HtmlMarker extends g.maps.OverlayView {
      position: any;
      el: HTMLElement;
      constructor(position: any, el: HTMLElement) {
        super();
        this.position = position;
        this.el = el;
      }
      onAdd() {
        this.getPanes().overlayMouseTarget.appendChild(this.el);
      }
      draw() {
        const p = this.getProjection()?.fromLatLngToDivPixel(this.position);
        if (p) {
          this.el.style.left = `${p.x}px`;
          this.el.style.top = `${p.y}px`;
        }
      }
      onRemove() {
        this.el.remove();
      }
    }

    markers.forEach((m) => {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.transform = "translate(-50%, -100%)";
      el.style.cursor = "pointer";
      el.style.zIndex = m.id === selectedId ? "999" : "1";
      el.innerHTML = markerHtml(m.label, m.id === selectedId);
      el.addEventListener("click", () => onSelectRef.current(m.id));
      const overlay = new HtmlMarker(new g.maps.LatLng(m.lat, m.lng), el);
      overlay.setMap(map);
      overlaysRef.current[m.id] = { overlay, el };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, markersKey]);

  // Tanlov o'zgarsa - highlight yangilash.
  useEffect(() => {
    if (status !== "ready") return;
    Object.entries(overlaysRef.current).forEach(([id, { el }]) => {
      const m = markers.find((x) => x.id === id);
      if (!m) return;
      el.style.zIndex = id === selectedId ? "999" : "1";
      el.innerHTML = markerHtml(m.label, id === selectedId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, selectedId]);

  // Markaz/zoom o'zgarsa - uchib borish.
  useEffect(() => {
    if (status !== "ready" || !mapRef.current) return;
    mapRef.current.panTo(center);
    mapRef.current.setZoom(zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, center.lat, center.lng, zoom]);

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
        "relative overflow-hidden rounded-2xl border-2 border-[#DDDDDD] bg-[#f4f2ed]",
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
