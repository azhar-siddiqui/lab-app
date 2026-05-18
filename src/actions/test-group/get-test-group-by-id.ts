"use server";

import prisma from "@/lib/prisma";

import { getServerSession } from "@/lib/get-session";

import { serializeDecimal } from "@/lib/fomat-price";
import { notFound, unauthorized } from "next/navigation";

export async function GetTestGroupById(testGroupId: string) {
  const session = await getServerSession();

  if (!session?.user) {
    return unauthorized();
  }

  const group = await prisma.testGroup.findFirst({
    where: {
      id: testGroupId,

      userId: session.user.id,
    },

    include: {
      tests: true,
    },
  });

  if (!group) return notFound();

  return serializeDecimal(group);
}

export type TestGroupByIdType = Awaited<ReturnType<typeof GetTestGroupById>>;
