import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export function AdminNavLink({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 p-2 rounded-md transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5" /> 
      <span>{label}</span>
    </Link>
  );
}