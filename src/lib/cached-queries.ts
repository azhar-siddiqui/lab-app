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