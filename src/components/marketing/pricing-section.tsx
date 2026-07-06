"use client";

import { AnimateInView } from "@/components/marketing/animate-in-view";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card p-1">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
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
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                yearly
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span className="ml-1 text-xs opacity-80">-20%</span>
            </button>
          </div>
        </AnimateInView>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <AnimateInView key={plan.name} delay={i * 100}>
                <Card
                  className={cn(
                    "relative h-full transition-transform duration-200 hover:-translate-y-1",
                    plan.popular && "ring-primary shadow-lg ring-2",
                  )}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="font-heading text-4xl font-bold">
                        {formatPrice(price)}
                      </span>
                      {price !== null && price > 0 && (
                        <span className="text-muted-foreground text-sm">
                          /mo
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <Check className="text-primary mt-0.5 size-4 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {plan.name === "Enterprise" ? (
                      <a
                        href="mailto:medicarepathlogylab@gmail.com"
                        className={buttonVariants({
                          variant: plan.popular ? "default" : "outline",
                          className: "w-full",
                        })}
                      >
                        {plan.cta}
                      </a>
                    ) : (
                      <Link
                        href="/auth/sign-up"
                        className={buttonVariants({
                          variant: plan.popular ? "default" : "outline",
                          className: "w-full",
                        })}
                      >
                        {plan.cta}
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              </AnimateInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}