import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getAnswerKeys } from "@/lib/queries/answer-key";
import { ContentListPage } from "@/components/content/content-list-page";

export const metadata: Metadata = constructMetadata({
  title: "Answer Keys",
  description: "Download official and provisional answer keys for recent government exams.",
  path: "/answer-key",
});

export const revalidate = 300;
export default async function AnswerKeyListPage() {
  const items = await getAnswerKeys();
  return <ContentListPage items={items} basePath="/answer-key" heading="Answer Keys" />;
}