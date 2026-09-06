// Dashboard'da matn nomi bo'yicha lucide ikonasini chizuvchi yordamchi.
import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  Bell,
  Boxes,
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Cpu,
  Download,
  FileSpreadsheet,
  FileText,
  FileWarning,
  Gavel,
  Languages,
  ShieldCheck,
  ShoppingCart,
  Sun,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
  Wallet,
  Zap,
  type LucideProps,
} from "lucide-react";

const MAP = {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  Bell,
  Boxes,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Cpu,
  Download,
  FileSpreadsheet,
  FileText,
  FileWarning,
  Gavel,
  Languages,
  ShieldCheck,
  ShoppingCart,
  Sun,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
  Wallet,
  Zap,
} as const;

export type IconName = keyof typeof MAP;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = MAP[name as IconName] ?? CircleHelp;
  return <Cmp {...props} />;
}
