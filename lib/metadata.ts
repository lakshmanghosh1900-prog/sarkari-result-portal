import { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

interface ConstructMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  image,
  path = "/",
  noIndex = false,
}: ConstructMetadataParams = {}): Metadata {
  // 'as any' ব্যবহার করে টাইপ সেফটি এরর বাইপাস করা হয়েছে
  const config = siteConfig as any;

  const fullTitle = title ? `${title} | ${config.name}` : config.name;
  const canonicalUrl = new URL(path, config.url).toString();
  
  // ডিফল্ট ভ্যালুগুলো নিরাপদভাবে চেক করা হচ্ছে
  const finalDescription = description ?? config.description ?? "Sarkari Result Portal - Latest job updates";
  const finalImage = image ?? config.ogImage ?? "/og-image.png";

  return {
    title: fullTitle,
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: { 
      title: fullTitle, 
      description: finalDescription, 
      url: canonicalUrl, 
      siteName: config.name 
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}