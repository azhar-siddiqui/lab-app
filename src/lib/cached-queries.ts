import {
  DailyBusinessData,
  getDayBounds,
  getDiscountAmount,
  getGrossAmount,
} from "@/lib/daily-business";
import {
  DailyExpensesData,
  expenseCategoryLabels,
  type ExpenseCategoryTotal,
} from "@/lib/expenses";
import { ExpenseCategory } from "@/generated/prisma/enums";
import { serializeDecimal } from "@/lib/fomat-price";
import { cacheTags } from "@/lib/cache-tags";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const fetchDoctors = cache((userId: string) =>
  unstable_cache(
    async () =>
      prisma.doctor.findMany({
        where: { userId },
        select: { id: true, name: true, specialization: true },
      }),
    ["doctors", userId],
    { tags: [cacheTags.doctors(userId)], revalidate: 120 },
  )(),
);

export const fetchTestGroups = cache((userId: string) =>
  unstable_cache(
    async () => {
      const data = await prisma.testGroup.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          shortName: true,
          price: true,
          testCategory: {
            select: { id: true, name: true },
          },
          createdAt: true,
        },
      });

      return data.map((item) => ({
        ...item,
        price: item.price.toNumber(),
      }));
    },
    ["test-groups", userId],
    { tags: [cacheTags.testGroups(userId)], revalidate: 120 },
  )(),
);

export const fetchTestCategories = cache((userId: string) =>
  unstable_cache(
    async () =>
      prisma.testCategory.findMany({
        where: { userId },
        select: { id: true, name: true, description: true },
      }),
    ["test-categories", userId],
    { tags: [cacheTags.testCategories(userId)], revalidate: 120 },
  )(),
);

export const fetchTestUnits = cache((userId: string) =>
  unstable_cache(
    async () =>
      prisma.testUnit.findMany({
        where: { userId },
        select: { id: true, name: true },
      }),
    ["test-units", userId],
    { tags: [cacheTags.testUnits(userId)], revalidate: 120 },
  )(),
);

export const fetchPatientReports = cache((userId: string) =>
  unstable_cache(
    async () => {
      const reports = await prisma.patientReport.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          patientId: true,
          totalAmount: true,
          reportDate: true,
          patient: {
            select: {
              id: true,
              name: true,
              contactNumber: true,
              balance: true,
            },
          },
          testGroups: {
            select: {
              id: true,
              testGroup: {
                select: {
                  shortName: true,
                },
              },
            },
          },
        },
      });

      return serializeDecimal(reports);
    },
    ["patient-reports", userId],
    { tags: [cacheTags.patientReports(userId)], revalidate: 30 },
  )(),
);

export type DashboardRecentCase = {
  id: string;
  patientName: string;
  tests: string;
  status: "Ready" | "Pending" | "In progress";
  reportDate: string;
  amount: number;
  balance: number;
};

export type DashboardStats = {
  totalPatients: number;
  totalReports: number;
  totalDoctors: number;
  totalTestGroups: number;
  casesToday: number;
  revenueToday: number;
  totalRevenue: number;
  outstandingDues: number;
  pendingReports: number;
  recentCases: DashboardRecentCase[];
};

function getReportStatus(
  testGroups: {
    tests: { resultValue: string | null }[];
  }[],
): DashboardRecentCase["status"] {
  const hasPending = testGroups.some((group) =>
    group.tests.some((test) => !test.resultValue?.trim()),
  );
  const hasAnyResult = testGroups.some((group) =>
    group.tests.some((test) => Boolean(test.resultValue?.trim())),
  );

  if (!hasPending) return "Ready";
  if (!hasAnyResult) return "Pending";
  return "In progress";
}

export const fetchDashboardStats = cache((userId: string) =>
  unstable_cache(
    async (): Promise<DashboardStats> => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [
        totalPatients,
        totalReports,
        totalDoctors,
        totalTestGroups,
        casesToday,
        revenueTodayAgg,
        revenueAgg,
        duesAgg,
        pendingReports,
        recentReports,
      ] = await Promise.all([
        prisma.patient.count({ where: { userId } }),
        prisma.patientReport.count({ where: { userId } }),
        prisma.doctor.count({ where: { userId } }),
        prisma.testGroup.count({ where: { userId } }),
        prisma.patientReport.count({
          where: {
            userId,
            createdAt: { gte: today, lt: tomorrow },
          },
        }),
        prisma.patientReport.aggregate({
          where: {
            userId,
            createdAt: { gte: today, lt: tomorrow },
          },
          _sum: { totalAmount: true },
        }),
        prisma.patientReport.aggregate({
          where: { userId },
          _sum: { totalAmount: true },
        }),
        prisma.patient.aggregate({
          where: { userId, balance: { gt: 0 } },
          _sum: { balance: true },
        }),
        prisma.patientReport.count({
          where: {
            userId,
            testGroups: {
              some: {
                tests: {
                  some: {
                    OR: [{ resultValue: null }, { resultValue: "" }],
                  },
                },
              },
            },
          },
        }),
        prisma.patientReport.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 6,
          select: {
            id: true,
            reportDate: true,
            totalAmount: true,
            patient: {
              select: { name: true, balance: true },
            },
            testGroups: {
              select: {
                testGroup: { select: { shortName: true } },
                tests: { select: { resultValue: true } },
              },
            },
          },
        }),
      ]);

      const recentCases: DashboardRecentCase[] = recentReports.map((report) => ({
        id: report.id,
        patientName: report.patient.name,
        tests: report.testGroups
          .map((group) => group.testGroup.shortName)
          .join(", "),
        status: getReportStatus(report.testGroups),
        reportDate: report.reportDate,
        amount: report.totalAmount.toNumber(),
        balance: report.patient.balance.toNumber(),
      }));

      return {
        totalPatients,
        totalReports,
        totalDoctors,
        totalTestGroups,
        casesToday,
        revenueToday: revenueTodayAgg._sum.totalAmount?.toNumber() ?? 0,
        totalRevenue: revenueAgg._sum.totalAmount?.toNumber() ?? 0,
        outstandingDues: duesAgg._sum.balance?.toNumber() ?? 0,
        pendingReports,
        recentCases,
      };
    },
    ["dashboard-stats", userId],
    {
      tags: [
        cacheTags.dashboardStats(userId),
        cacheTags.patientReports(userId),
        cacheTags.doctors(userId),
        cacheTags.testGroups(userId),
      ],
      revalidate: 30,
    },
  )(),
);

export const fetchDailyBusiness = cache((userId: string, dateKey: string) =>
  unstable_cache(
    async (): Promise<DailyBusinessData> => {
      const { start, end } = getDayBounds(dateKey);

      const reports = await prisma.patientReport.findMany({
        where: {
          userId,
          createdAt: { gte: start, lt: end },
        },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          reportDate: true,
          totalAmount: true,
          patient: {
            select: {
              id: true,
              name: true,
              contactNumber: true,
              totalRs: true,
              discount: true,
              ammountRecived: true,
              balance: true,
            },
          },
          doctor: {
            select: { name: true },
          },
          testGroups: {
            select: {
              testGroup: {
                select: { shortName: true },
              },
            },
          },
        },
      });

      const cases = reports.map((report) => {
        const netAmount = report.patient.totalRs.toNumber();
        const discountPercent = report.patient.discount.toNumber();
        const grossAmount = getGrossAmount(netAmount, discountPercent);
        const discountAmount = getDiscountAmount(netAmount, discountPercent);

        return {
          id: report.id,
          patientId: report.patient.id,
          patientName: report.patient.name,
          contactNumber: report.patient.contactNumber,
          doctorName: report.doctor.name,
          testGroups: report.testGroups.map((group) => group.testGroup.shortName),
          grossAmount,
          discountPercent,
          discountAmount,
          totalAmount: report.totalAmount.toNumber(),
          amountReceived: report.patient.ammountRecived.toNumber(),
          balance: report.patient.balance.toNumber(),
          reportDate: report.reportDate,
        };
      });

      const totals = cases.reduce(
        (acc, item) => ({
          grossBilling: acc.grossBilling + item.grossAmount,
          totalDiscount: acc.totalDiscount + item.discountAmount,
          netBilling: acc.netBilling + item.totalAmount,
          totalReceived: acc.totalReceived + item.amountReceived,
          totalDue: acc.totalDue + item.balance,
        }),
        {
          grossBilling: 0,
          totalDiscount: 0,
          netBilling: 0,
          totalReceived: 0,
          totalDue: 0,
        },
      );

      return {
        dateKey,
        totalCases: cases.length,
        ...totals,
        cases,
      };
    },
    ["daily-business", userId, dateKey],
    {
      tags: [
        cacheTags.dailyBusiness(userId, dateKey),
        cacheTags.patientReports(userId),
      ],
      revalidate: 30,
    },
  )(),
);

export const fetchDailyExpenses = cache((userId: string, dateKey: string) =>
  unstable_cache(
    async (): Promise<DailyExpensesData> => {
      const { start, end } = getDayBounds(dateKey);

      const expenses = await prisma.expense.findMany({
        where: {
          userId,
          expenseDate: { gte: start, lt: end },
        },
        orderBy: [{ expenseDate: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          title: true,
          amount: true,
          category: true,
          notes: true,
          expenseDate: true,
        },
      });

      const items = expenses.map((expense) => ({
        id: expense.id,
        title: expense.title,
        amount: expense.amount.toNumber(),
        category: expense.category,
        notes: expense.notes,
        expenseDate: expense.expenseDate.toISOString(),
      }));

      const totalSpent = items.reduce((sum, item) => sum + item.amount, 0);
      const totalEntries = items.length;
      const largestExpense =
        items.length > 0
          ? Math.max(...items.map((item) => item.amount))
          : 0;
      const averageExpense =
        totalEntries > 0 ? totalSpent / totalEntries : 0;

      const categoryMap = new Map<ExpenseCategory, ExpenseCategoryTotal>();

      for (const item of items) {
        const existing = categoryMap.get(item.category);
        if (existing) {
          existing.amount += item.amount;
          existing.count += 1;
        } else {
          categoryMap.set(item.category, {
            category: item.category,
            label: expenseCategoryLabels[item.category],
            amount: item.amount,
            count: 1,
          });
        }
      }

      const categoryBreakdown = Array.from(categoryMap.values()).sort(
        (a, b) => b.amount - a.amount,
      );

      const topCategory = categoryBreakdown[0] ?? null;

      return {
        dateKey,
        totalSpent,
        totalEntries,
        largestExpense,
        topCategory: topCategory?.category ?? null,
        topCategoryAmount: topCategory?.amount ?? 0,
        averageExpense,
        categoryBreakdown,
        expenses: items,
      };
    },
    ["daily-expenses", userId, dateKey],
    {
      tags: [cacheTags.expenses(userId, dateKey)],
      revalidate: 30,
    },
  )(),
);

export const fetchPatientReportById = cache(
  async (reportId: string, userId: string) => {
    const report = await prisma.patientReport.findFirst({
      where: { id: reportId, userId },
      include: {
        patient: true,
        doctor: {
          select: { id: true, name: true },
        },
        testGroups: {
          include: {
            testGroup: {
              include: { testCategory: true },
            },
            tests: {
              orderBy: {
                test: { position: "asc" },
              },
              include: { test: { include: { testUnit: true } } },
            },
          },
        },
      },
    });

    return report ? serializeDecimal(report) : null;
  },
);

export const fetchPatientById = cache(async (patientId: string, userId: string) => {
  const patient = await prisma.patient.findUnique({
    where: { id: patientId, userId },
    include: {
      reports: {
        include: { testGroups: true },
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return patient ? serializeDecimal(patient) : null;
});

export const fetchTestGroupById = cache(
  async (testGroupId: string, userId: string) => {
    const group = await prisma.testGroup.findFirst({
      where: { id: testGroupId, userId },
      include: {
        tests: {
          orderBy: { position: "asc" },
        },
      },
    });

    return group ? serializeDecimal(group) : null;
  },
);