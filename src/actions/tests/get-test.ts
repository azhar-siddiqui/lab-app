"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

export async function GetTest() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return unauthorized();

  const data = await prisma.test.findMany({
    where: {
      id: session.user.id,
    },
  });

  return data;
}

export type TestType = Awaited<ReturnType<typeof GetTest>>[0];
