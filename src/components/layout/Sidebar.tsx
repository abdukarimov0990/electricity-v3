"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ClipboardList,
  FileText,
  House,
  Map as MapIcon,
  Settings,
  Zap,
} from "lucide-react";

type NavItem = {
  key: string;
  label: string;
  Icon: typeof House;
  href: string;
};

// BEAP bo'limlari. Faol holat joriy URL bo'yicha aniqlanadi.
const NAV: NavItem[] = [
  { key: "dashboard", label: "Fider paneli", Icon: House, href: "/" },
  { key: "transformers", label: "Transformatorlar", Icon: Zap, href: "/transformers" },
  { key: "balance", label: "Energiya balansi", Icon: Activity, href: "/energy-balance" },
  { key: "works", label: "Rejalashtirilgan ishlar", Icon: ClipboardList, href: "/works" },
  { key: "reports", label: "Hisobotlar", Icon: FileText, href: "/reports" },
  { key: "map", label: "Xarita", Icon: MapIcon, href: "/map" },
];

interface SidebarProps {
  /** Xarita sahifasida: xarita ikonasiga 2x-click oq panelni ochib/yopadi. */
  onMapDoubleClick?: () => void;
}

/**
 * Umumiy qora navigatsiya (72px, #2C2C2C, r16). Sahifalar o'rtasida o'tish shu
 * yerda; faol bo'lim `usePathname` bilan belgilanadi.
 */
export function Sidebar({ onMapDoubleClick }: SidebarProps) {
  const pathname = usePathname();

  const itemClass = (active: boolean) =>
    [
      "flex h-14 w-14 items-center justify-center rounded-lg transition-colors",
      active ? "bg-[#444445]" : "hover:bg-white/10",
    ].join(" ");

  return (
    <nav className="flex h-full w-[72px] shrink-0 select-none flex-col items-center justify-between rounded-2xl border-2 border-[#DDDDDD] bg-[#2C2C2C] p-1.5">
      <div className="flex flex-col items-center gap-2.5">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              title={
                item.key === "map"
                  ? `${item.label} (2x bosib panelni yoping)`
                  : item.label
              }
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              onDoubleClick={item.key === "map" ? onMapDoubleClick : undefined}
              className={itemClass(active)}
            >
              <item.Icon className="h-[26px] w-[26px] text-white" strokeWidth={1.9} />
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <button
          type="button"
          title="Profil"
          aria-label="Profil"
          className="flex h-14 w-14 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/map/avatar.png"
            alt="Profil"
            className="h-11 w-11 rounded-full object-cover"
          />
        </button>
        <button
          type="button"
          title="Sozlamalar"
          aria-label="Sozlamalar"
          className="flex h-14 w-14 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
        >
          <Settings className="h-[26px] w-[26px] text-white" strokeWidth={1.9} />
        </button>
      </div>
    </nav>
  );
}
