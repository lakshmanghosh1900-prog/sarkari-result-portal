import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const syllabusSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
});

export type SyllabusRecord = Awaited<ReturnType<typeof prisma.syllabus.create>>;