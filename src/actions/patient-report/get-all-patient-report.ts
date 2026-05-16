"use server";

import { serializeDecimal } from "@/lib/fomat-price";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { notFound, unauthorized } from "next/navigation";

export async function GetPatientReports() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const reports = await prisma.patientReport.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      patient: {
        select: {
          id: true,
          date: true,
          name: true,
          contactNumber: true,
          totalRs: true,
          discount: true,
          ammountRecived: true,
          balance: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      testGroups: {
        include: {
          testGroup: {
            select: {
              name: true,
              shortName: true,
              price: true,
              testCategory: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!reports) {
    return notFound();
  }

  return serializeDecimal(reports);
}

export type GetPatientReportsType = Awaited<
  ReturnType<typeof GetPatientReports>
>[0];
