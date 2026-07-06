import { Metadata } from "next";

import SignInViewPage from "@/features/auth/sign-in-view";

export const metadata: Metadata = {
  title: "Sign In — MedicareLab",
  description: "Sign in to your MedicareLab laboratory management account.",
};

export default function Page() {
  return <SignInViewPage />;
}