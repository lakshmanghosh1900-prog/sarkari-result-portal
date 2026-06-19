import type { JobPost } from "@prisma/client";
import { siteConfig } from "@/lib/config/site";

export function JobPostingJsonLd({ job }: { job: JobPost }) {
  // Prisma স্কিমা অনুযায়ী এখানে 'department' বা বিদ্যমান কোনো ফিল্ড চেক করুন
  // আমি এখানে 'department' ব্যবহার করছি, আপনার স্কিমায় যা আছে তা দিন।
  if (!job.department) return null; 

  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt.toISOString(), // postDate না থাকলে createdAt ব্যবহার করুন
    ...(job.lastDate && { validThrough: job.lastDate.toISOString() }),
    hiringOrganization: { 
      "@type": "Organization", 
      name: job.department // এখানে job.organization এর বদলে job.department দেওয়া হয়েছে
    },
    jobLocation: { 
      "@type": "Place", 
      address: { 
        "@type": "PostalAddress", 
        addressLocality: job.location ?? "India", 
        addressCountry: "IN" 
      } 
    },
    url: new URL(`/job/${job.slug}`, siteConfig.url).toString(),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}