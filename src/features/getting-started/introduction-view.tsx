import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  bestPractices,
  modules,
  workflowSteps,
} from "@/features/getting-started/introduction-content";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, FlaskConical, Sparkles } from "lucide-react";
import Link from "next/link";

type IntroductionViewProps = {
  userName?: string | null;
};

export function IntroductionView({ userName }: IntroductionViewProps) {
  const greeting = userName ? `Welcome, ${userName.split(" ")[0]}` : "Welcome";

  return (
    <PageContainer
      pageTitle="Introduction"
      pageDescription="Learn how MedicareLab helps you run your pathology lab from case registration to final report delivery."
    >
      <div className="mx-auto flex w-full flex-col gap-8 pb-10">
        <Card className="from-primary/8 via-primary/3 to-card overflow-hidden border-primary/20 bg-linear-to-br">
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="space-y-3">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="size-3" />
                Getting started
              </Badge>
              <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                {greeting} to MedicareLab
              </h3>
              <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base">
                MedicareLab is your pathology laboratory management portal. It
                brings patient registration, test catalog management, result
                entry, billing, and branded printable reports into one secure
                workspace — so your team can focus on accurate diagnostics.
              </p>
            </div>
            <div className="bg-primary/10 text-primary flex size-20 shrink-0 items-center justify-center self-start rounded-2xl sm:self-center">
              <FlaskConical className="size-10" />
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold">
              Quick start workflow
            </h3>
            <p className="text-muted-foreground text-sm">
              Follow these four steps to process your first case end to end.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {workflowSteps.map((item) => (
              <Card
                key={item.step}
                className="group transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                      <item.icon className="size-5" />
                    </div>
                    <span className="text-muted-foreground font-heading text-xs font-semibold">
                      Step {item.step}
                    </span>
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-1.5",
                    )}
                  >
                    Go to module
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold">
              Application modules
            </h3>
            <p className="text-muted-foreground text-sm">
              Explore the core areas of MedicareLab and what each one is for.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Link key={module.title} href={module.href} className="group">
                <Card className="h-full transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <CardHeader>
                    <div className="bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary mb-1 flex size-10 items-center justify-center rounded-lg transition-colors">
                      <module.icon className="size-5" />
                    </div>
                    <CardTitle className="text-base">{module.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Best practices</CardTitle>
              <CardDescription>
                Recommendations for accurate reports and smooth daily
                operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bestPractices.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <CheckCircle2 className="text-primary mt-0.5 size-4 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="from-muted/40 to-card bg-linear-to-br">
            <CardHeader>
              <CardTitle className="text-base">Need help?</CardTitle>
              <CardDescription>
                Our team is here to support your laboratory operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide">
                  Email
                </p>
                <a
                  href="mailto:medicarepathlogylab@gmail.com"
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  medicarepathlogylab@gmail.com
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide">
                  Location
                </p>
                <p className="leading-relaxed">
                  Kabir Nagar, Phulambri, Aurangabad — 431111
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide">
                  Tagline
                </p>
                <p className="text-muted-foreground italic leading-relaxed">
                  Precision in every test, care in every result.
                </p>
              </div>
              <Link
                href="/patients/new"
                className={buttonVariants({ className: "w-full gap-2" })}
              >
                Register your first case
                <ArrowRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageContainer>
  );
}
