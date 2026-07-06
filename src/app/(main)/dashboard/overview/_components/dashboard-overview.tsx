import { getDashboardStats } from "@/actions/dashboard/get-dashboard-stats";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowRight,
  FlaskConical,
  Plus,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";
import { formatINR } from "./format-inr";
import { QuickActions } from "./quick-actions";
import { StatCards } from "./stat-cards";

type DashboardOverviewProps = {
  userName?: string | null;
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const statusVariant = {
  Ready: "default",
  Pending: "secondary",
  "In progress": "outline",
} as const;

export async function DashboardOverview({ userName }: DashboardOverviewProps) {
  const stats = await getDashboardStats();
  const firstName = userName?.split(" ")[0] ?? "there";

  const summaryCards = [
    {
      label: "Test packages",
      value: stats.totalTestGroups,
      icon: FlaskConical,
      href: "/test",
    },
    {
      label: "Referral doctors",
      value: stats.totalDoctors,
      icon: Stethoscope,
      href: "/patients/new",
    },
  ] as const;

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-bold tracking-tight">
            {getGreeting()}, {firstName}
          </h2>
          <p className="text-muted-foreground text-sm">
            Here&apos;s what&apos;s happening in your lab today.
          </p>
        </div>
        <Badge variant="outline" className="w-fit gap-1.5 px-3 py-1">
          <Activity className="size-3.5 text-emerald-500" />
          Live overview
        </Badge>
      </div>

      <StatCards
        casesToday={stats.casesToday}
        totalReports={stats.totalReports}
        pendingReports={stats.pendingReports}
        revenueToday={stats.revenueToday}
        totalRevenue={stats.totalRevenue}
        outstandingDues={stats.outstandingDues}
        totalPatients={stats.totalPatients}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <CardTitle>Recent cases</CardTitle>
                <CardDescription>
                  Latest patient reports and their status
                </CardDescription>
              </div>
              <Link
                href="/patients"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1",
                )}
              >
                View all
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </CardHeader>

          {stats.recentCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
              <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
                <Users className="size-6" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">No cases yet</p>
                <p className="text-muted-foreground text-sm">
                  Register your first patient to see activity here.
                </p>
              </div>
              <Link
                href="/patients/new"
                className={buttonVariants({ size: "sm" })}
              >
                <Plus className="mr-2 size-4" />
                New case
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {stats.recentCases.map((report) => (
                <Link
                  key={report.id}
                  href={`/patient-report/${report.id}`}
                  className="hover:bg-muted/40 flex items-center justify-between gap-4 px-4 py-3.5 transition-colors"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="truncate font-medium">{report.patientName}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {report.tests || "No tests assigned"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-medium tabular-nums">
                        {formatINR(report.amount)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(report.reportDate).toLocaleDateString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                    <Badge variant={statusVariant[report.status]}>
                      {report.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <div className="flex flex-col gap-5 lg:gap-6">
          {summaryCards.map((item) => (
            <Link key={item.label} href={item.href} className="block">
              <Card className="gap-0 py-0">
                <CardHeader className="flex-row items-center gap-4 px-5 py-5">
                  <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <item.icon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <CardDescription>{item.label}</CardDescription>
                    <CardTitle className="text-xl tabular-nums">
                      {item.value}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}

          <Card className="from-primary/8 to-card gap-0 border-primary/20 bg-linear-to-br py-0">
            <CardHeader className="space-y-2 px-5 pt-5 pb-0">
              <CardTitle className="text-sm">Need a walkthrough?</CardTitle>
              <CardDescription className="leading-relaxed">
                Review the getting started guide to set up tests and process
                your first case.
              </CardDescription>
            </CardHeader>
            <CardFooter className="px-5 pt-4 pb-5">
              <Link
                href="/getting-started/introduction"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "w-full",
                )}
              >
                Open guide
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <QuickActions />
    </div>
  );
}