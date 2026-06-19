"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  handleModuleCreate,
  handleModuleDelete,
  type ModuleAdapter,
} from "./core";
import { requireAuth, requireRole } from "@/lib/auth-guard";
// সঠিক পাথ থেকে FormState ইমপোর্ট করা হয়েছে
import type { FormState } from "./schemas/job-post.schema"; 
import { admitCardSchema } from "./schemas/admit-card.schema";

const adapter: ModuleAdapter<typeof admitCardSchema, any> = {
  schema: admitCardSchema,
  basePath: "/admit-card",

  create: (data) =>
    prisma.admitCard.create({
      data,
    }),

  findBySlug: (slug) =>
    prisma.admitCard.findUnique({
      where: { slug },
    }),

  findMany: () =>
    prisma.admitCard.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

  delete: (id) =>
    prisma.admitCard.delete({
      where: { id },
    }),
};

export async function createAdmitCard(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  try {
    await requireAuth();

    const result = await handleModuleCreate(
      adapter,
      prevState,
      formData
    );

    return {
      success: result.success,
      message: result.message,
      fieldErrors: result.fieldErrors as any,
    };
  } catch (error) {
    return {
      success: false,
      fieldErrors: {
        _form: ["Failed to create Admit Card"],
      },
    };
  }
}

export async function deleteAdmitCard(id: string) {
  await requireRole("ADMIN");
  return handleModuleDelete(adapter, id);
}