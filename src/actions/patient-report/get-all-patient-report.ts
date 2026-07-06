"use server";

import { fetchPatientReports } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { notFound, unauthorized } from "next/navigation";
import { cache } from "react";

export const GetPatientReports = cache(async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const reports = await fetchPatientReports(user.id);

  if (!reports) {
    return notFound();
  }

  return reports;
});

export type GetPatientReportsType = Awaited<
  ReturnType<typeof GetPatientReports>
>[0];