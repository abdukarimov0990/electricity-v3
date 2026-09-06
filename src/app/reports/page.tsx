import type { Metadata } from "next";

import { ReportsView } from "@/components/dashboard/ReportsView";

export const metadata: Metadata = {
  title: "Hisobotlar",
};

export default function ReportsPage() {
  return <ReportsView />;
}
