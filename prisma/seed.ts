import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(
    "admin123",
    12
  );

  await prisma.user.upsert({
    where: {
      email: "admin@yoursarkariportal.com",
    },

    update: {},

    create: {
      email: "admin@yoursarkariportal.com",
      name: "Administrator",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("Admin user created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });