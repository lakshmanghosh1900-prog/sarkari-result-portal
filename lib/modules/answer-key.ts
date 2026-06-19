"use server";

import { prisma } from "@/lib/prisma";
import { handleModuleCreate, handleModuleDelete } from "./core";
import { requireAuth, requireRole } from "@/lib/auth-guard";
import { answerKeySchema } from "./schemas/answer-key.schema";
import type { FormState } from "./schemas/job-post.schema";

const adapter = {
  schema: answerKeySchema,
  basePath: "/answer-key",
  create: (data: any) => prisma.answerKey.create({ data }),
  delete: (id: string) => prisma.answerKey.delete({ where: { id } }),
  update: (id: string, data: any) => prisma.answerKey.update({ where: { id }, data }),
  findMany: () => prisma.answerKey.findMany({ orderBy: { createdAt: "desc" } }),
  findBySlug: (slug: string) => prisma.answerKey.findUnique({ where: { slug } }),
};

export async function createAnswerKey(_prevState: any, formData: FormData): Promise<FormState> {
  try {
    await requireAuth();
    const result = await handleModuleCreate(adapter, _prevState, formData);
    return { success: result.success, message: result.message, fieldErrors: result.fieldErrors as any };
  } catch (e) {
    return { success: false, fieldErrors: { _form: ["Failed to create Answer Key"] } };
  }
}

export async function deleteAnswerKey(id: string) {
  await requireRole("ADMIN");
  return handleModuleDelete(adapter, id);
}