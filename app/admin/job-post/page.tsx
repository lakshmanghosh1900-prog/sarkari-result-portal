import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/content/delete-button";
import { deleteJobPost } from "@/lib/modules/job-post";

export default async function AdminJobPostListPage() {
  const [session, jobPosts] = await Promise.all([
    auth(), 
    prisma.jobPost.findMany({ 
      orderBy: { createdAt: "desc" } 
    })
  ]);

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Posts</h1>
        <Button asChild>
          <Link href="/admin/job-post/new">
            <Plus className="mr-2 h-4 w-4" /> Create
          </Link>
        </Button>
      </div>

      <table className="w-full border bg-background">
        <thead className="bg-muted text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Org</th>
            <th className="p-3">Last Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobPosts.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.department ?? "-"}</td>
              <td className="p-3">
                {post.lastDate ? post.lastDate.toLocaleDateString() : "-"}
              </td>
              <td className="p-3">
                {isAdmin && (
                  <DeleteButton 
                    id={post.id} 
                    action={deleteJobPost} 
                    itemLabel={post.title} 
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}