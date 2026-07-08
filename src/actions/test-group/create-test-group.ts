"use server";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import {
  testGroupFormSchema,
  TestGroupFormValuesType,
} from "@/validation/test-group";
import { invalidateLabData } from "@/lib/invalidate-lab-cache";
import {
  normalizeTestRowForSave,
  resolveTestUnitId,
} from "@/lib/normalize-test-row";
import { unauthorized } from "next/navigation";

export async function CreateTestGroup(
  value: TestGroupFormValuesType,
): Promise<ApiResponse> {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const result = testGroupFormSchema.safeParse(value);

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0].message || "Invalid input data",
    };
  }

  const tests = await Promise.all(
    result.data.testRows.map(async (test, index) => {
      const normalized = normalizeTestRowForSave(test);
      const testUnitId = await resolveTestUnitId(user.id, normalized.unit);

      return {
        position: index + 1,
        name: normalized.testName,
        fullName: normalized.fullName?.trim() || null,
        normalValueMale: normalized.normalMale,
        normalValueFemale: normalized.normalFemale,
        isOptionalTest: normalized.optional ?? false,
        userId: user.id,
        testUnitId,
      };
    }),
  );

  await prisma.testGroup.create({
    data: {
      name: result.data.testGroupName,
      shortName: result.data.shortName,
      price: result.data.price,
      isTestGroupNameVissibleOnReport:
        result.data.isOptionalTestGroupNameOnReport,
      description: "",
      interpretation: result.data.interpretation,
      testCategoryId: result.data.category,
      userId: user.id,
      tests: {
        create: tests,
      },
    },
  });

  invalidateLabData(user.id, {
    includeCatalog: true,
    paths: ["/patients/new", "/test"],
  });
  return {
    status: "success",
    message: "Test Group Created Successfully",
  };
}
