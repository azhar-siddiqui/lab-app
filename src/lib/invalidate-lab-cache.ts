import { toDateKey } from "@/lib/daily-business";
import { cacheTags } from "@/lib/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";

type InvalidateLabDataOptions = {
  dateKeys?: string[];
  reportId?: string;
  patientId?: string;
  testGroupId?: string;
  includeDoctors?: boolean;
  includeCatalog?: boolean;
  paths?: string[];
};

export function invalidateLabData(
  userId: string,
  {
    dateKeys = [toDateKey(new Date())],
    reportId,
    patientId,
    testGroupId,
    includeDoctors = false,
    includeCatalog = false,
    paths = [],
  }: InvalidateLabDataOptions = {},
) {
  revalidateTag(cacheTags.patientReports(userId), "max");
  revalidateTag(cacheTags.dashboardStats(userId), "max");
  revalidateTag(cacheTags.billingLedger(userId), "max");
  revalidateTag(cacheTags.labInsights(userId), "max");

  for (const dateKey of dateKeys) {
    revalidateTag(cacheTags.dailyBusiness(userId, dateKey), "max");
    revalidateTag(cacheTags.expenses(userId, dateKey), "max");
  }

  if (reportId) {
    revalidateTag(cacheTags.patientReport(reportId), "max");
  }

  if (patientId) {
    revalidateTag(cacheTags.patient(patientId), "max");
  }

  if (testGroupId) {
    revalidateTag(cacheTags.testGroup(testGroupId), "max");
  }

  if (includeDoctors) {
    revalidateTag(cacheTags.doctors(userId), "max");
  }

  if (includeCatalog) {
    revalidateTag(cacheTags.testGroups(userId), "max");
    revalidateTag(cacheTags.testCategories(userId), "max");
    revalidateTag(cacheTags.testUnits(userId), "max");
  }

  for (const path of paths) {
    revalidatePath(path);
  }
}