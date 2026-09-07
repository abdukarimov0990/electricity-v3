import { Sidebar } from "@/components/layout/Sidebar";

import { PageHeader } from "./PageHeader";

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * BEAP dashboard sahifalari uchun umumiy karkas: qora nav + sarlavha + kontent.
 * Minimalist stil: yengil kulrang fon, oq kartalar, #007CD2 accent.
 */
export function DashboardShell({
  title,
  subtitle,
  actions,
  children,
}: DashboardShellProps) {
  return (
    <div className="flex h-screen w-full gap-2 overflow-hidden bg-[#F7F8FA] p-2">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <PageHeader title={title} subtitle={subtitle} actions={actions} />
        <div className="flex-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
          {children}
        </div>
      </main>
    </div>
  );
}
