"use server";

import prisma from "@/lib/prisma";

import { getServerSession } from "@/lib/get-session";

import { serializeDecimal } from "@/lib/fomat-price";
import { notFound, unauthorized } from "next/navigation";

export async function GetPatientById(patientId: string) {
  const session = await getServerSession();

  if (!session?.user) {
    return unauthorized();
  }
  //   const patient = await prisma.patient.findUnique({
  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
      userId: session.user.id,
    },

    include: {
      reports: {
        include: {
          testGroups: true,
        },

        take: 1,

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!patient) {
    return notFound();
  }

  return serializeDecimal(patient);
}

export type GetPatientByIdType = Awaited<ReturnType<typeof GetPatientById>>;
