"use server";

import { fetchTestGroups } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const GetTestGroup = cache(async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  return fetchTestGroups(user.id);
});

export type TestGroupType = Awaited<ReturnType<typeof GetTestGroup>>[0];