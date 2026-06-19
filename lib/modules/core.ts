import { z } from "zod";
import { revalidatePath } from "next/cache";

export interface ModuleAdapter<TSchema extends z.ZodType, TRecord> {
  schema: TSchema;
  basePath: string;
  create: (data: any) => Promise<TRecord>;
  findBySlug?: (slug: string) => Promise<TRecord | null>;
  findMany: () => Promise<TRecord[]>;
  delete: (id: string) => Promise<TRecord>;
  update?: (id: string, data: any) => Promise<TRecord>;
}

export async function handleModuleCreate(adapter: ModuleAdapter<any, any>, prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = adapter.schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  await adapter.create(parsed.data);
  revalidatePath(`/admin${adapter.basePath}`);
  return { success: true, message: "Created successfully" };
}

export async function handleModuleDelete(adapter: ModuleAdapter<any, any>, id: string) {
  await adapter.delete(id);
  revalidatePath(`/admin${adapter.basePath}`);
  return { success: true };
}