import prisma from "@/lib/prisma";

const OPTIONAL_UNIT_NAME = "-";

type TestRowInput = {
  testName: string;
  fullName?: string;
  unit: string;
  normalMale: string;
  normalFemale: string;
  optional?: boolean;
};

export function normalizeTestRowForSave(row: TestRowInput): TestRowInput {
  if (!row.optional) {
    return row;
  }

  const fullName = row.fullName?.trim() ?? "";

  return {
    ...row,
    testName: row.testName?.trim() || fullName || "-",
    fullName,
    normalMale: row.normalMale?.trim() || "-",
    normalFemale: row.normalFemale?.trim() || "-",
  };
}

export async function resolveTestUnitId(userId: string, unitId?: string) {
  if (unitId?.trim()) {
    return unitId;
  }

  const unit = await prisma.testUnit.upsert({
    where: {
      userId_name: {
        userId,
        name: OPTIONAL_UNIT_NAME,
      },
    },
    create: {
      userId,
      name: OPTIONAL_UNIT_NAME,
    },
    update: {},
    select: { id: true },
  });

  return unit.id;
}