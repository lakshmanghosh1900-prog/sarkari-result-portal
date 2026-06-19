import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
// ফাংশনের নাম পরিবর্তন করে getSyllabuses করা হয়েছে
import { getSyllabuses } from "@/lib/queries/syllabus"; 
import { ContentListPage } from "@/components/content/content-list-page";

export const metadata: Metadata = constructMetadata({
  title: "Exam Syllabus",
  description: "Get detailed exam syllabus and exam patterns for government recruitments.",
  path: "/syllabus",
});

export const revalidate = 300;

export default async function SyllabusListPage() {
  // এখানেও getSyllabusItems এর পরিবর্তে getSyllabuses ব্যবহার করুন
  const items = await getSyllabuses(); 
  
  return <ContentListPage items={items} basePath="/syllabus" heading="Exam Syllabus" />;
}