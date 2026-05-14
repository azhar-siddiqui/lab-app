import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GetDoctor() {
  const session = await auth.api.getSession({
    headers: await headers(), // Pass headers for session detection
  });

  const data = await prisma.doctor.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      id: true,
      name: true,
      specialization: true,
    },
  });

  return data;
}

export type DoctorType = Awaited<ReturnType<typeof GetDoctor>>[0];
