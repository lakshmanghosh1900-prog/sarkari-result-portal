import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteButton } from "@/components/content/delete-button";
import { deleteSyllabus } from "@/lib/modules/syllabus";
import { auth } from "@/auth";

export default async function AdminSyllabusPage() {
  const session = await auth();
  const items = await prisma.syllabus.findMany({
    orderBy: { createdAt: 'desc' } // publishedAt থেকে createdAt
  });

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Syllabus Management</h1>
        <Button asChild>
          <Link href="/admin/syllabus/new">Create New</Link>
        </Button>
      </div>
      <div className="border rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Title</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.title}</td>
                <td className="p-3 text-right">
                  {session?.user.role === 'ADMIN' && (
                    <DeleteButton id={item.id} action={deleteSyllabus} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}