import { getDayBounds, parseDateKey, toDateKey } from "@/lib/daily-business";
import { cacheTags } from "@/lib/cache-tags";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export type ReferralDoctorRow = {
  id: string;
  name: string;
  email: string | null;
  contactNumber: string | null;
  specialization: string | null;
  commission: number;
  totalCases: number;
  createdAt: string;
};

export type BillRow = {
  id: string;
  patientId: string;
  patientName: string;
  contactNumber: string | null;
  reportDate: string;
  totalAmount: number;
  amountReceived: number;
  balance: number;
  doctorName: string;
  testGroups: string;
};

export type DueReportRow = BillRow;

export type ReferralBusinessRow = {
  doctorId: string;
  doctorName: string;
  commission: number;
  totalCases: number;
  totalBilling: number;
  commissionAmount: number;
};

export type CaseViewReportData = {
  dateFrom: string;
  dateTo: string;
  totalCases: number;
  totalBilling: number;
  byDoctor: { name: string; cases: number; amount: number }[];
  byTestGroup: { name: string; cases: number }[];
};

export type LabActivity = {
  id: string;
  type: "patient" | "report" | "expense";
  title: string;
  description: string;
  amount?: number;
  createdAt: string;
};

export type LabNotification = {
  id: string;
  title: string;
  description: string;
  href: string;
  variant: "default" | "warning" | "destructive";
};

export type TestCategoryRow = {
  id: string;
  name: string;
  description: string | null;
  testGroupCount: number;
};

export type ReferralDoctorsData = {
  doctors: ReferralDoctorRow[];
  totalDoctors: number;
  averageCommission: number;
};

export type BillsData = {
  bills: BillRow[];
  totalBilled: number;
  totalReceived: number;
  totalOutstanding: number;
};

export type DueReportsData = {
  dues: DueReportRow[];
  totalOutstanding: number;
  patientsWithDues: number;
  largestDue: number;
};

export type ReferralBusinessData = {
  rows: ReferralBusinessRow[];
  totalCases: number;
  totalBilling: number;
  totalCommission: number;
};

function resolveDateRange(dateFrom?: string, dateTo?: string) {
  const to = dateTo ? parseDateKey(dateTo) : new Date();
  const from = dateFrom
    ? parseDateKey(dateFrom)
    : new Date(to.getFullYear(), to.getMonth(), 1);

  from.setHours(0, 0, 0, 0);
  const end = new Date(to);
  end.setDate(end.getDate() + 1);
  end.setHours(0, 0, 0, 0);

  return {
    dateFrom: toDateKey(from),
    dateTo: toDateKey(to),
    start: from,
    end,
  };
}

export const fetchReferralDoctorsData = cache((userId: string) =>
  unstable_cache(
    async (): Promise<ReferralDoctorsData> => {
      const doctors = await prisma.doctor.findMany({
        where: { userId },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          email: true,
          contactNumber: true,
          specialization: true,
          commission: true,
          createdAt: true,
          _count: { select: { reports: true } },
        },
      });

      const rows: ReferralDoctorRow[] = doctors.map((doctor) => ({
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        contactNumber: doctor.contactNumber,
        specialization: doctor.specialization,
        commission: doctor.commission.toNumber(),
        totalCases: doctor._count.reports,
        createdAt: doctor.createdAt.toISOString(),
      }));

      const totalDoctors = rows.length;
      const averageCommission =
        totalDoctors > 0
          ? Math.round(
              (rows.reduce((sum, row) => sum + row.commission, 0) /
                totalDoctors) *
                10,
            ) / 10
          : 0;

      return { doctors: rows, totalDoctors, averageCommission };
    },
    ["referral-doctors", userId],
    { tags: [cacheTags.doctors(userId)], revalidate: 120 },
  )(),
);

export const fetchBillsData = cache((userId: string) =>
  unstable_cache(
    async (): Promise<BillsData> => {
      const reports = await prisma.patientReport.findMany({
        where: { userId },
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
              ammountRecived: true,
              balance: true,
            },
          },
          doctor: { select: { name: true } },
          testGroups: {
            select: { testGroup: { select: { shortName: true } } },
          },
        },
      });

      const bills: BillRow[] = reports.map((report) => ({
        id: report.id,
        patientId: report.patient.id,
        patientName: report.patient.name,
        contactNumber: report.patient.contactNumber,
        reportDate: report.reportDate,
        totalAmount: report.totalAmount.toNumber(),
        amountReceived: report.patient.ammountRecived.toNumber(),
        balance: report.patient.balance.toNumber(),
        doctorName: report.doctor.name,
        testGroups: report.testGroups
          .map((group) => group.testGroup.shortName)
          .join(", "),
      }));

      return {
        bills,
        totalBilled: bills.reduce((sum, bill) => sum + bill.totalAmount, 0),
        totalReceived: bills.reduce((sum, bill) => sum + bill.amountReceived, 0),
        totalOutstanding: bills.reduce((sum, bill) => sum + bill.balance, 0),
      };
    },
    ["bills", userId],
    { tags: [cacheTags.patientReports(userId)], revalidate: 60 },
  )(),
);

export const fetchDueReportsData = cache((userId: string) =>
  unstable_cache(
    async (): Promise<DueReportsData> => {
      const reports = await prisma.patientReport.findMany({
        where: { userId, patient: { balance: { gt: 0 } } },
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
              ammountRecived: true,
              balance: true,
            },
          },
          doctor: { select: { name: true } },
          testGroups: {
            select: { testGroup: { select: { shortName: true } } },
          },
        },
      });

      const dues: DueReportRow[] = reports.map((report) => ({
        id: report.id,
        patientId: report.patient.id,
        patientName: report.patient.name,
        contactNumber: report.patient.contactNumber,
        reportDate: report.reportDate,
        totalAmount: report.totalAmount.toNumber(),
        amountReceived: report.patient.ammountRecived.toNumber(),
        balance: report.patient.balance.toNumber(),
        doctorName: report.doctor.name,
        testGroups: report.testGroups
          .map((group) => group.testGroup.shortName)
          .join(", "),
      }));

      const totalOutstanding = dues.reduce((sum, due) => sum + due.balance, 0);
      const largestDue =
        dues.length > 0 ? Math.max(...dues.map((due) => due.balance)) : 0;

      return {
        dues,
        totalOutstanding,
        patientsWithDues: dues.length,
        largestDue,
      };
    },
    ["due-reports", userId],
    { tags: [cacheTags.patientReports(userId)], revalidate: 60 },
  )(),
);

export const fetchReferralBusinessData = cache((userId: string) =>
  unstable_cache(
    async (): Promise<ReferralBusinessData> => {
      const doctors = await prisma.doctor.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          commission: true,
          reports: {
            select: { totalAmount: true },
          },
        },
      });

      const rows: ReferralBusinessRow[] = doctors
        .map((doctor) => {
          const totalBilling = doctor.reports.reduce(
            (sum, report) => sum + report.totalAmount.toNumber(),
            0,
          );
          const commission = doctor.commission.toNumber();
          return {
            doctorId: doctor.id,
            doctorName: doctor.name,
            commission,
            totalCases: doctor.reports.length,
            totalBilling,
            commissionAmount: Math.round((totalBilling * commission) / 100),
          };
        })
        .filter((row) => row.totalCases > 0)
        .sort((a, b) => b.totalBilling - a.totalBilling);

      return {
        rows,
        totalCases: rows.reduce((sum, row) => sum + row.totalCases, 0),
        totalBilling: rows.reduce((sum, row) => sum + row.totalBilling, 0),
        totalCommission: rows.reduce(
          (sum, row) => sum + row.commissionAmount,
          0,
        ),
      };
    },
    ["referral-business", userId],
    { tags: [cacheTags.doctors(userId), cacheTags.patientReports(userId)], revalidate: 60 },
  )(),
);

export const fetchCaseViewReportsData = cache(
  (userId: string, dateFrom?: string, dateTo?: string) => {
    const range = resolveDateRange(dateFrom, dateTo);

    return unstable_cache(
      async (): Promise<CaseViewReportData> => {
        const reports = await prisma.patientReport.findMany({
          where: {
            userId,
            createdAt: { gte: range.start, lt: range.end },
          },
          select: {
            totalAmount: true,
            doctor: { select: { name: true } },
            testGroups: {
              select: { testGroup: { select: { shortName: true } } },
            },
          },
        });

        const doctorMap = new Map<string, { cases: number; amount: number }>();
        const testGroupMap = new Map<string, number>();

        for (const report of reports) {
          const doctorName = report.doctor.name;
          const doctorEntry = doctorMap.get(doctorName) ?? {
            cases: 0,
            amount: 0,
          };
          doctorEntry.cases += 1;
          doctorEntry.amount += report.totalAmount.toNumber();
          doctorMap.set(doctorName, doctorEntry);

          for (const group of report.testGroups) {
            const name = group.testGroup.shortName;
            testGroupMap.set(name, (testGroupMap.get(name) ?? 0) + 1);
          }
        }

        return {
          dateFrom: range.dateFrom,
          dateTo: range.dateTo,
          totalCases: reports.length,
          totalBilling: reports.reduce(
            (sum, report) => sum + report.totalAmount.toNumber(),
            0,
          ),
          byDoctor: Array.from(doctorMap.entries())
            .map(([name, value]) => ({ name, ...value }))
            .sort((a, b) => b.cases - a.cases),
          byTestGroup: Array.from(testGroupMap.entries())
            .map(([name, cases]) => ({ name, cases }))
            .sort((a, b) => b.cases - a.cases),
        };
      },
      ["case-view-reports", userId, range.dateFrom, range.dateTo],
      { tags: [cacheTags.patientReports(userId)], revalidate: 60 },
    )();
  },
);

export const fetchLabActivities = cache((userId: string) =>
  unstable_cache(
    async (): Promise<LabActivity[]> => {
      const [reports, expenses] = await Promise.all([
        prisma.patientReport.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 12,
          select: {
            id: true,
            createdAt: true,
            totalAmount: true,
            patient: { select: { name: true } },
            doctor: { select: { name: true } },
          },
        }),
        prisma.expense.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 8,
          select: {
            id: true,
            title: true,
            amount: true,
            createdAt: true,
          },
        }),
      ]);

      const reportActivities: LabActivity[] = reports.map((report) => ({
        id: `report-${report.id}`,
        type: "report",
        title: `Case registered — ${report.patient.name}`,
        description: `Referred by ${report.doctor.name}`,
        amount: report.totalAmount.toNumber(),
        createdAt: report.createdAt.toISOString(),
      }));

      const expenseActivities: LabActivity[] = expenses.map((expense) => ({
        id: `expense-${expense.id}`,
        type: "expense",
        title: `Expense logged — ${expense.title}`,
        description: "Lab spending recorded",
        amount: expense.amount.toNumber(),
        createdAt: expense.createdAt.toISOString(),
      }));

      return [...reportActivities, ...expenseActivities]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 20);
    },
    ["lab-activities", userId],
    {
      tags: [
        cacheTags.patientReports(userId),
        cacheTags.expenses(userId, toDateKey(new Date())),
      ],
      revalidate: 30,
    },
  )(),
);

export const fetchLabNotifications = cache((userId: string) =>
  unstable_cache(
    async (): Promise<LabNotification[]> => {
      const [pendingReports, duesAgg, recentExpenses] = await Promise.all([
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
        prisma.patient.aggregate({
          where: { userId, balance: { gt: 0 } },
          _sum: { balance: true },
          _count: true,
        }),
        prisma.expense.count({
          where: {
            userId,
            expenseDate: {
              gte: getDayBounds(toDateKey(new Date())).start,
              lt: getDayBounds(toDateKey(new Date())).end,
            },
          },
        }),
      ]);

      const notifications: LabNotification[] = [];

      if (pendingReports > 0) {
        notifications.push({
          id: "pending-reports",
          title: `${pendingReports} report${pendingReports === 1 ? "" : "s"} awaiting results`,
          description: "Complete result entry to deliver reports to patients.",
          href: "/patients",
          variant: "warning",
        });
      }

      const outstanding = duesAgg._sum.balance?.toNumber() ?? 0;
      const dueCount = duesAgg._count ?? 0;
      if (outstanding > 0) {
        notifications.push({
          id: "outstanding-dues",
          title: `₹${outstanding.toLocaleString("en-IN")} outstanding across ${dueCount} case${dueCount === 1 ? "" : "s"}`,
          description: "Review due reports and follow up on collections.",
          href: "/dashboard/business/due-reports",
          variant: "destructive",
        });
      }

      if (recentExpenses === 0) {
        notifications.push({
          id: "no-expenses-today",
          title: "No expenses logged today",
          description: "Keep daily spending up to date for accurate business reports.",
          href: "/dashboard/business/expenses",
          variant: "default",
        });
      }

      notifications.push({
        id: "daily-business",
        title: "Review today's business summary",
        description: "Check cases, billing, and collections for the current day.",
        href: "/dashboard/business/daily",
        variant: "default",
      });

      return notifications;
    },
    ["lab-notifications", userId],
    {
      tags: [
        cacheTags.dashboardStats(userId),
        cacheTags.patientReports(userId),
      ],
      revalidate: 30,
    },
  )(),
);

export const fetchTestCategoriesWithCounts = cache((userId: string) =>
  unstable_cache(
    async (): Promise<TestCategoryRow[]> => {
      const categories = await prisma.testCategory.findMany({
        where: { userId },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          _count: { select: { testGroups: true } },
        },
      });

      return categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        testGroupCount: category._count.testGroups,
      }));
    },
    ["test-categories-counts", userId],
    { tags: [cacheTags.testCategories(userId)], revalidate: 120 },
  )(),
);