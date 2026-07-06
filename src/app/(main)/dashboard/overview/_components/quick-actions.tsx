import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen, FlaskConical, Plus, Users } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    title: "New case",
    description: "Register a patient and assign tests",
    href: "/patients/new",
    icon: Plus,
    variant: "default" as const,
  },
  {
    title: "All patients",
    description: "Search cases, bills, and balances",
    href: "/patients",
    icon: Users,
    variant: "outline" as const,
  },
  {
    title: "Test catalog",
    description: "Manage packages, categories, and units",
    href: "/test",
    icon: FlaskConical,
    variant: "outline" as const,
  },
  {
    title: "Getting started",
    description: "Learn the lab workflow step by step",
    href: "/getting-started/introduction",
    icon: BookOpen,
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-heading text-base font-semibold">Quick actions</h3>
        <p className="text-muted-foreground text-sm">
          Jump into the tasks you use most often.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Card key={action.href}>
            <CardHeader className="pb-3">
              <div className="bg-primary/10 text-primary mb-3 flex size-9 items-center justify-center rounded-lg">
                <action.icon className="size-4" />
              </div>
              <CardTitle className="text-sm">{action.title}</CardTitle>
              <CardDescription className="text-xs">
                {action.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link
                href={action.href}
                className={cn(
                  buttonVariants({ variant: action.variant, size: "sm" }),
                  "w-full",
                )}
              >
                Open
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}