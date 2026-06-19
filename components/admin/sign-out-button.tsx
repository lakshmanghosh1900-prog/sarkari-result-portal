import { logoutAction } from "@/lib/actions/logout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
export function SignOutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="ghost" className="w-full justify-start gap-2">
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </form>
  );
}