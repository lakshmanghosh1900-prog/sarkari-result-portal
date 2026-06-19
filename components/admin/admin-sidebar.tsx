export function AdminSidebar({ role, userEmail }: { role: string; userEmail: string }) {
  return (
    <aside className="hidden w-64 border-r bg-background lg:block min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <p className="text-sm text-muted-foreground mt-2">{userEmail}</p>
        <p className="text-xs text-primary mt-1">Role: {role}</p>
        {/* এখানে আপনার নেভিগেশন লিঙ্কগুলো যোগ করবেন */}
      </div>
    </aside>
  );
}