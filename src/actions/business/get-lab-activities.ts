"use server";

import { fetchLabActivities } from "@/lib/lab-pages-data";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const getLabActivities = cache(async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  return fetchLabActivities(user.id);
});