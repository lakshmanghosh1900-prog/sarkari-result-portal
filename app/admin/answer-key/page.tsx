import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { DeleteButton } from "@/components/content/delete-button";
import { deleteAnswerKey } from "@/lib/modules/answer-key";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminAnswerKeyPage() {
  const [session, items] = await Promise.all([
    auth(), 
    prisma.answerKey.findMany({ orderBy: { createdAt: 'desc' } })
  ]);
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Answer Keys</h1>
        <Button asChild><Link href="/admin/answer-key/new">Create</Link></Button>
      </div>
      <table className="w-full border">
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.title}</td>
              <td className="p-3 text-right">
                {session?.user.role === 'ADMIN' && <DeleteButton id={item.id} action={deleteAnswerKey} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}