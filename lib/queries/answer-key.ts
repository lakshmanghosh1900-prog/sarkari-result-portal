import { prisma } from "@/lib/prisma";
import { cache } from "react";

// 'publishedAt' এর পরিবর্তে 'createdAt' ব্যবহার করা হয়েছে যা আপনার Prisma Schema-এর সাথে সামঞ্জস্যপূর্ণ
export const getAnswerKeys = cache(async () => {
  return await prisma.answerKey.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getAnswerKeyBySlug = cache(async (slug: string) => {
  return await prisma.answerKey.findUnique({
    where: { slug },
  });
});