import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GetTestGroup() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await prisma.testGroup.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      id: true,
      name: true,
      shortName: true,
      price: true,
      testCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return data.map((item) => ({
    ...item,

    // ✅ Convert Decimal → number
    price: item.price.toNumber(),
  }));
}

export type TestGroupType = Awaited<ReturnType<typeof GetTestGroup>>[0];
