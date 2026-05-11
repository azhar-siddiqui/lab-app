"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { authClient } from "@/lib/auth-client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
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

const TEP_PASSWORD = "Admin@1234";

type SignInValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "azhar1@medicare.com",
      password: TEP_PASSWORD,
      rememberMe: false,
    },
  });

  function onSubmit(data: SignInValues) {
    startTransition(async () => {
      const { error } = await authClient.signIn.email(
        {
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
          Sign In
        </CardTitle>
        <CardDescription>
          Sign in to continue to{" "}
          <span className="font-semibold text-primary">Medicare Dashboard</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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

            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <Checkbox
                    id="rememberMe"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="hidden sm:block"
                  />
                  <FieldLabel htmlFor="rememberMe" className="hidden sm:block">
                    Remember me
                  </FieldLabel>

                  <Button type="button" variant="link" className="pl-0 sm:pl-2">
                    Forgot password?
                  </Button>
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
            form="form-login"
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
          Don't have an account ?{" "}
          <Link
            href="/auth/sign-up"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
