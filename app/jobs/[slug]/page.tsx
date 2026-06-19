import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const job = await prisma.jobPost.findUnique({
    where: {
      slug,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {job.title}
      </h1>

      <div className="border rounded p-4">
        <p>{job.description}</p>
      </div>
    </div>
  );
}