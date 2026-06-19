import { siteConfig } from "@/lib/config/site";

export function ArticleJsonLd({ title, description, slug, basePath, publishedAt }: any) {
  const url = new URL(`${basePath}/${slug}`, siteConfig.url).toString();
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description.slice(0, 200),
    datePublished: publishedAt.toISOString(),
    mainEntityOfPage: url,
    publisher: { "@type": "Organization", name: siteConfig.name }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}