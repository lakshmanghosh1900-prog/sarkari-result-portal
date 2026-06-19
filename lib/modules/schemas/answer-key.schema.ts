import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const answerKeySchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
});

export type AnswerKeyRecord = Awaited<ReturnType<typeof prisma.answerKey.create>>;