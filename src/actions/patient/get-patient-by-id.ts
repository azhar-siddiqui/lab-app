"use server";

import { fetchPatientById } from "@/lib/cached-queries";
import { getServerSession } from "@/lib/get-session";
import { notFound, unauthorized } from "next/navigation";
import { cache } from "react";

export const GetPatientById = cache(async (patientId: string) => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const patient = await fetchPatientById(patientId, user.id);

  if (!patient) {
    return notFound();
  }

  return patient;
});

export type GetPatientByIdType = Awaited<ReturnType<typeof GetPatientById>>;