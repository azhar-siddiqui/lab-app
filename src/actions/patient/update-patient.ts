"use server";

import prisma from "@/lib/prisma";

import { getServerSession } from "@/lib/get-session";

import {
  patientFormSchema,
  PatientFormValuesType,
} from "@/validation/patientform";

import { unauthorized } from "next/navigation";

export async function UpdatePatient(
  patientId: string,
  values: PatientFormValuesType,
) {
  const session = await getServerSession();

  if (!session?.user) {
    return unauthorized();
  }

  const validated = patientFormSchema.safeParse(values);

  if (!validated.success) {
    return {
      status: "error",
      message: validated.error.issues[0]?.message,
    };
  }

  const data = validated.data;

  let reportId = "";

  try {
    await prisma.$transaction(async (tx) => {
      const report = await tx.patientReport.findFirst({
        where: { patientId, userId: session.user.id },
        include: { testGroups: { include: { tests: true } } },
      });

      if (!report) {
        throw new Error("Report not found");
      }

      const existingGroupIds = report.testGroups.map(
        (group) => group.testGroupId,
      );

      const newGroupIds = data.testGroupId.map((group) => group.id);

      const groupsToAdd = newGroupIds.filter(
        (id) => !existingGroupIds.includes(id),
      );

      const groupsToRemove = existingGroupIds.filter(
        (id) => !newGroupIds.includes(id),
      );

      await tx.patientReportTestGroup.deleteMany({
        where: { reportId: report.id, testGroupId: { in: groupsToRemove } },
      });

      const groups = await tx.testGroup.findMany({
        where: { id: { in: groupsToAdd } },
        include: { tests: true },
      });

      for (const group of groups) {
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

      const finalGroups = await tx.testGroup.findMany({
        where: { id: { in: newGroupIds } },
      });

      const totalAmount = finalGroups.reduce(
        (sum, group) => sum + Number(group.price),
        0,
      );

      const balance = totalAmount - data.amountReceived;

      await tx.patient.update({
        where: { id: patientId },
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
          totalRs: totalAmount,
          discount: data.discount,
          ammountRecived: data.amountReceived,
          balance,
          remarks: data.remarks,
        },
      });

      await tx.patientReport.update({
        where: { id: report.id },
        data: { totalAmount, remarks: data.remarks, doctorId: data.reference },
      });

      reportId = report.id;
    });

    return {
      status: "success",
      message: "Patient updated successfully",
      data: {
        reportId,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to update patient",
    };
  }
}
