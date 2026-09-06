"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BoltIcon,
  DashboardIcon,
  HomeIcon,
  MapIcon,
  SettingsIcon,
  SparkleIcon,
} from "@/components/map/icons";

type NavItem = {
  key: string;
  label: string;
  Icon: typeof HomeIcon;
  href?: string;
};

const NAV: NavItem[] = [
  { key: "home", label: "Bosh sahifa", Icon: HomeIcon, href: "/" },
  { key: "dashboard", label: "Boshqaruv", Icon: DashboardIcon },
  { key: "energy", label: "Energiya", Icon: BoltIcon },
  { key: "map", label: "Xarita", Icon: MapIcon, href: "/map" },
  { key: "ai", label: "Tahlil", Icon: SparkleIcon },
];

interface SidebarProps {
  /** Xarita sahifasida: xarita ikonasiga 2x-click oq panelni ochib/yopadi. */
  onMapDoubleClick?: () => void;
  /** Home sahifasida: uy ikonasiga 2x-click "Bo'limlar" panelini ochib/yopadi. */
  onHomeDoubleClick?: () => void;
}

/**
 * Umumiy qora navigatsiya (Figma "White" 72x1064, #2C2C2C, r16). Sahifalar
 * o'rtasida o'tish shu yerda: uy -> "/", xarita -> "/map". Faol holat joriy
 * URL bo'yicha aniqlanadi.
 */
export function Sidebar({
  onMapDoubleClick,
  onHomeDoubleClick,
}: SidebarProps) {
  const pathname = usePathname();

  const doubleClickFor = (key: string) =>
    key === "map"
      ? onMapDoubleClick
      : key === "home"
        ? onHomeDoubleClick
        : undefined;

  const itemClass = (active: boolean) =>
    [
      "flex h-14 w-14 items-center justify-center rounded-lg transition-colors",
      active ? "bg-[#444445]" : "hover:bg-white/10",
    ].join(" ");

  return (
    <nav className="flex h-full w-[72px] shrink-0 select-none flex-col items-center justify-between rounded-2xl border-2 border-[#DDDDDD] bg-[#2C2C2C] p-1.5">
      <div className="flex flex-col items-center gap-3">
        {NAV.map((item) => {
          const active = item.href ? pathname === item.href : false;
          const icon = (
            <item.Icon className="h-7 w-7 text-white" strokeWidth={2} />
          );

          if (item.href) {
            return (
              <Link
                key={item.key}
                href={item.href}
                title={
                  doubleClickFor(item.key)
                    ? `${item.label} (2x bosib panelni yoping)`
                    : item.label
                }
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                onDoubleClick={doubleClickFor(item.key)}
                className={itemClass(active)}
              >
                {icon}
              </Link>
            );
          }

          return (
            <button
              key={item.key}
              type="button"
              title={item.label}
              aria-label={item.label}
              className={itemClass(false)}
            >
              {icon}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-3">
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
          <SettingsIcon className="h-7 w-7 text-white" strokeWidth={2} />
        </button>
      </div>
    </nav>
  );
}
