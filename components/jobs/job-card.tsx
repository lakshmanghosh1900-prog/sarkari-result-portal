import Link from "next/link";
import type { JobPost } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// এখানে 'job' এর টাইপটি নিশ্চিত করা হয়েছে
export function JobCard({ job }: { job: JobPost }) {
  return (
    <Link href={`/job/${job.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{job.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 'organization' না থাকলে 'department' অথবা 'location' ব্যবহার করুন। 
              আমি এখানে 'department' ব্যবহার করেছি, আপনার স্কিমা অনুযায়ী চেক করে নিন। */}
          <p className="text-sm text-muted-foreground">
            {job.department || "No department listed"}
          </p>
          
          {job.lastDate && (
            <Badge className="mt-2">
              Ends: {job.lastDate.toLocaleDateString()}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}