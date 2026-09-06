import type { Metadata } from "next";

import { MapScreen } from "@/components/map/MapScreen";

export const metadata: Metadata = {
  title: "Xarita",
};

export default function MapPage() {
  return <MapScreen />;
}
