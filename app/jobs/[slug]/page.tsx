import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const job = await prisma.jobPost.findUnique({
    where: { slug },
  });

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: job.title,
    description: job.description,
  };
}

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