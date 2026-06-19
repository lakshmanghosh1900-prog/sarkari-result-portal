import { ContentForm, type FieldConfig } from "@/components/content/content-form";
import { createJobPost } from "@/lib/modules/job-post";

const JOB_POST_FIELDS: FieldConfig[] = [
  { name: "title", label: "Job Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "organization", label: "Organization", type: "text" },
  { name: "postDate", label: "Post Date", type: "date" },
  { name: "lastDate", label: "Last Date", type: "date" },
  { name: "link", label: "Link", type: "url" },
  { name: "description", label: "Description", type: "textarea", required: true },
];

export default function NewJobPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New Job Post</h1>
      <ContentForm action={createJobPost} fields={JOB_POST_FIELDS} />
    </div>
  );
}