"use server";

import { fetchPatientReportById } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { notFound, unauthorized } from "next/navigation";
import { cache } from "react";

export const GetPatientReportById = cache(async (reportId: string) => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const report = await fetchPatientReportById(reportId, user.id);

  if (!report) {
    return notFound();
  }

  return report;
});

export type GetPatientReportByIdType = Awaited<
  ReturnType<typeof GetPatientReportById>
>;

export type PatientType = NonNullable<GetPatientReportByIdType>["patient"];

export type DoctorType = NonNullable<GetPatientReportByIdType>["doctor"];

export type TestGroupItemType =
  NonNullable<GetPatientReportByIdType>["testGroups"][0];