import prisma from "@/lib/prisma";

export async function getFreshUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      emailVerified: true,
      onboardingCompleted: true,
      phoneNumber: true,
    },
  });
}