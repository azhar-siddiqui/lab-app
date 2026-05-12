"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { unauthorized } from "next/navigation";

export async function GetAllUnit() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const data = await prisma.testUnit.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return data;
}

export type UnitType = Awaited<ReturnType<typeof GetAllUnit>>[0];
