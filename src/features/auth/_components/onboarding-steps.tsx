import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type OnboardingStepsProps = {
  currentStep: 1 | 2;
};

const steps = [
  { id: 1, label: "Verify email" },
  { id: 2, label: "Mobile number" },
] as const;

export function OnboardingSteps({ currentStep }: OnboardingStepsProps) {
  return (
    <ol className="mb-8 flex items-center gap-3">
      {steps.map((step, index) => {
        const isComplete = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <li key={step.id} className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                  isComplete && "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary bg-primary/10 text-primary",
                  !isComplete && !isActive && "border-muted-foreground/30 text-muted-foreground",
                )}
              >
                {isComplete ? <Check className="size-4" /> : step.id}
              </div>
              <span
                className={cn(
                  "truncate text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  isComplete ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}