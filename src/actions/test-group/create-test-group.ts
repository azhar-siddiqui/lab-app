"use server";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import {
  testGroupFormSchema,
  TestGroupFormValuesType,
} from "@/validation/test-group";
import { revalidatePath } from "next/cache";
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
      message: result.error.issues[0].message || "Invalid input data", // Return the first validation error
    };
  }

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
        create: result.data.testRows.map((test, index) => ({
          position: index + 1,
          name: test.testName,
          normalValueMale: test.normalMale,
          normalValueFemale: test.normalFemale,
          isOptionalTest: test.optional,
          userId: user.id,
          testUnitId: test.unit,
        })),
      },
    },
  });

  revalidatePath("/patients/new");
  return {
    status: "success",
    message: "Successfull",
  };
}
