import { siteConfig } from "@/lib/config/site";

interface JsonLdProps {
  nonce?: string;
}

export function OrganizationJsonLd({ nonce }: JsonLdProps) {
  // siteConfig কে 'any' হিসেবে কাস্ট করা হলো যাতে প্রপার্টি চেক না করে
  const config = siteConfig as any;

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    logo: new URL("/logo.png", config.url).toString(),
    ...(config.links?.twitter && { sameAs: [config.links.twitter] }),
  };
  
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebsiteJsonLd({ nonce }: JsonLdProps) {
  const config = siteConfig as any;

  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    url: config.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${config.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}