import { Metadata } from "next";
import { redirect } from "next/navigation";

import VerifyEmailViewPage from "@/features/auth/verify-email-view";
import { getServerSession } from "@/lib/get-session";
import { getPostAuthRedirect } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Verify Email — MedicareLab",
  description: "Verify your email address to continue MedicareLab onboarding.",
};

export default async function Page() {
  const session = await getServerSession();
  const user = session?.user;

  if (user?.emailVerified) {
    redirect(getPostAuthRedirect(user));
  }

  return <VerifyEmailViewPage />;
}