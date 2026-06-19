"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { handleModuleCreate, handleModuleDelete } from "./core";
import { requireAuth, requireRole } from "@/lib/auth-guard";

const syllabusSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
});

const adapter = {
  schema: syllabusSchema,

  basePath: "/syllabus",

  create: (data: any) =>
    prisma.syllabus.create({
      data,
    }),

  findMany: () =>
    prisma.syllabus.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

  delete: (id: string) =>
    prisma.syllabus.delete({
      where: {
        id,
      },
    }),
};

export async function createSyllabus(
  prevState: any,
  formData: FormData
) {
  await requireAuth();

  return handleModuleCreate(
    adapter,
    prevState,
    formData
  );
}

export async function deleteSyllabus(id: string) {
  await requireRole("ADMIN");

  return handleModuleDelete(
    adapter,
    id
  );
}