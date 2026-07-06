import "dotenv/config";

import { seedDefaultLabData } from "@/lib/seed-default-lab-data";
import prisma from "@/lib/prisma";

async function main() {
  const userId = process.env.SEED_USER_ID ?? process.argv[2];

  if (!userId) {
    throw new Error(
      "Provide a user id via SEED_USER_ID env var or as a CLI argument.",
    );
  }

  console.log(`🌱 Seeding default lab data for user ${userId}...`);

  const result = await seedDefaultLabData(userId);

  if (result.seeded) {
    console.log("✅ Seeding completed");
  } else {
    console.log("ℹ️ User already has seed data — skipped");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });