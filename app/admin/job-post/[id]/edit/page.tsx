import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ContentForm, type FieldConfig } from "@/components/content/content-form";
import { updateJobPost } from "@/lib/modules/job-post";

const JOB_POST_FIELDS: FieldConfig[] = [
  { name: "title", label: "Job Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
];

export default async function EditJobPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.jobPost.findUnique({ where: { id } });
  if (!job) notFound();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Job Post</h1>
      <ContentForm 
        action={updateJobPost.bind(null, id)} 
        fields={JOB_POST_FIELDS} 
        defaultValues={job} 
      />
    </div>
  );
}