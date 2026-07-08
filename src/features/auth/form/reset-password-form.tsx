"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100, "Password must be at most 100 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ResetPasswordValues) {
    if (!token) {
      toast.error("Reset link is invalid or has expired.");
      return;
    }

    startTransition(async () => {
      const { error: resetError } = await authClient.resetPassword({
        newPassword: data.password,
        token,
      });

      if (resetError) {
        toast.error(
          resetError.message ?? "Could not reset password. Request a new link.",
        );
        return;
      }

      toast.success("Password updated. Sign in with your new password.");
      router.push("/auth/sign-in");
    });
  }

  if (error === "INVALID_TOKEN" || !token) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertCircle className="size-6 text-destructive" />
          </div>
          <p className="font-medium">This reset link is invalid or expired</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Request a new password reset email to continue.
          </p>
        </div>

        <Link
          href="/auth/forgot-password"
          className={cn(buttonVariants({ size: "lg" }), "h-11 w-full")}
        >
          Request new reset link
        </Link>

        <p className="text-muted-foreground text-center text-sm">
          <Link
            href="/auth/sign-in"
            className={cn(
              buttonVariants({ variant: "link" }),
              "h-auto px-0 font-medium",
            )}
          >
            Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form id="form-reset-password" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <PasswordInput
                  {...field}
                  id="password"
                  autoComplete="new-password"
                  placeholder="Enter a new password"
                  className="h-10"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm new password
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Re-enter your new password"
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
        form="form-reset-password"
        size="lg"
        className="h-11 w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Updating password...
          </>
        ) : (
          "Update password"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        <Link
          href="/auth/sign-in"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-auto px-0 font-medium",
          )}
        >
          Back to sign in
        </Link>
      </p>
    </div>
  );
}