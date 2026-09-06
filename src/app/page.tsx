import type { Metadata } from "next";

import { HomeScreen } from "@/components/home/HomeScreen";

export const metadata: Metadata = {
  title: "Bosh sahifa",
};

export default function HomePage() {
  return <HomeScreen />;
}
