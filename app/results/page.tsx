import { prisma } from "../../lib/prisma";

export default async function ResultsPage({
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

  const results = await prisma.result.findMany({
    where: search
      ? {
          title: {
            contains: search,
          },
        }
      : undefined,

    orderBy: {
      publishedAt: "desc",
    },

    skip: (page - 1) * PAGE_SIZE,

    take: PAGE_SIZE,
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Latest Results
      </h1>

      <form className="mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search Results..."
          className="border p-2 rounded w-full"
        />
      </form>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        results.map((result) => (
          <div
            key={result.id}
            className="border p-4 rounded mb-4"
          >
            <a
              href={`/results/${result.slug}`}
              className="text-blue-700 font-bold hover:underline"
            >
              {result.title}
            </a>

            <div className="text-sm text-gray-500 mt-1">
              Slug: {result.slug}
            </div>
          </div>
        ))
      )}

      <div className="flex gap-4 mt-6">
        {page > 1 && (
          <a
            href={`/results?page=${page - 1}&search=${search}`}
            className="border px-4 py-2 rounded"
          >
            Previous
          </a>
        )}

        <a
          href={`/results?page=${page + 1}&search=${search}`}
          className="border px-4 py-2 rounded"
        >
          Next
        </a>
      </div>
    </div>
  );
}