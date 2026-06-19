import { ContentForm } from "@/components/content/content-form";
import { createAnswerKey } from "@/lib/modules/answer-key";

export default function NewAnswerKeyPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New Answer Key</h1>
      <ContentForm action={createAnswerKey} fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea", required: true }
      ]} />
    </div>
  );
}