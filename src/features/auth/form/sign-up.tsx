"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LogIn, Mail, ShieldCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof formSchema>;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  name: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  autoComplete?: string;
}

function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  error,
  icon,
  rightElement,
  autoComplete,
}: Readonly<InputFieldProps>) {
  const hasError = Boolean(error);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-[#1a1a2e]"
        style={{ letterSpacing: "-0.01em" }}
      >
        {label}
      </label>

      <div className="relative">
        {/* Left icon */}
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <span
              className={`transition-colors duration-150 ${
                hasError ? "text-[#ef4444]" : "text-[#9ca3af]"
              }`}
            >
              {icon}
            </span>
          </div>
        )}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={[
            "w-full rounded-[10px] border bg-white py-2.5 text-[14px] text-[#1a1a2e] placeholder-[#c0c0cc]",
            "outline-none transition-all duration-150",
            "focus:ring-2 focus:ring-offset-0",
            icon ? "pl-10" : "pl-3.5",
            rightElement ? "pr-11" : "pr-3.5",
            hasError
              ? "border-[#ef4444]/60 focus:border-[#ef4444] focus:ring-[#ef4444]/20"
              : "border-[#e5e5ef] focus:border-[#6366f1] focus:ring-[#6366f1]/20",
          ].join(" ")}
          style={{
            boxShadow: hasError
              ? "0 1px 2px rgba(239,68,68,0.06)"
              : "0 1px 2px rgba(0,0,0,0.04)",
          }}
        />

        {/* Right element (e.g. show/hide password) */}
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            {rightElement}
          </div>
        )}
      </div>

      {/* Error */}
      {hasError && (
        <p
          className="flex items-center gap-1.5 text-[12px] text-[#ef4444]"
          role="alert"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
            <path
              d="M6 4v2.5M6 8.5v.1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: SignInValues): void {
    startTransition(async () => {
      // Replace with your auth call
      console.log("Sign in with:", data);
      await new Promise((r) => setTimeout(r, 1500)); // simulate request
    });
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#f5f5fa] px-4 py-12"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.07) 0%, transparent 70%)",
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-100 overflow-hidden rounded-2xl border border-[#e5e5ef] bg-white"
        style={{
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Top accent */}
        <div className="h-0.5 w-full bg-linear-to-r from-[#6366f1] via-[#818cf8] to-[#a5b4fc]" />

        {/* Header */}
        <div className="px-8 pb-6 pt-8">
          {/* Logo mark */}
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
                boxShadow: "0 2px 8px rgba(99,102,241,0.35)",
              }}
            >
              <ShieldCheck className="h-4.5 w-4.5 text-white" strokeWidth={2} />
            </div>
            <span
              className="text-[15px] font-bold tracking-tight text-[#1a1a2e]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Medicare
            </span>
          </div>

          <h1
            className="text-[22px] font-bold text-[#1a1a2e]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Sign in
          </h1>
          <p className="mt-1 text-[13.5px] text-[#6b7280]">
            to continue to{" "}
            <span className="font-semibold text-[#4f46e5]">
              Medicare Dashboard
            </span>
          </p>
        </div>

        {/* Body */}
        <div className="px-8 pb-8">
          {/* Form */}
          <form
            id="form-login"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-4">
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    id="form-email"
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error?.message}
                    icon={<Mail className="h-4 w-4" />}
                  />
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputField
                    id="form-password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error?.message}
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    }
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="text-[#9ca3af] transition-colors hover:text-[#6366f1]"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                  />
                )}
              />

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between pt-0.5">
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <label className="flex cursor-pointer items-center gap-2.5">
                      {/* Custom checkbox */}
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="form-remember-me"
                          name={field.name}
                          checked={field.value ?? false}
                          onChange={field.onChange}
                          className="sr-only"
                        />
                        <div
                          className={[
                            "flex h-4 w-4 items-center justify-center rounded-[4px] border transition-all duration-150",
                            field.value
                              ? "border-[#6366f1] bg-[#6366f1]"
                              : "border-[#d1d5db] bg-white hover:border-[#6366f1]",
                          ].join(" ")}
                          onClick={() => field.onChange(!field.value)}
                        >
                          {field.value && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2 5l2.5 2.5L8 3"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-[13px] text-[#374151]">
                        Remember me
                      </span>
                    </label>
                  )}
                />

                <button
                  type="button"
                  className="text-[13px] font-medium text-[#6366f1] transition-colors hover:text-[#4f46e5]"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              form="form-login"
              disabled={isPending}
              className={[
                "mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] py-2.5 text-[14px] font-semibold text-white transition-all duration-150",
                isPending
                  ? "cursor-not-allowed opacity-70"
                  : "hover:opacity-90 active:scale-[0.99]",
              ].join(" ")}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
                boxShadow:
                  "0 1px 3px rgba(99,102,241,0.4), 0 4px 12px rgba(99,102,241,0.25)",
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Continue
                </>
              )}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={() => form.reset()}
              disabled={isPending}
              className="mt-3 w-full rounded-[10px] border border-[#e5e5ef] py-2.5 text-[13.5px] font-medium text-[#6b7280] transition-all duration-150 hover:border-[#d0d0e0] hover:bg-[#fafafa] hover:text-[#374151] disabled:opacity-50"
            >
              Reset
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-[13px] text-[#9ca3af]">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-[#6366f1] transition-colors hover:text-[#4f46e5]"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Bottom strip */}
        <div className="flex items-center justify-center gap-1.5 border-t border-[#f0f0f8] bg-[#fafafa] px-8 py-3.5">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[11.5px] text-[#9ca3af]">
            Secured by{" "}
            <span className="font-semibold text-[#6b7280]">Better Auth</span>
          </span>
        </div>
      </div>
    </div>
  );
}
