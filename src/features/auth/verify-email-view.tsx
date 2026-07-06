import { Suspense } from "react";

import { AuthLayoutShell } from "./_components/auth-layout-shell";
import { OnboardingSteps } from "./_components/onboarding-steps";
import VerifyEmailForm from "./form/verify-email-form";

export default function VerifyEmailViewPage() {
  return (
    <AuthLayoutShell
      title="Check your email"
      description={
        <>
          You&apos;re almost there. Verify your email to continue onboarding
          your{" "}
          <span className="text-foreground font-medium">MedicareLab</span>{" "}
          workspace.
        </>
      }
    >
      <OnboardingSteps currentStep={1} />
      <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}>
        <VerifyEmailForm />
      </Suspense>
    </AuthLayoutShell>
  );
}