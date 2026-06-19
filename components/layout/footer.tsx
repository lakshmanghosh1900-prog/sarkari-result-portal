export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Sarkari Result Portal. All rights reserved.</p>
        <p className="mt-2">Building your future with real-time updates.</p>
      </div>
    </footer>
  );
}