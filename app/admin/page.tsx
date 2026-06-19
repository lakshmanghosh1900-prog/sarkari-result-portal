import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  // prisma.result.count() সরিয়ে ফেলা হয়েছে
  const [jobCount, admitCardCount, answerKeyCount, syllabusCount] = await Promise.all([
    prisma.jobPost.count(), 
    prisma.admitCard.count(), 
    prisma.answerKey.count(), 
    prisma.syllabus.count(),
  ]);

  const stats = [
    { label: "Job Posts", value: jobCount },
    { label: "Admit Cards", value: admitCardCount }, 
    { label: "Answer Keys", value: answerKeyCount },
    { label: "Syllabus", value: syllabusCount },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}