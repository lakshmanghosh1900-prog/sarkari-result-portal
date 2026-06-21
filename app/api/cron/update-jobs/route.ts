import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { prisma } from "@/lib/prisma";

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL(
      "https://www.freejobalert.com/feed/"
    );

    let inserted = 0;

    for (const item of feed.items) {
      const title = item.title ?? "";

      const description =
        item.contentSnippet ||
        item.content ||
        title;

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const lowerTitle = title.toLowerCase();

      const existsInJob = await prisma.jobPost.findUnique({
        where: { slug },
      });

      const existsInResult = await prisma.result.findUnique({
        where: { slug },
      });

      const existsInAdmit = await prisma.admitCard.findUnique({
        where: { slug },
      });

      const existsInAnswer = await prisma.answerKey.findUnique({
        where: { slug },
      });

      if (
        existsInJob ||
        existsInResult ||
        existsInAdmit ||
        existsInAnswer
      ) {
        continue;
      }

      if (lowerTitle.includes("result")) {
        await prisma.result.upsert({
          where: { slug },
          update: {},
          create: {
            title,
            slug,
            description,
          },
        });
      } else if (lowerTitle.includes("admit card")) {
        await prisma.admitCard.upsert({
          where: { slug },
          update: {},
          create: {
            title,
            slug,
            description,
          },
        });
      } else if (lowerTitle.includes("answer key")) {
        await prisma.answerKey.upsert({
          where: { slug },
          update: {},
          create: {
            title,
            slug,
            description,
          },
        });
      } else {
        await prisma.jobPost.upsert({
          where: { slug },
          update: {},
          create: {
            title,
            slug,
            description,
          },
        });
      }

      inserted++;
    }

    return NextResponse.json({
      success: true,
      inserted,
      totalFeedItems: feed.items.length,
    });
  } catch (error) {
    console.error("RSS UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}