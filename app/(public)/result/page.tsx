import { getResults } from "@/lib/queries/result";
import { ContentListPage } from "@/components/content/content-list-page";
import { constructMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Exam Results",
  description: "Check your latest exam results here.",
});

export default async function ResultPage() {
  const items = await getResults();
  
  return (
    <ContentListPage 
      items={items} 
      basePath="/result" 
      heading="Latest Exam Results" 
    />
  );
}