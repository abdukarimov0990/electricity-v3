import {
  DoneWorksCard,
  IstemolCard,
  PlannedWorksCard,
  QuickStatsCard,
  RadialCard,
  ReportsCard,
  ResponsibleCard,
  TopTransformersCard,
  ViolationsCard,
} from "./cards";
import { KpiRow } from "./kpi";
import { Left } from "./Left";
import { MiniMapCard } from "./MiniMapCard";
import { debt, lossShare } from "./data";

/**
 * Asosiy (Home) dashboard - Figma "wrapper" (node 4029:931) dan pixel-perfect.
 * Chap ustun (nav) + asosiy grid: 6 KPI + grafiklar, jadvallar, xarita, hisobot.
 */
export function HomeView() {
  return (
    <div className="flex h-screen w-full gap-2 overflow-hidden bg-[#F1F3F6] p-2">
      <Left />

      <main className="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto pr-0.5">
        <KpiRow />

        {/* Row A */}
        <div className="grid h-[298px] shrink-0 grid-cols-1 gap-2 lg:grid-cols-3">
          <IstemolCard />
          <div className="flex flex-col gap-2">
            <ViolationsCard />
            <ResponsibleCard className="flex flex-1 flex-col justify-center" />
          </div>
          <TopTransformersCard />
        </div>

        {/* Row B */}
        <div className="grid h-[336px] shrink-0 grid-cols-2 gap-2 xl:grid-cols-[322fr_322fr_487fr_322fr]">
          <RadialCard data={debt} />
          <RadialCard data={lossShare} />
          <MiniMapCard />
          <QuickStatsCard />
        </div>

        {/* Row C */}
        <div className="grid h-[209px] shrink-0 grid-cols-1 gap-2 lg:grid-cols-[487fr_652fr_322fr]">
          <DoneWorksCard />
          <PlannedWorksCard />
          <ReportsCard />
        </div>
      </main>
    </div>
  );
}
