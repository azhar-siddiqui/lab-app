"use server";

import { fetchTestCategories } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const GetTestCategory = cache(async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  return fetchTestCategories(user.id);
});

export type TestCategoryType = Awaited<ReturnType<typeof GetTestCategory>>[0];