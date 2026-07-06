"use server";

import { fetchTestCategoriesWithCounts } from "@/lib/lab-pages-data";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const getTestCategoriesPage = cache(async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  return fetchTestCategoriesWithCounts(user.id);
});