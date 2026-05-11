"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const TEP_PASSWORD = "Admin@1234";

const formSchema = z.object({
  name: z.string().min(1, { message: "name required" }).trim(),
  email: z.email("Please enter a valid email address.").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters.")
    .trim(),
});

type SignInValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "azhar",
      email: "azhar1@medicare.com",
      password: TEP_PASSWORD,
    },
  });

  function onSubmit(data: SignInValues): void {
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
    <Card className="w-full space-y-6 max-w-87.5">
      <CardHeader className="flex flex-col items-center w-full space-y-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Sign Up
        </CardTitle>
        <CardDescription>
          Create your account{" "}
          <span className="font-semibold text-primary">Medicare Dashboard</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-sign-up" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Jhon Doe"
                    className="h-8.5"
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
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="example@email.com"
                    className="h-8.5"
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
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="********"
                    className="h-8.5"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Field>
          <Button
            type="submit"
            form="form-sign-up"
            size="lg"
            disabled={isPending}
          >
            Continue
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            size="lg"
          >
            Reset
          </Button>
        </Field>
        <p className="mt-6 text-center text-sm text-accent-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
