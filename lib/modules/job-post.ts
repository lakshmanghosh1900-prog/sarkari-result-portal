"use server";

import { prisma } from "@/lib/prisma";
import { handleModuleCreate, handleModuleDelete } from "./core";
import { requireAuth, requireRole } from "@/lib/auth-guard";
import { revalidatePath } from "next/cache";
import { jobPostSchema, type FormState } from "./schemas/job-post.schema";

const adapter = {
  schema: jobPostSchema,
  basePath: "/job-post",
  create: (data: any) => prisma.jobPost.create({ data }),
  delete: (id: string) => prisma.jobPost.delete({ where: { id } }),
  update: (id: string, data: any) => prisma.jobPost.update({ where: { id }, data }),
  findMany: () => prisma.jobPost.findMany({ orderBy: { createdAt: "desc" } }),
  findBySlug: (slug: string) => prisma.jobPost.findUnique({ where: { slug } }),
};

export async function createJobPost(_prevState: any, formData: FormData): Promise<FormState> {
  try {
    await requireAuth();
    const result = await handleModuleCreate(adapter, _prevState, formData);
    return { success: result.success, message: result.message, fieldErrors: result.fieldErrors as any };
  } catch (e) {
    return { success: false, fieldErrors: { _form: ["Unauthorized"] } };
  }
}

export async function deleteJobPost(id: string) {
  await requireRole("ADMIN");
  return handleModuleDelete(adapter, id);
}

export async function updateJobPost(id: string, _prevState: any, formData: FormData): Promise<FormState> {
  await requireRole("ADMIN");
  const data = Object.fromEntries(formData.entries());
  const parsed = jobPostSchema.safeParse(data);
  if (!parsed.success) return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  try {
    await adapter.update(id, parsed.data);
    revalidatePath("/admin/job-post");
    return { success: true, message: "Job post updated successfully" };
  } catch (e) {
    return { success: false, fieldErrors: { _form: ["Failed to update job post"] } };
  }
}