import { AnimateInView } from "@/components/marketing/animate-in-view";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateInView>
          <div className="from-primary/10 via-primary/5 to-background relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="bg-primary/10 absolute -top-20 -right-20 size-60 rounded-full blur-3xl" />
            <div className="bg-primary/5 absolute -bottom-16 -left-16 size-48 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to modernize your lab?
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-base leading-relaxed">
                Join pathology labs using MedicareLab to deliver accurate
                reports faster. Start free — no credit card required.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/auth/sign-up"
                  className={buttonVariants({ size: "lg", className: "gap-2 px-8" })}
                >
                  Create your account
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/auth/sign-in"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "px-8",
                  })}
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}