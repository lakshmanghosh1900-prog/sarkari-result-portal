import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navLinks = [
    { name: "Jobs", href: "/jobs" },
    { name: "Results", href: "/results" },
    { name: "Admit Card", href: "/admit-cards" },
    { name: "Answer Key", href: "/answer-keys" },
    { name: "Syllabus", href: "/syllabus" },
  ];

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Sarkari<span className="text-blue-600">Result</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-blue-600 transition-colors">
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" size="sm">
            <Link href="/admin">Admin</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}