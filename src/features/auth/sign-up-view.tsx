import { AuthLayoutShell } from "./_components/auth-layout-shell";
import SignUpForm from "./form/sign-up";
import Link from "next/link";

export default function SignUpViewPage() {
  return (
    <AuthLayoutShell
      title="Create your account"
      description={
        <>
          Get started with{" "}
          <span className="text-foreground font-medium">MedicareLab</span> and
          streamline your lab operations in minutes.
        </>
      }
      footer={
        <>
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-foreground hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-foreground hover:underline">
            Privacy Policy
          </Link>
          .
        </>
      }
    >
      <SignUpForm />
    </AuthLayoutShell>
  );
}