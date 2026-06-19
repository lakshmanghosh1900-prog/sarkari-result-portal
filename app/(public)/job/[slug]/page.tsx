import { notFound } from "next/navigation";
import { getJobPostBySlug } from "@/lib/queries/job-post";
import { JobPostingJsonLd } from "@/components/seo/job-posting-json-ld";

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobPostBySlug(slug);
  if (!job) notFound();
  
  const isExpired = job.lastDate ? job.lastDate.getTime() < Date.now() : false;
  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <JobPostingJsonLd job={job} />
      <h1 className="text-3xl font-bold">{job.title}</h1>
      {isExpired && <div className="p-3 bg-destructive/10 text-destructive mt-4">Application closed.</div>}
      <div className="prose mt-6">{job.description}</div>
    </article>
  );
}