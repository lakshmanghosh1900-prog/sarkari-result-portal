import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">SarkariPortal</Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/job" className="hover:text-primary">Jobs</Link>
          <Link href="/result" className="hover:text-primary">Results</Link>
          <Link href="/admit-card" className="hover:text-primary">Admit Cards</Link>
          <Link href="/answer-key" className="hover:text-primary">Answer Keys</Link>
          <Link href="/syllabus" className="hover:text-primary">Syllabus</Link>
        </div>
        <Button variant="outline" size="sm" asChild>
            <Link href="/admin">Admin</Link>
        </Button>
      </div>
    </nav>
  );
}