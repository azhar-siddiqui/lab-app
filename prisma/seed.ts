import { testGroupCategories } from "@/constants/test-group";
import { labUnits } from "@/constants/unit";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const userId = "IX4XOsHMFickAe6eTkS5xqg5Ueiz64Md";

  console.log("🌱 Seeding units...");

  await prisma.testCategory.createMany({
    data: testGroupCategories.map((category) => ({
      userId: userId,
      name: category.name,
      description: category.description,
    })),
    skipDuplicates: true,
  });

  await prisma.testUnit.createMany({
    data: labUnits.map((unit) => ({
      userId: userId,
      name: unit.name,
      unitCategory: unit.category,
    })),
    // skipDuplicates: true,
  });

  console.log("✅ Seeding completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
