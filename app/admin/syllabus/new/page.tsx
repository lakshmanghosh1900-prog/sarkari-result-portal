import { ContentForm } from "@/components/content/content-form";
import { createSyllabus } from "@/lib/modules/syllabus";

export default function NewSyllabusPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New Syllabus</h1>
      <ContentForm action={createSyllabus} fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true }
      ]} />
    </div>
  );
}