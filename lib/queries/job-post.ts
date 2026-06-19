import { prisma } from "@/lib/prisma";
import { cache } from "react";

// 'getActiveJobPosts' এর পরিবর্তে সঠিক নাম ব্যবহার করুন
export const getJobPosts = cache(async () => {
  return await prisma.jobPost.findMany({
    orderBy: {
      createdAt: "desc", // 'postDate' বা 'publishedAt' এর বদলে 'createdAt'
    },
  });
});

export const getJobPostBySlug = cache(async (slug: string) => {
  return await prisma.jobPost.findUnique({
    where: { slug },
  });
});