import { ContentForm, FieldConfig } from "@/components/content/content-form";
import { createAdmitCard } from "@/lib/modules/admit-card";

// 'as const' ব্যবহার করার ফলে এটি এখন FieldConfig টাইপের সাথে পুরোপুরি মিলে যাবে
const FIELDS: FieldConfig[] = [
  { name: "title", label: "Title", type: "text" as const, required: true },
  { name: "slug", label: "Slug", type: "text" as const, required: true },
  { name: "description", label: "Description", type: "textarea" as const, required: true }
];

export default function NewAdmitCardPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">New Admit Card</h1>
      <ContentForm action={createAdmitCard} fields={FIELDS} />
    </div>
  );
}