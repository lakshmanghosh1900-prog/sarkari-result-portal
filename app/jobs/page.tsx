import { prisma } from "../../lib/prisma";

export default async function JobsPage() {
  const jobs = await prisma.jobPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Latest Government Jobs
      </h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="border p-4 rounded mb-4"
          >
            <a
              href={`/jobs/${job.slug}`}
              className="text-blue-700 font-bold hover:underline"
            >
              {job.title}
            </a>

            <div className="text-sm text-gray-500 mt-1">
              Slug: {job.slug}
            </div>
          </div>
        ))
      )}
    </div>
  );
}