import type { Metadata } from "next";

import { HomeView } from "@/components/home/HomeView";

export const metadata: Metadata = {
  title: "Asosiy",
};

export default function HomePage() {
  return <HomeView />;
}
