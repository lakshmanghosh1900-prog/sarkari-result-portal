import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getSyllabusBySlug } from "@/lib/queries/syllabus";
import { generateContentMetadata } from "@/lib/seo/content-metadata";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { ContentDetailPage } from "@/components/content/content-detail-page";

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateContentMetadata({ slug, basePath: "/syllabus", findBySlug: getSyllabusBySlug });
}

export default async function SyllabusDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getSyllabusBySlug(slug);
  
  if (!item) notFound();
  
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  
  // Syllabus মডেলে publishedAt নেই, তাই createdAt ব্যবহার করছি
  const dateToUse = (item as any).publishedAt || item.createdAt;

  return (
    <>
      <ArticleJsonLd 
        title={item.title} 
        description={item.description} 
        slug={item.slug} 
        basePath="/syllabus" 
        publishedAt={dateToUse} 
        nonce={nonce} 
      />
      <ContentDetailPage item={item} />
    </>
  );
}