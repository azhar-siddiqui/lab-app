"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { unauthorized } from "next/navigation";

export async function GetTestCategory() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const data = await prisma.testCategory.findMany({
    where: {
      userId: user.id,
    },
    select: { id: true, name: true, description: true },
  });

  return data;
}

export type TestCategoryType = Awaited<ReturnType<typeof GetTestCategory>>[0];
