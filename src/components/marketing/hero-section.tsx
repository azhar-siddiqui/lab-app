"use client";

import { AnimateInView } from "@/components/marketing/animate-in-view";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { InteractiveGridPattern } from "@/features/auth/_components/interactive-grid";
import { cn } from "@/lib/utils";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="from-primary/8 via-background to-background absolute inset-0 bg-gradient-to-b" />
        <div className="bg-primary/10 absolute -top-40 right-0 size-[500px] rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-20 -left-20 size-[400px] rounded-full blur-3xl" />
        <InteractiveGridPattern
          squares={[32, 18]}
          className={cn(
            "mask-[radial-gradient(600px_circle_at_center,white,transparent)] opacity-40",
            "inset-x-0 top-0 h-[600px] skew-y-6",
          )}
          squaresClassName="stroke-primary/10 hover:fill-primary/5"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <AnimateInView>
              <Badge variant="secondary" className="mb-6 px-3 py-1">
                Laboratory management, simplified
              </Badge>
            </AnimateInView>

            <AnimateInView delay={100}>
              <h1 className="font-heading text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-[3.25rem]">
                Run your pathology lab with{" "}
                <span className="text-primary relative">
                  confidence
                  <span className="bg-primary/30 absolute -bottom-1 left-0 h-1 w-full rounded-full" />
                </span>
              </h1>
            </AnimateInView>

            <AnimateInView delay={200}>
              <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
                MedicareLab helps you manage patients, test catalogs, billing,
                and branded printable reports — all in one secure, modern
                portal built for diagnostic labs.
              </p>
            </AnimateInView>

            <AnimateInView delay={300}>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/auth/sign-up"
                  className={buttonVariants({ size: "lg", className: "gap-2 px-6" })}
                >
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#reports"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "gap-2 px-6",
                  })}
                >
                  <Play className="size-4" />
                  See it in action
                </a>
              </div>
            </AnimateInView>

            <AnimateInView delay={400}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
                {["No credit card", "Print-ready reports", "NABL formatting"].map(
                  (item) => (
                    <span
                      key={item}
                      className="text-muted-foreground flex items-center gap-2 text-sm"
                    >
                      <span className="bg-primary size-1.5 rounded-full" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </AnimateInView>
          </div>

          <AnimateInView delay={200} direction="left" className="w-full">
            <DashboardPreview />
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}