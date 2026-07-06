import { AuthLayoutShell } from "./_components/auth-layout-shell";
import SignInForm from "./form/sign-in";
import Link from "next/link";

export default function SignInViewPage() {
  return (
    <AuthLayoutShell
      title="Welcome back"
      description={
        <>
          Sign in to your{" "}
          <span className="text-foreground font-medium">MedicareLab</span>{" "}
          account to manage patients, tests, and reports.
        </>
      }
      footer={
        <>
          By signing in, you agree to our{" "}
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
      <SignInForm />
    </AuthLayoutShell>
  );
}