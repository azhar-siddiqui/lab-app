"use server";

import { fetchDoctors } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const GetDoctor = cache(async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  return fetchDoctors(user.id);
});

export type DoctorType = Awaited<ReturnType<typeof GetDoctor>>[0];