import { notFound } from "next/navigation";
import { getResultBySlug } from "@/lib/queries/result";
import { generateContentMetadata } from "@/lib/seo/content-metadata";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { ContentDetailPage } from "@/components/content/content-detail-page";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  return generateContentMetadata({ slug, basePath: "/result", findBySlug: getResultBySlug });
}

export default async function ResultDetailPage({ params }: any) {
  const { slug } = await params;
  const result = await getResultBySlug(slug);
  if (!result) notFound();
  return (
    <>
      <ArticleJsonLd title={result.title} description={result.description} slug={result.slug} basePath="/result" publishedAt={result.publishedAt} />
      <ContentDetailPage item={result} />
    </>
  );
}