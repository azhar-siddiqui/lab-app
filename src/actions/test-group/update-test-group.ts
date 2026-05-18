"use server";

import prisma from "@/lib/prisma";

import { getServerSession } from "@/lib/get-session";

import { unauthorized } from "next/navigation";

import {
  testGroupFormSchema,
  TestGroupFormValuesType,
} from "@/validation/test-group";
import { revalidatePath } from "next/cache";

export async function UpdateTestGroup(
  testGroupId: string,
  values: TestGroupFormValuesType,
) {
  const session = await getServerSession();

  if (!session?.user) {
    return unauthorized();
  }

  const validated = testGroupFormSchema.safeParse(values);

  if (!validated.success) {
    return {
      status: "error",
      message: validated.error.issues[0]?.message,
    };
  }

  const data = validated.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.testGroup.update({
        where: { id: testGroupId, userId: session.user.id },
        data: {
          name: data.testGroupName,
          shortName: data.shortName,
          price: data.price,
          description: data.description,
          interpretation: data.interpretation,
          isTestGroupNameVissibleOnReport: data.isOptionalTestGroupNameOnReport,
          testCategoryId: data.category,
        },
      });

      const existingTests = await tx.test.findMany({
        where: { testGroupId },
        include: { patientReportTests: true },
      });

      const incomingIds = new Set(
        data.testRows.filter((row) => row.id).map((row) => row.id!),
      );

      const testsToRemove = existingTests.filter(
        (test) => !incomingIds.has(test.id),
      );

      for (const test of testsToRemove) {
        if (test.patientReportTests.length > 0) {
          continue;
        }
        await tx.test.delete({ where: { id: test.id } });
      }

      for (const [index, row] of data.testRows.entries()) {
        if (row.id) {
          const existingTest = await tx.test.findFirst({
            where: { id: row.id, userId: session.user.id, testGroupId },
          });

          if (!existingTest) {
            continue;
          }

          await tx.test.update({
            where: { id: row.id },
            data: {
              position: index + 1,
              name: row.testName,
              testUnitId: row.unit,
              normalValueMale: row.normalMale,
              normalValueFemale: row.normalFemale,
              isOptionalTest: row.optional,
            },
          });
          continue;
        }
        await tx.test.create({
          data: {
            position: index + 1,
            name: row.testName,
            testUnitId: row.unit,
            normalValueMale: row.normalMale,
            normalValueFemale: row.normalFemale,
            isOptionalTest: row.optional,
            testGroupId,
            userId: session.user.id,
          },
        });
      }
    });

    revalidatePath("/test");

    return {
      status: "success",
      message: "Test group updated successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to update test group",
    };
  }
}
