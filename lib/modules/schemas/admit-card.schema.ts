import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const admitCardSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
  pdfUrl: z.string().url().optional().or(z.literal("")),
  examDate: z.preprocess((val) => (val === "" || val === undefined ? undefined : new Date(val as string)), z.date().optional()),
});

export type AdmitCardRecord = Awaited<ReturnType<typeof prisma.admitCard.create>>;