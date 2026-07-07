import { Gender } from "@/generated/prisma/enums";

export type TestStatus = "high" | "low" | "normal";

export function parseNormalRange(rangeStr: string): { low: number; high: number } {
  if (!rangeStr) return { low: 0, high: 999999 };

  const numbers = rangeStr.match(/\d+/g);
  if (!numbers) return { low: 0, high: 999999 };

  return {
    low: Number.parseFloat(numbers[0]),
    high: Number.parseFloat(numbers.at(-1) ?? "0"),
  };
}

export function getReferenceRange(
  normalValueMale: string,
  normalValueFemale: string,
  gender: Gender,
): string {
  if (gender === Gender.Male) return normalValueMale;
  if (gender === Gender.Female) return normalValueFemale;
  return normalValueMale || normalValueFemale;
}

export function getTestStatus(
  resultValue: string | null | undefined,
  normalValueMale: string,
  normalValueFemale: string,
  gender: Gender,
): TestStatus | null {
  const parsed = Number.parseFloat(resultValue ?? "");
  if (Number.isNaN(parsed)) return null;

  const range = getReferenceRange(normalValueMale, normalValueFemale, gender);
  const { low, high } = parseNormalRange(range);

  if (parsed > high) return "high";
  if (parsed < low) return "low";
  return "normal";
}