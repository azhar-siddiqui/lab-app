"use client";

import { AnimateInView } from "@/components/marketing/animate-in-view";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  FileBarChart,
  FlaskConical,
  IndianRupee,
  Printer,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    id: "patients",
    icon: Users,
    title: "Patient & case management",
    description:
      "Register patients with demographics, doctor referrals, test groups, and billing in a single workflow.",
    highlights: ["Quick case entry", "Doctor commission tracking", "Search & filters"],
  },
  {
    id: "tests",
    icon: FlaskConical,
    title: "Test catalog",
    description:
      "Organize test groups, categories, units, and male/female reference ranges in a structured hierarchy.",
    highlights: ["Reference ranges", "Test units", "Category grouping"],
  },
  {
    id: "reports",
    icon: Printer,
    title: "Print-ready reports",
    description:
      "Generate branded pathology reports with multiple header/footer layouts, barcodes, and QR codes.",
    highlights: ["6+ templates", "One-click print", "NABL-ready format"],
  },
  {
    id: "billing",
    icon: IndianRupee,
    title: "Billing & payments",
    description:
      "Track total charges, discounts, and balances per case so your front desk stays on top of collections.",
    highlights: ["Discounts", "Balance tracking", "Daily revenue"],
  },
  {
    id: "dashboard",
    icon: FileBarChart,
    title: "Lab dashboard",
    description:
      "Get a real-time overview of cases, pending reports, and daily business metrics at a glance.",
    highlights: ["KPI cards", "Case status", "Daily overview"],
  },
  {
    id: "security",
    icon: Shield,
    title: "Secure & reliable",
    description:
      "Email/password authentication with encrypted sessions keeps your lab data protected and accessible.",
    highlights: ["Encrypted sessions", "Role-ready", "PostgreSQL backed"],
  },
];

export function FeaturesSection() {
  const [active, setActive] = useState(features[0].id);
  const activeFeature = features.find((f) => f.id === active) ?? features[0];

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateInView className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your lab needs, in one place
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            From patient registration to final report delivery — streamline
            every step of your diagnostic workflow.
          </p>
        </AnimateInView>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:col-span-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {features.map((feature) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setActive(feature.id)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200",
                  active === feature.id
                    ? "border-primary/40 bg-primary/5 shadow-sm"
                    : "border-border/60 bg-card hover:border-primary/20 hover:bg-muted/30",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active === feature.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <feature.icon className="size-4" />
                </span>
                <span className="text-sm font-medium">{feature.title}</span>
              </button>
            ))}
          </div>

          <AnimateInView
            key={activeFeature.id}
            className="lg:col-span-3"
            direction="none"
          >
            <Card className="h-full from-primary/5 to-card bg-gradient-to-br">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-2 flex size-12 items-center justify-center rounded-xl">
                  <activeFeature.icon className="size-6" />
                </div>
                <CardTitle className="text-xl">{activeFeature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {activeFeature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {activeFeature.highlights.map((item) => (
                    <li
                      key={item}
                      className="bg-background/60 flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2.5 text-sm"
                    >
                      <ClipboardList className="text-primary size-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateInView key={feature.id} delay={i * 80}>
              <Card
                className={cn(
                  "h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-md",
                  active === feature.id && "ring-primary/30 ring-2",
                )}
              >
                <CardHeader className="pb-2">
                  <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                    <feature.icon className="text-primary size-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}