import { Metadata } from "next";

import SignUpViewPage from "@/features/auth/sign-up-view";

export const metadata: Metadata = {
  title: "Sign Up — MedicareLab",
  description: "Create your MedicareLab account and start managing your pathology lab.",
};

export default function Page() {
  return <SignUpViewPage />;
}