import { prisma } from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, results, admits, answers, syllabi] = await Promise.all([
    prisma.jobPost.findMany({ select: { slug: true, createdAt: true } }),
    prisma.result.findMany({ select: { slug: true, publishedAt: true } }),
    prisma.admitCard.findMany({ select: { slug: true, createdAt: true } }),
    prisma.answerKey.findMany({ select: { slug: true, createdAt: true } }),
    prisma.syllabus.findMany({ select: { slug: true, createdAt: true } }),
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

  return [
    { url: baseUrl, lastModified: new Date() },
    ...jobs.map((job) => ({ url: `${baseUrl}/job-post/${job.slug}`, lastModified: job.createdAt })),
    ...results.map((r) => ({ url: `${baseUrl}/result/${r.slug}`, lastModified: r.publishedAt })),
    ...admits.map((a) => ({ url: `${baseUrl}/admit-card/${a.slug}`, lastModified: a.createdAt })),
    ...answers.map((ans) => ({ url: `${baseUrl}/answer-key/${ans.slug}`, lastModified: ans.createdAt })),
    ...syllabi.map((s) => ({ url: `${baseUrl}/syllabus/${s.slug}`, lastModified: s.createdAt })),
  ];
}