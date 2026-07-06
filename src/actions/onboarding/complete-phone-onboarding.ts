"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { isValidE164PhoneNumber } from "@/validation/phone";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function completePhoneOnboarding(
  phoneNumber: string,
): Promise<ApiResponse> {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    return {
      status: "error",
      message: "Please sign in to continue.",
    };
  }

  if (!user.emailVerified) {
    return {
      status: "error",
      message: "Verify your email before completing onboarding.",
    };
  }

  if (!isValidE164PhoneNumber(phoneNumber)) {
    return {
      status: "error",
      message: "Enter a valid mobile number.",
    };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phoneNumber,
        onboardingCompleted: true,
      },
    });
  } catch (error) {
    console.error("[onboarding] Failed to save phone number:", error);
    return {
      status: "error",
      message: "Could not save your mobile number. Please try again.",
    };
  }

  revalidatePath("/auth/onboarding/phone");
  revalidatePath("/dashboard/overview");

  redirect("/dashboard/overview");
}