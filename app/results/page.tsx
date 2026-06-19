import { prisma } from "../../lib/prisma";

export default async function ResultsPage() {
  const results = await prisma.result.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Latest Results
      </h1>

      {results.length === 0 ? (
        <p>No results available.</p>
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
    </div>
  );
}