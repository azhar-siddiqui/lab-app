"use server";

import { serializeDecimal } from "@/lib/fomat-price";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function GetPatientReportById(reportId: string) {
  const report = await prisma.patientReport.findUnique({
    where: {
      id: reportId,
    },

    include: {
      patient: true,
      doctor: {
        select: {
          id: true,
          name: true,
        },
      },
      testGroups: {
        include: {
          testGroup: true,
          tests: { include: { test: { include: { testUnit: true } } } },
        },
      },
    },
  });

  if (!report) {
    return notFound();
  }

  return serializeDecimal(report);
}

export type GetPatientReportByIdType = Awaited<
  ReturnType<typeof GetPatientReportById>
>;

export type PatientType = NonNullable<GetPatientReportByIdType>["patient"];

export type DoctorType = NonNullable<GetPatientReportByIdType>["doctor"];

export type TestGroupItemType =
  NonNullable<GetPatientReportByIdType>["testGroups"][0];
