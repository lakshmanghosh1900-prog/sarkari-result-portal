import { prisma } from "@/lib/prisma";

// নিশ্চিত করুন এখানে প্রতিটি ফাংশনের আগে 'export' আছে
export async function getAdmitCards() {
  return await prisma.admitCard.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdmitCardBySlug(slug: string) {
  return await prisma.admitCard.findUnique({
    where: { slug },
  });
}