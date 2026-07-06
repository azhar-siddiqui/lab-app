"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
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
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters.")
    .trim(),
  email: z.email("Please enter a valid email address.").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters.")
    .trim(),
});

type SignUpValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignUpValues): void {
    startTransition(async () => {
      const { error } = await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            redirect("/dashboard");
          },
        },
      );

      if (error) {
        toast.error(error.message);
      }
    });
  }

  return (
    <div className="space-y-6">
      <form id="form-sign-up" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  autoComplete="name"
                  placeholder="Dr. Azhar Siddiqui"
                  className="h-10"
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Work email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@medicarelab.com"
                  className="h-10"
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <PasswordInput
                  {...field}
                  id="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className="h-10"
                />
                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <p className="text-muted-foreground text-xs">
                  Use 8 or more characters with a mix of letters and numbers.
                </p>
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button
        type="submit"
        form="form-sign-up"
        size="lg"
        className="h-11 w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
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