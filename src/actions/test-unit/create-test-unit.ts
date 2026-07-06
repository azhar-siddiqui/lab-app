"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { UnitFormValuesType, unitFromSchema } from "@/validation/test-group";
import { cacheTags } from "@/lib/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";
import { unauthorized } from "next/navigation";

export async function CreatTestUnit(value: UnitFormValuesType) {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const result = unitFromSchema.safeParse(value);

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0].message || "Invalid input data", // Return the first validation error
    };
  }

  await prisma.testUnit.create({
    data: {
      name: result.data.unit,
      userId: user.id,
    },
  });

  revalidateTag(cacheTags.testUnits(user.id), "max");
  revalidatePath("/test/new");

  return {
    status: "success",
    message:
      "Unit added to unit dropdown list, please select from dropdown list.",
  };
}
