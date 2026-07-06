import { Metadata } from "next";
import { redirect } from "next/navigation";

import SignInViewPage from "@/features/auth/sign-in-view";
import { getServerSession } from "@/lib/get-session";
import { getPostAuthRedirect } from "@/lib/onboarding";

export const metadata: Metadata = {
  title: "Sign In — MedicareLab",
  description: "Sign in to your MedicareLab laboratory management account.",
};

export default async function Page() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect(getPostAuthRedirect(user));
  }

  return <SignInViewPage />;
}