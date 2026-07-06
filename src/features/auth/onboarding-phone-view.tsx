import { AuthLayoutShell } from "./_components/auth-layout-shell";
import { OnboardingSteps } from "./_components/onboarding-steps";
import OnboardingPhoneForm from "./form/onboarding-phone-form";

export default function OnboardingPhoneViewPage() {
  return (
    <AuthLayoutShell
      title="Add your mobile number"
      description={
        <>
          One last step before you access{" "}
          <span className="text-foreground font-medium">MedicareLab</span>.
          This helps us secure your account and support your lab operations.
        </>
      }
    >
      <OnboardingSteps currentStep={2} />
      <OnboardingPhoneForm />
    </AuthLayoutShell>
  );
}