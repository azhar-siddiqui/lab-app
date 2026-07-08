import { Metadata } from "next";
import { redirect } from "next/navigation";

import ForgotPasswordViewPage from "@/features/auth/forgot-password-view";
import { getServerSession } from "@/lib/get-session";
import { getPostAuthRedirect } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Forgot Password — MedicareLab",
  description: "Reset your MedicareLab account password.",
};

export default async function Page() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect(getPostAuthRedirect(user));
  }

  return <ForgotPasswordViewPage />;
}