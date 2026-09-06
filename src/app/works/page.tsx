import type { Metadata } from "next";

import { WorksView } from "@/components/dashboard/WorksView";

export const metadata: Metadata = {
  title: "Rejalashtirilgan ishlar",
};

export default function WorksPage() {
  return <WorksView />;
}
