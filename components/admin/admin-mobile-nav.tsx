"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ADMIN_NAV_ITEMS } from "@/lib/config/admin-nav";
import { AdminNavLink } from "./admin-nav-link";
import { SignOutButton } from "./sign-out-button";

// রোল টাইপটি সরাসরি এখানে ডিফাইন করা হলো যাতে কোনো ইমপোর্ট এরর না হয়
type Role = "ADMIN" | "EDITOR";

interface AdminMobileNavProps { 
  role: Role; 
  userEmail: string; 
}

export function AdminMobileNav({ role, userEmail }: AdminMobileNavProps) {
  const [open, setOpen] = useState(false);
  
  // এখানে রোল চেক করা হচ্ছে
  const visibleItems = ADMIN_NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role));
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-64 flex-col p-0">
        <div className="border-b px-4 py-4">
          <p className="truncate text-xs text-muted-foreground">{userEmail}</p>
          <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase">{role}</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" onClick={() => setOpen(false)}>
          {visibleItems.map((item) => (
            <AdminNavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
        </nav>
        <div className="border-t px-3 py-3"><SignOutButton /></div>
      </SheetContent>
    </Sheet>
  );
}