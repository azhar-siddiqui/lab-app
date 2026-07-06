import { testGroupCategories } from "@/constants/test-group";
import { labUnits } from "@/constants/unit";
import prisma from "@/lib/prisma";

export async function seedDefaultLabData(userId: string) {
  const existingCategories = await prisma.testCategory.count({
    where: { userId },
  });

  if (existingCategories > 0) {
    return { seeded: false, reason: "already_seeded" as const };
  }

  await prisma.$transaction([
    prisma.testCategory.createMany({
      data: testGroupCategories.map((category) => ({
        userId,
        name: category.name,
        description: category.description,
      })),
      skipDuplicates: true,
    }),
    prisma.testUnit.createMany({
      data: labUnits.map((unit) => ({
        userId,
        name: unit.name,
        unitCategory: unit.category,
      })),
      skipDuplicates: true,
    }),
  ]);

  return { seeded: true as const };
}