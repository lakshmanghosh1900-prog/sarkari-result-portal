import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getResults = cache(() => 
  prisma.result.findMany({ 
    orderBy: { publishedAt: "desc" } 
  })
);

export const getResultBySlug = cache((slug: string) => 
  prisma.result.findUnique({ 
    where: { slug } 
  })
);