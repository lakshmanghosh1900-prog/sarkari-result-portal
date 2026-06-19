import { auth } from "@/auth";

export async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function requireRole(role: string) {
  const session = await requireAuth();
  if (session.user?.role !== role) throw new Error("Forbidden");
  return session;
}