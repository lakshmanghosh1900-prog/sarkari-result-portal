import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getSyllabuses = cache(() =>
  prisma.syllabus.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
);

export const getSyllabusBySlug = cache(
  (slug: string) =>
    prisma.syllabus.findUnique({
      where: { slug },
    })
);