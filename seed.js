const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Jobs
  await prisma.jobPost.createMany({
    data: [
      {
        id: "job-001",
        title: "SSC CGL 2026 Recruitment",
        slug: "ssc-cgl-2026",
        description: "Staff Selection Commission CGL Recruitment 2026",
        department: "SSC",
        location: "India",
      },
      {
        id: "job-002",
        title: "RRB NTPC Recruitment 2026",
        slug: "rrb-ntpc-2026",
        description: "Railway Recruitment Board NTPC Recruitment",
        department: "Railway",
        location: "India",
      },
    ],
  });

  // Results
  await prisma.result.createMany({
    data: [
      {
        id: "result-001",
        title: "SSC GD Result 2026",
        slug: "ssc-gd-result-2026",
        description: "SSC GD Constable Result",
        pdfUrl: "https://example.com/result.pdf",
      },
    ],
  });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });