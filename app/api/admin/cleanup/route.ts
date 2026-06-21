import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.jobPost.findMany();

  let deleted = 0;

  for (const job of jobs) {
    const title = job.title.toLowerCase();

    if (
      title.includes("result") ||
      title.includes("admit card") ||
      title.includes("answer key")
    ) {
      await prisma.jobPost.delete({
        where: {
          id: job.id,
        },
      });

      deleted++;
    }
  }

  return NextResponse.json({
    success: true,
    deleted,
  });
}