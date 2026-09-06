import type { Metadata } from "next";

import { EnergyBalanceView } from "@/components/dashboard/EnergyBalanceView";

export const metadata: Metadata = {
  title: "Energiya balansi",
};

export default function EnergyBalancePage() {
  return <EnergyBalanceView />;
}
