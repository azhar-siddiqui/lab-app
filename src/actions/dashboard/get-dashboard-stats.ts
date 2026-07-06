"use server";

import {
  DashboardStats,
  fetchDashboardStats,
} from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const getDashboardStats = cache(async (): Promise<DashboardStats> => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  return fetchDashboardStats(user.id);
});