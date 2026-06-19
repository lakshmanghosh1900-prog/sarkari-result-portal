"use client";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteButton({ id, action, itemLabel = "item" }: any) {
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    if (!confirm(`Delete ${itemLabel}?`)) return;
    startTransition(async () => { await action(id); });
  }
  return (
    <Button variant="ghost" size="icon" onClick={handleClick} disabled={isPending}>
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}