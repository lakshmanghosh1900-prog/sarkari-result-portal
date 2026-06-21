import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const result = await prisma.result.findUnique({
    where: { slug },
  });

  if (!result) {
    return {
      title: "Result Not Found",
    };
  }

  return {
    title: result.title,
    description: result.description,
  };
}

export default async function ResultDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await prisma.result.findUnique({
    where: {
      slug,
    },
  });

  if (!result) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">
        {result.title}
      </h1>

      <div className="border rounded p-4">
        <p>{result.description}</p>
      </div>
    </div>
  );
}