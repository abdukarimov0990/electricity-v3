import type { Metadata } from "next";

import { TransformersView } from "@/components/dashboard/TransformersView";

export const metadata: Metadata = {
  title: "Transformatorlar",
};

export default function TransformersPage() {
  return <TransformersView />;
}
