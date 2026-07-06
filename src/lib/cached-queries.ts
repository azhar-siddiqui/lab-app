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
import { createCachedQueryFn } from "@/lib/cache-utils";
import prisma from "@/lib/prisma";

export const fetchDoctors = createCachedQueryFn({
  getKeyParts: (userId: string) => ["doctors", userId],
  getTags: (userId: string) => [cacheTags.doctors(userId)],
  profile: "catalog",
  fn: (userId: string) =>
    prisma.doctor.findMany({
      where: { userId },
      select: { id: true, name: true, specialization: true },
    }),
});

export const fetchTestGroups = createCachedQueryFn({
  getKeyParts: (userId: string) => ["test-groups", userId],
  getTags: (userId: string) => [cacheTags.testGroups(userId)],
  profile: "catalog",
  fn: async (userId: string) => {
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
});

export const fetchTestCategories = createCachedQueryFn({
  getKeyParts: (userId: string) => ["test-categories", userId],
  getTags: (userId: string) => [cacheTags.testCategories(userId)],
  profile: "catalog",
  fn: (userId: string) =>
    prisma.testCategory.findMany({
      where: { userId },
      select: { id: true, name: true, description: true },
    }),
});

export const fetchTestUnits = createCachedQueryFn({
  getKeyParts: (userId: string) => ["test-units", userId],
  getTags: (userId: string) => [cacheTags.testUnits(userId)],
  profile: "catalog",
  fn: (userId: string) =>
    prisma.testUnit.findMany({
      where: { userId },
      select: { id: true, name: true },
    }),
});

export const fetchPatientReports = createCachedQueryFn({
  getKeyParts: (userId: string) => ["patient-reports", userId],
  getTags: (userId: string) => [cacheTags.patientReports(userId)],
  profile: "live",
  fn: async (userId: string) => {
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
});

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
  duePatientCount: number;
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

export const fetchDashboardStats = createCachedQueryFn({
  getKeyParts: (userId: string) => ["dashboard-stats", userId],
  getTags: (userId: string) => [
    cacheTags.dashboardStats(userId),
    cacheTags.patientReports(userId),
    cacheTags.doctors(userId),
    cacheTags.testGroups(userId),
  ],
  profile: "live",
  fn: async (userId: string): Promise<DashboardStats> => {
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
        _count: true,
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
      duePatientCount: duesAgg._count ?? 0,
      pendingReports,
      recentCases,
    };
  },
});

export const fetchDailyBusiness = createCachedQueryFn({
  getKeyParts: (userId: string, dateKey: string) => [
    "daily-business",
    userId,
    dateKey,
  ],
  getTags: (userId: string, dateKey: string) => [
    cacheTags.dailyBusiness(userId, dateKey),
    cacheTags.patientReports(userId),
  ],
  profile: "live",
  fn: async (userId: string, dateKey: string): Promise<DailyBusinessData> => {
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
});

export const fetchDailyExpenses = createCachedQueryFn({
  getKeyParts: (userId: string, dateKey: string) => [
    "daily-expenses",
    userId,
    dateKey,
  ],
  getTags: (userId: string, dateKey: string) => [
    cacheTags.expenses(userId, dateKey),
  ],
  profile: "live",
  fn: async (
    userId: string,
    dateKey: string,
  ): Promise<DailyExpensesData> => {
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
      items.length > 0 ? Math.max(...items.map((item) => item.amount)) : 0;
    const averageExpense = totalEntries > 0 ? totalSpent / totalEntries : 0;

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
});

export const fetchPatientReportById = createCachedQueryFn({
  getKeyParts: (reportId: string, userId: string) => [
    "patient-report",
    reportId,
    userId,
  ],
  getTags: (reportId: string, userId: string) => [
    cacheTags.patientReport(reportId),
    cacheTags.patientReports(userId),
  ],
  profile: "entity",
  fn: async (reportId: string, userId: string) => {
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
});

export const fetchPatientById = createCachedQueryFn({
  getKeyParts: (patientId: string, userId: string) => [
    "patient",
    patientId,
    userId,
  ],
  getTags: (patientId: string, userId: string) => [
    cacheTags.patient(patientId),
    cacheTags.patientReports(userId),
  ],
  profile: "entity",
  fn: async (patientId: string, userId: string) => {
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
  },
});

export const fetchTestGroupById = createCachedQueryFn({
  getKeyParts: (testGroupId: string, userId: string) => [
    "test-group",
    testGroupId,
    userId,
  ],
  getTags: (testGroupId: string, userId: string) => [
    cacheTags.testGroup(testGroupId),
    cacheTags.testGroups(userId),
  ],
  profile: "entity",
  fn: async (testGroupId: string, userId: string) => {
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
});