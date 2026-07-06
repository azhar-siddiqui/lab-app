"use server";

import { fetchTestUnits } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const GetAllUnit = cache(async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  return fetchTestUnits(user.id);
});

export type UnitType = Awaited<ReturnType<typeof GetAllUnit>>[0];