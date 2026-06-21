import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.jobPost.count();
  const results = await prisma.result.count();
  const admitCards = await prisma.admitCard.count();
  const answerKeys = await prisma.answerKey.count();
  const syllabus = await prisma.syllabus.count();

  return NextResponse.json({
    jobs,
    results,
    admitCards,
    answerKeys,
    syllabus,
  });
}