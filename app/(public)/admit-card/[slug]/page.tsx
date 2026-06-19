import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getAdmitCardBySlug } from "@/lib/queries/admit-card";
import { generateContentMetadata } from "@/lib/seo/content-metadata";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { ContentDetailPage } from "@/components/content/content-detail-page";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  return generateContentMetadata({ slug, basePath: "/admit-card", findBySlug: getAdmitCardBySlug });
}

export default async function AdmitCardDetailPage({ params }: any) {
  const { slug } = await params;
  const item = await getAdmitCardBySlug(slug);
  if (!item) notFound();
  
  return (
    <>
      <ArticleJsonLd title={item.title} description={item.description} slug={item.slug} basePath="/admit-card" publishedAt={item.createdAt} />
      <ContentDetailPage item={item} extraFields={item.examDate ? [{ label: "Exam Date", value: new Date(item.examDate).toLocaleDateString() }] : undefined} />
    </>
  );
}