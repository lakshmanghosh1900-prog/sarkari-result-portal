import { getJobPosts } from "@/lib/queries/job-post";
import { JobCard } from "@/components/jobs/job-card";

export const revalidate = 300;

export default async function JobListingPage() {
  const jobs = await getJobPosts();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Latest Government Jobs
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          // job ডাটাবেস মডেল অনুযায়ী সঠিক প্রপস পাচ্ছে
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}