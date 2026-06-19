import { prisma } from "../lib/prisma";

export default async function Home() {
  const jobs = await prisma.jobPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const results = await prisma.result.findMany({
    orderBy: {
      publishedAt: "desc",
    },
    take: 10,
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">
            Sarkari Result Portal India
          </h1>

          <nav className="mt-4 flex gap-6">
  <a href="/">Home</a>
  <a href="/jobs">Latest Jobs</a>
  <a href="/results">Results</a>
  <a href="/admit-card">Admit Card</a>
  <a href="/answer-key">Answer Key</a>
  <a href="/syllabus">Syllabus</a>
  <a href="/contact">Contact</a>
</nav>

          <p className="mt-2">
            Latest Government Jobs, Admit Cards, Results &
            Notifications
          </p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            India Government Jobs & Results
          </h2>

          <p>
            Latest Sarkari Jobs, Results, Admit Cards,
            Admissions and Government Notifications.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Latest Jobs
          </h2>

          <ul className="space-y-3">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="border-b pb-2 hover:text-blue-700"
              >
                {job.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Latest Results
          </h2>

          <ul className="space-y-3">
            {results.map((result) => (
              <li
                key={result.id}
                className="border-b pb-2 hover:text-blue-700"
              >
                {result.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        © 2026 Sarkari Result Portal India
      </footer>
    </main>
  );
}