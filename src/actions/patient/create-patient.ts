"use server";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import {
  patientFormSchema,
  PatientFormValuesType,
} from "@/validation/patientform";
import { toDateKey } from "@/lib/daily-business";
import { invalidateLabData } from "@/lib/invalidate-lab-cache";
import { unauthorized } from "next/navigation";

export async function CreatePatient(
  value: PatientFormValuesType,
): Promise<ApiResponse<{ patientId: string; reportId: string }>> {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const validatedFields = patientFormSchema.safeParse(value);

  // 2. Handle validation failure
  if (!validatedFields.success) {
    return {
      status: "error",
      message: validatedFields.error.issues[0].message || "Invalid input data",
    };
  }
  try {
    const data = validatedFields.data;

    const result = await prisma.$transaction(async (tx) => {
      /* ----------------------------------------- 1. CREATE PATIENT ----------------------------------------- */

      const patient = await tx.patient.create({
        data: {
          date: data.date.toISOString(),
          designation: data.designation,
          name: data.patientName,
          contactNumber: data.phone,
          gender: data.gender,
          age: data.age,
          ageType: data.ageType,
          email: data.email,
          address: data.address,
          totalRs: data.totalRs,
          discount: data.discount,
          ammountRecived: data.amountReceived,
          balance: data.balance,
          remarks: data.remarks,
          userId: session.user.id,
        },
      });

      /* ----------------------------------------- 2. CREATE REPORT ----------------------------------------- */

      const report = await tx.patientReport.create({
        data: {
          reportDate: data.date.toISOString(),
          patientId: patient.id,
          totalAmount: data.totalRs,
          remarks: data.remarks,
          userId: session.user.id,
          doctorId: data.reference,
        },
      });

      /* ----------------------------------------- 3. FETCH SELECTED TEST GROUPS ----------------------------------------- */

      const testGroups = await tx.testGroup.findMany({
        where: { id: { in: data.testGroupId.map((item) => item.id) } },
        include: { tests: true },
      });

      /* ----------------------------------------- 4. CREATE REPORT TEST GROUPS + TESTS ----------------------------------------- */ for (const group of testGroups) {
        const reportGroup = await tx.patientReportTestGroup.create({
          data: { reportId: report.id, testGroupId: group.id },
        });
        if (group.tests.length > 0) {
          await tx.patientReportTest.createMany({
            data: group.tests.map((test) => ({
              patientReportTestGroupId: reportGroup.id,
              testId: test.id,
              resultValue: "",
            })),
          });
        }
      }
      return { patientId: patient.id, reportId: report.id };
    });

    invalidateLabData(user.id, {
      patientId: result.patientId,
      reportId: result.reportId,
      dateKeys: [toDateKey(data.date)],
      paths: ["/patients", "/dashboard/business/daily", "/dashboard/overview"],
    });

    return {
      status: "success",
      message: "Patient added successfully",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Something went wrong" };
  }
}
