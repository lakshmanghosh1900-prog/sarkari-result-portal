import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getAnswerKeyBySlug } from "@/lib/queries/answer-key";
import { generateContentMetadata } from "@/lib/seo/content-metadata";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { ContentDetailPage } from "@/components/content/content-detail-page";

interface PageProps { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return generateContentMetadata({ slug, basePath: "/answer-key", findBySlug: getAnswerKeyBySlug });
}

export default async function AnswerKeyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getAnswerKeyBySlug(slug);
  
  if (!item) notFound();
  
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  
  // এখানে item.publishedAt বা item.createdAt এর প্রাপ্যতা নিশ্চিত করছি
  const publishedDate = (item as any).publishedAt || (item as any).createdAt || new Date();

  return (
    <>
      <ArticleJsonLd 
        title={item.title} 
        description={item.description} 
        slug={item.slug} 
        basePath="/answer-key" 
        publishedAt={publishedDate} 
        nonce={nonce} 
      />
      <ContentDetailPage item={item} />
    </>
  );
}