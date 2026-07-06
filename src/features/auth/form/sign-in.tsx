"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { authClient } from "@/lib/auth-client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPostAuthRedirect } from "@/lib/onboarding";
import { useTransition } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: SignInValues) {
    startTransition(async () => {
      const { data: result, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (
          error.code === "EMAIL_NOT_VERIFIED" ||
          error.message?.toLowerCase().includes("verify")
        ) {
          toast.message("Verify your email to continue.");
          router.push(
            `/auth/verify-email?email=${encodeURIComponent(data.email)}`,
          );
          return;
        }

        toast.error(error.message);
        return;
      }

      const user = result?.user;

      if (!user) {
        router.push("/dashboard/overview");
        return;
      }

      const redirectPath = getPostAuthRedirect({
        emailVerified: user.emailVerified,
        onboardingCompleted: user.onboardingCompleted,
      });

      if (redirectPath === "/auth/verify-email") {
        router.push(
          `/auth/verify-email?email=${encodeURIComponent(user.email)}`,
        );
        return;
      }

      router.push(redirectPath);
    });
  }

  return (
    <div className="space-y-6">
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
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

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto px-0 text-xs"
                  >
                    Forgot password?
                  </Button>
                </div>
                <PasswordInput
                  {...field}
                  id="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-10"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                orientation="horizontal"
                className="items-center"
              >
                <Checkbox
                  id="rememberMe"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="rememberMe" className="font-normal">
                  Keep me signed in on this device
                </FieldLabel>
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button
        type="submit"
        form="form-login"
        size="lg"
        className="h-11 w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-auto px-0 font-medium",
          )}
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
