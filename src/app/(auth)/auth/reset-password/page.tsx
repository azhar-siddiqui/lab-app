import { Metadata } from "next";
import { redirect } from "next/navigation";

import ResetPasswordViewPage from "@/features/auth/reset-password-view";
import { getServerSession } from "@/lib/get-session";
import { getPostAuthRedirect } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Reset Password — MedicareLab",
  description: "Choose a new password for your MedicareLab account.",
};

export default async function Page() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect(getPostAuthRedirect(user));
  }

  return <ResetPasswordViewPage />;
}