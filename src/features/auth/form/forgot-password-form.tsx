"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

type ForgotPasswordValues = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordValues) {
    startTransition(async () => {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast.error(error.message ?? "Could not send password reset email.");
        return;
      }

      setSubmittedEmail(data.email);
      toast.success("If an account exists, a reset link has been sent.");
    });
  }

  if (submittedEmail) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border bg-muted/20 p-5 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
            <KeyRound className="size-6 text-primary" />
          </div>

          <p className="text-sm text-muted-foreground">
            If an account exists for
          </p>
          <p className="mt-1 font-medium break-all">{submittedEmail}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            we sent a password reset link. The link expires in 1 hour.
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive it? Check spam or{" "}
          <button
            type="button"
            className="text-foreground font-medium hover:underline"
            onClick={() => setSubmittedEmail(null)}
          >
            try again
          </button>
          .
        </p>

        <Link
          href="/auth/sign-in"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 w-full",
          )}
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form id="form-forgot-password" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@medicarelab.com"
                  className="h-10"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button
        type="submit"
        form="form-forgot-password"
        size="lg"
        className="h-11 w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending reset link...
          </>
        ) : (
          "Send reset link"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        Remember your password?{" "}
        <Link
          href="/auth/sign-in"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-auto px-0 font-medium",
          )}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}