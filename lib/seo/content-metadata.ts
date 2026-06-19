import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateContentMetadata({ slug, basePath, findBySlug, notFoundTitle = "Not Found" }: any): Promise<Metadata> {
  const item = await findBySlug(slug);
  if (!item) return constructMetadata({ title: notFoundTitle, noIndex: true });
  return constructMetadata({
    title: item.title,
    description: item.description.slice(0, 160),
    path: `${basePath}/${item.slug}`,
  });
}