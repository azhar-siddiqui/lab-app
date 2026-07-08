import { Suspense } from "react";

import { AuthLayoutShell } from "./_components/auth-layout-shell";
import ResetPasswordForm from "./form/reset-password-form";

export default function ResetPasswordViewPage() {
  return (
    <AuthLayoutShell
      title="Set a new password"
      description={
        <>
          Choose a new password for your{" "}
          <span className="text-foreground font-medium">MedicareLab</span>{" "}
          account.
        </>
      }
    >
      <Suspense
        fallback={<div className="h-48 animate-pulse rounded-xl bg-muted" />}
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthLayoutShell>
  );
}