import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, FileText, KeyRound, BookOpen, Briefcase, Award, Users } from "lucide-react";

// @prisma/client থেকে ইমপোর্ট না করে এখানে সরাসরি ডিফাইন করুন
export type Role = "ADMIN" | "EDITOR";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: Role[];
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  // আপনার বাকি আইটেমগুলো এখানে থাকবে...
];