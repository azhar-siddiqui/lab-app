"use server";

import { fetchDailyExpenses } from "@/lib/cached-queries";
import { toDateKey } from "@/lib/daily-business";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function resolveDateKey(date?: string) {
  if (!date || !DATE_KEY_PATTERN.test(date)) {
    return toDateKey(new Date());
  }

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return toDateKey(new Date());
  }

  return date;
}

export const getDailyExpenses = cache(async (date?: string) => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const dateKey = resolveDateKey(date);
  return fetchDailyExpenses(user.id, dateKey);
});