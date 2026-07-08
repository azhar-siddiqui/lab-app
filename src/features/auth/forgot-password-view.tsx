import { AuthLayoutShell } from "./_components/auth-layout-shell";
import ForgotPasswordForm from "./form/forgot-password-form";

export default function ForgotPasswordViewPage() {
  return (
    <AuthLayoutShell
      title="Forgot your password?"
      description={
        <>
          Enter the email linked to your{" "}
          <span className="text-foreground font-medium">MedicareLab</span>{" "}
          account and we&apos;ll send you a reset link.
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthLayoutShell>
  );
}