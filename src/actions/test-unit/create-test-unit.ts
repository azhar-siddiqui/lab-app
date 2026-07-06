"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { UnitFormValuesType, unitFromSchema } from "@/validation/test-group";
import { invalidateLabData } from "@/lib/invalidate-lab-cache";
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

  invalidateLabData(user.id, {
    includeCatalog: true,
    paths: ["/test/new"],
  });

  return {
    status: "success",
    message:
      "Unit added to unit dropdown list, please select from dropdown list.",
  };
}
