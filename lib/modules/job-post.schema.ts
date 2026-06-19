import { z } from "zod";
import { prisma } from "@/lib/prisma";

export interface FormState {
  success: boolean;
  message?: string;
  fieldErrors?: { [key: string]: string[] | undefined };
}

export const jobPostSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
  department: z.string().optional(),
  lastDate: z.preprocess((val) => (val === "" || val === undefined ? undefined : new Date(val as string)), z.date().optional()),
});

export type JobPostRecord = Awaited<ReturnType<typeof prisma.jobPost.create>>;