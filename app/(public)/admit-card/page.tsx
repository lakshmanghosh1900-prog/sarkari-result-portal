import { getAdmitCards } from "@/lib/queries/admit-card";
import { ContentListPage } from "@/components/content/content-list-page";
import { constructMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// এসইও মেটাডেটা সেটআপ
export const metadata: Metadata = constructMetadata({
  title: "Admit Cards",
  description: "Download your latest exam admit cards.",
});

// মেইন পেজ ফাংশন
export default async function AdmitCardPage() {
  const items = await getAdmitCards();
  
  return (
    <ContentListPage 
      items={items} 
      basePath="/admit-card" 
      heading="Latest Admit Cards" 
    />
  );
}