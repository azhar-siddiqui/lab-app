"use client";

import { useTransition } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import { Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [isPending, startTransition] = useTransition();

  function handleResend() {
    if (!email) {
      toast.error("Enter your email on the sign-in page to resend verification.");
      return;
    }

    startTransition(async () => {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: `${window.location.origin}/auth/onboarding/phone`,
      });

      if (error) {
        toast.error(error.message ?? "Could not resend verification email.");
        return;
      }

      toast.success("Verification email sent. Check your inbox.");
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-muted/20 p-5 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <MailCheck className="size-6 text-primary" />
        </div>

        <p className="text-sm text-muted-foreground">
          We sent a verification link to
        </p>
        <p className="mt-1 font-medium break-all">
          {email || "your email address"}
        </p>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p>Open the link in your email to verify your account.</p>
        <p>After verification, you&apos;ll continue with your mobile number.</p>
      </div>

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 w-full"
        disabled={isPending || !email}
        onClick={handleResend}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Resend verification email"
        )}
      </Button>
    </div>
  );
}