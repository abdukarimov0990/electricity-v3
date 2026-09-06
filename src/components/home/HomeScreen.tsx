"use client";

import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";

import { HomeMain } from "./HomeMain";
import { SectionsPanel } from "./SectionsPanel";

/**
 * Home sahifasi kompozitsiyasi (Figma "wrapper"): qora nav + "Bo'limlar"
 * paneli + asosiy maydon (stat kartalar), gap 8. Uy ikonasini 2x bosib
 * "Bo'limlar" panelini ochib/yopish mumkin.
 */
export function HomeScreen() {
  const [sectionsOpen, setSectionsOpen] = useState(true);

  return (
    <div className="flex h-screen w-full gap-2 overflow-hidden bg-white">
      <Sidebar onHomeDoubleClick={() => setSectionsOpen((o) => !o)} />

      {sectionsOpen && (
        <div className="min-w-0 max-w-[340px] flex-1 md:w-[340px] md:flex-none">
          <SectionsPanel />
        </div>
      )}

      <div
        className={[
          "min-w-0 flex-1 overflow-y-auto",
          sectionsOpen ? "hidden md:block" : "block",
        ].join(" ")}
      >
        <HomeMain />
      </div>
    </div>
  );
}
