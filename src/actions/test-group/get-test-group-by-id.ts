"use server";

import { fetchTestGroupById } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { notFound, unauthorized } from "next/navigation";
import { cache } from "react";

export const GetTestGroupById = cache(async (testGroupId: string) => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const group = await fetchTestGroupById(testGroupId, user.id);

  if (!group) {
    return notFound();
  }

  return group;
});

export type TestGroupByIdType = Awaited<ReturnType<typeof GetTestGroupById>>;