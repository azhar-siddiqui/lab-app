"use client";

import { AnimateInView } from "@/components/marketing/animate-in-view";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "For small labs getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Up to 50 cases/month",
      "Patient management",
      "Basic report templates",
      "Email support",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing diagnostic labs",
    monthlyPrice: 2499,
    yearlyPrice: 1999,
    features: [
      "Unlimited cases",
      "All report templates",
      "Billing & doctor tracking",
      "Test catalog management",
      "Priority support",
    ],
    cta: "Get started",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For multi-branch lab networks",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Everything in Professional",
      "Multi-location support",
      "Custom branding",
      "Dedicated onboarding",
      "SLA & phone support",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

function formatPrice(amount: number | null) {
  if (amount === null) return "Custom";
  if (amount === 0) return "Free";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="border-t border-border/60 bg-muted/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateInView className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Pricing
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground mt-4 text-base">
            Start free and scale as your lab grows. No hidden fees.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border/60 bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                !yearly
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                yearly
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span className="ml-1.5 text-xs opacity-90">-20%</span>
            </button>
          </div>
        </AnimateInView>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <AnimateInView
                key={plan.name}
                delay={i * 100}
                className="flex h-full"
              >
                <article
                  className={cn(
                    "flex h-full w-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 sm:p-8",
                    plan.popular
                      ? "border-primary/50 shadow-md ring-2 ring-primary/20 lg:-mt-2 lg:mb-2"
                      : "border-border/60 hover:border-primary/20 hover:shadow-md",
                  )}
                >
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-heading text-lg font-semibold">
                        {plan.name}
                      </h3>
                      {plan.popular && (
                        <Badge className="shrink-0">Most popular</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6 border-b border-border/60 pb-6">
                    <div className="flex items-end gap-1">
                      <span className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                        {formatPrice(price)}
                      </span>
                      {price !== null && price > 0 && (
                        <span className="text-muted-foreground mb-1.5 text-sm">
                          /month
                        </span>
                      )}
                    </div>
                    {yearly && price !== null && price > 0 && (
                      <p className="text-muted-foreground mt-2 text-xs">
                        Billed annually · save 20%
                      </p>
                    )}
                    {price === 0 && (
                      <p className="text-muted-foreground mt-2 text-xs">
                        No credit card required
                      </p>
                    )}
                    {price === null && (
                      <p className="text-muted-foreground mt-2 text-xs">
                        Tailored for your lab network
                      </p>
                    )}
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                      >
                        <span className="bg-primary/10 text-primary mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                          <Check className="size-3" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    {plan.name === "Enterprise" ? (
                      <a
                        href="mailto:medicarepathlogylab@gmail.com"
                        className={buttonVariants({
                          variant: plan.popular ? "default" : "outline",
                          size: "lg",
                          className: "h-11 w-full",
                        })}
                      >
                        {plan.cta}
                      </a>
                    ) : (
                      <Link
                        href="/auth/sign-up"
                        className={buttonVariants({
                          variant: plan.popular ? "default" : "outline",
                          size: "lg",
                          className: "h-11 w-full",
                        })}
                      >
                        {plan.cta}
                      </Link>
                    )}
                  </div>
                </article>
              </AnimateInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}