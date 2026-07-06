"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { unstable_rethrow } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { phoneNumberSchema } from "@/validation/phone";
import * as z from "zod";

import { completePhoneOnboarding } from "@/actions/onboarding/complete-phone-onboarding";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PhoneInput } from "@/components/ui/phone-input";
import { Loader2, Smartphone } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  phoneNumber: phoneNumberSchema,
});

type OnboardingPhoneValues = z.infer<typeof formSchema>;

export default function OnboardingPhoneForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<OnboardingPhoneValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  function onSubmit(data: OnboardingPhoneValues) {
    startTransition(async () => {
      try {
        const result = await completePhoneOnboarding(data.phoneNumber);

        if (result.status === "error") {
          toast.error(result.message);
        }
      } catch (error) {
        unstable_rethrow(error);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-muted/20 p-5">
        <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-primary/10">
          <Smartphone className="size-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Add your mobile number so we can reach you for account alerts and lab
          notifications.
        </p>
      </div>

      <form id="onboarding-phone-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phoneNumber">Mobile number</FieldLabel>
                <PhoneInput
                  {...field}
                  id="phoneNumber"
                  defaultCountry="IN"
                  international
                  placeholder="Enter mobile number"
                />
                <FieldDescription>
                  Include your country code. Example: +91 98765 43210
                </FieldDescription>
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button
        type="submit"
        form="onboarding-phone-form"
        size="lg"
        className="h-11 w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Continue to dashboard"
        )}
      </Button>
    </div>
  );
}