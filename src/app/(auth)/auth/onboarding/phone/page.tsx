import { Metadata } from "next";
import { redirect } from "next/navigation";

import OnboardingPhoneViewPage from "@/features/auth/onboarding-phone-view";
import { getServerSession } from "@/lib/get-session";
import { getFreshUserProfile } from "@/lib/get-user-profile";

export const metadata: Metadata = {
  title: "Complete Setup — MedicareLab",
  description: "Add your mobile number to finish setting up your MedicareLab account.",
};

export default async function Page() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect("/auth/sign-in");
  }

  const profile = await getFreshUserProfile(user.id);

  if (!profile?.emailVerified) {
    redirect(
      `/auth/verify-email?email=${encodeURIComponent(profile?.email ?? user.email)}`,
    );
  }

  if (profile?.onboardingCompleted) {
    redirect("/dashboard/overview");
  }

  return <OnboardingPhoneViewPage />;
}