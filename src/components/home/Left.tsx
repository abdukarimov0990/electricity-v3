"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircuitBoard,
  Factory,
  Hand,
  House,
  LayoutDashboard,
  LayoutPanelTop,
  Map as MapIcon,
  Settings,
  Sparkle,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { SafeImage } from "@/components/map/SafeImage";

import { sections, type SectionIcon } from "./data";

const NAV: { key: string; Icon: LucideIcon; href?: string; label: string }[] = [
  { key: "home", Icon: House, href: "/", label: "Asosiy" },
  { key: "panel", Icon: LayoutPanelTop, label: "Boshqaruv" },
  { key: "energy", Icon: Zap, label: "Energiya" },
  { key: "map", Icon: MapIcon, href: "/map", label: "Xarita" },
  { key: "ai", Icon: Sparkle, label: "Tahlil" },
];

const SEC_ICON: Record<SectionIcon, LucideIcon> = {
  asosiy: LayoutDashboard,
  podstansiya: Factory,
  fider: Workflow,
  transformer: CircuitBoard,
  abonent: Users,
  qoida: Hand,
};

/** Chap ustun: qora sidebar (72) + "Bo'limlar" oq paneli (340). */
export function Left() {
  const pathname = usePathname();
  const [active, setActive] = useState("asosiy");

  const btn = (on: boolean) =>
    [
      "flex h-14 w-[60px] items-center justify-center rounded-lg transition-colors",
      on ? "bg-[#444445]" : "hover:bg-white/10",
    ].join(" ");

  return (
    <div className="flex h-full shrink-0 gap-2">
      {/* Sidebar */}
      <nav className="flex h-full w-[72px] shrink-0 select-none flex-col items-center justify-between rounded-2xl bg-[#2C2C2C] p-1.5">
        <div className="flex flex-col items-center gap-3">
          {NAV.map((n) => {
            const on = n.href ? pathname === n.href : false;
            const icon = <n.Icon className="h-6 w-6 text-white" strokeWidth={1.5} />;
            return n.href ? (
              <Link key={n.key} href={n.href} aria-label={n.label} title={n.label} className={btn(on)}>
                {icon}
              </Link>
            ) : (
              <button key={n.key} type="button" aria-label={n.label} title={n.label} className={btn(false)}>
                {icon}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col items-center gap-3">
          <button type="button" title="Profil" className={btn(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/map/avatar.png" alt="Profil" className="h-8 w-8 rounded-full object-cover" />
          </button>
          <button type="button" title="Sozlamalar" className={btn(false)}>
            <Settings className="h-6 w-6 text-white" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Bo'limlar paneli */}
      <aside className="flex h-full w-[340px] shrink-0 flex-col justify-between rounded-2xl bg-white p-4">
        <div className="flex flex-col gap-2">
          <h2 className="px-1 text-[16px] font-bold leading-[21px] text-[#333333]">
            Bo&apos;limlar
          </h2>
          <ul className="flex flex-col gap-2">
            {sections.map((s) => {
              const on = s.key === active;
              const SIcon = SEC_ICON[s.icon];
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setActive(s.key)}
                    className={[
                      "flex h-12 w-full items-center gap-4 rounded-xl px-5 transition-colors",
                      on ? "bg-[#007CD2] text-white" : "text-[#333333] hover:bg-[#F3F3F3]",
                    ].join(" ")}
                  >
                    <SIcon
                      className={on ? "h-6 w-6 shrink-0 text-white" : "h-6 w-6 shrink-0 text-[#333333]"}
                      strokeWidth={1.75}
                    />
                    <span className="truncate text-[16px] font-semibold leading-[21px]">
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <SafeImage
          src="/home/promo.png"
          alt="Baliqchi"
          className="aspect-[308/237] w-full rounded-md"
        />
      </aside>
    </div>
  );
}
