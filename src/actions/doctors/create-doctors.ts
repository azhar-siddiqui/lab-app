"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import {
  doctorFormSchema,
  DoctorFormValuesTypes,
} from "@/validation/doctorform";
import { cacheTags } from "@/lib/cache-tags";
import { revalidatePath, revalidateTag } from "next/cache";
import { unauthorized } from "next/navigation";

export async function CreateDoctor(
  value: DoctorFormValuesTypes,
): Promise<ApiResponse> {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const result = doctorFormSchema.safeParse(value);

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0].message || "Invalid input data", // Return the first validation error
    };
  }

  await prisma.doctor.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      commission: result.data.commission,
      contactNumber: result.data.phone,
      specialization: result.data.degree,
      userId: user.id,
    },
  });

  revalidateTag(cacheTags.doctors(user.id), "max");
  revalidatePath("/patients/new");

  return {
    status: "success",
    message:
      "Docter added to refrence dropdown list, please select from dropdown list.",
  };
}
