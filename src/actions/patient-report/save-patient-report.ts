"use server";

import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import {
  ReportFormValues,
  reportSchema,
} from "@/validation/patient-report-form";
import { getServerSession } from "@/lib/get-session";
import { invalidateLabData } from "@/lib/invalidate-lab-cache";

export async function SavePatientReport(
  values: ReportFormValues,
): Promise<ApiResponse> {
  const validated = reportSchema.safeParse(values);

  if (!validated.success) {
    return { status: "error", message: "Invalid form data" };
  }

  const { tests } = validated.data;

  try {
    await prisma.$transaction(
      tests.map((test) =>
        prisma.patientReportTest.update({
          where: { id: test.id },
          data: { resultValue: test.resultValue },
        }),
      ),
    );

    const session = await getServerSession();
    if (session?.user) {
      invalidateLabData(session.user.id, {
        paths: ["/patients", "/dashboard/overview"],
      });
    }
    return { status: "success", message: "Report saved successfully" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to save report" };
  }
}
