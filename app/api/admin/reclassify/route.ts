import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.jobPost.findMany();

    let resultsMoved = 0;
    let admitMoved = 0;
    let answerMoved = 0;

    for (const job of jobs) {
      const lowerTitle = job.title.toLowerCase();

      if (lowerTitle.includes("result")) {
        const exists = await prisma.result.findUnique({
          where: { slug: job.slug },
        });

        if (!exists) {
          await prisma.result.create({
            data: {
              title: job.title,
              slug: job.slug,
              description: job.description,
            },
          });

          resultsMoved++;
        }
      } else if (lowerTitle.includes("admit card")) {
        const exists = await prisma.admitCard.findUnique({
          where: { slug: job.slug },
        });

        if (!exists) {
          await prisma.admitCard.create({
            data: {
              title: job.title,
              slug: job.slug,
              description: job.description,
            },
          });

          admitMoved++;
        }
      } else if (lowerTitle.includes("answer key")) {
        const exists = await prisma.answerKey.findUnique({
          where: { slug: job.slug },
        });

        if (!exists) {
          await prisma.answerKey.create({
            data: {
              title: job.title,
              slug: job.slug,
              description: job.description,
            },
          });

          answerMoved++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      totalJobs: jobs.length,
      resultsMoved,
      admitMoved,
      answerMoved,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Reclassification Failed",
      },
      {
        status: 500,
      }
    );
  }
}