import { prisma } from "../../lib/prisma";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const search = params.search ?? "";
  const page = Number(params.page ?? 1);

  const PAGE_SIZE = 20;

  const jobs = await prisma.jobPost.findMany({
    where: search
      ? {
          title: {
            contains: search,
          },
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Latest Government Jobs
      </h1>

      <form className="mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search Jobs..."
          className="border p-2 rounded w-full"
        />
      </form>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
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

      <div className="flex gap-4 mt-6">
        {page > 1 && (
          <a
            href={`/jobs?page=${page - 1}&search=${search}`}
            className="border px-4 py-2 rounded"
          >
            Previous
          </a>
        )}

        <a
          href={`/jobs?page=${page + 1}&search=${search}`}
          className="border px-4 py-2 rounded"
        >
          Next
        </a>
      </div>
    </div>
  );
}