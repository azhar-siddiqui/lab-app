import { PageStatsRow } from "@/components/dashboard/page-stats-row";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ArrowRightLeft,
  Building2,
  Clock3,
  IndianRupee,
  Plus,
  Send,
  Sparkles,
  Truck,
} from "lucide-react";
import Link from "next/link";

const plannedFeatures = [
  {
    title: "Partner laboratories",
    description:
      "Maintain a directory of outsource partners with contact details and default rates.",
    icon: Building2,
  },
  {
    title: "Turnaround tracking",
    description:
      "Monitor dispatch dates, expected results, and overdue cases in one view.",
    icon: Clock3,
  },
  {
    title: "Billing reconciliation",
    description:
      "Record partner charges and compare them against patient billing for each case.",
    icon: IndianRupee,
  },
] as const;

type OutsourceStatus = "in-transit" | "processing" | "awaiting-dispatch";

const statusConfig: Record<
  OutsourceStatus,
  { label: string; variant: "default" | "secondary" | "outline"; className?: string }
> = {
  "in-transit": {
    label: "In transit",
    variant: "secondary",
    className: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
  processing: {
    label: "Processing",
    variant: "default",
    className: "bg-primary/10 text-primary",
  },
  "awaiting-dispatch": {
    label: "Awaiting dispatch",
    variant: "outline",
    className: "text-muted-foreground",
  },
};

const previewRows = [
  {
    id: "OS-2401",
    patient: "Rahul Mehta",
    tests: "Histopathology, IHC panel",
    partner: "City Diagnostics",
    dispatched: "04 Jul 2026",
    status: "in-transit" as const,
    eta: "2 days",
  },
  {
    id: "OS-2402",
    patient: "Priya Nair",
    tests: "Genetic screening",
    partner: "Metro Path Lab",
    dispatched: "05 Jul 2026",
    status: "processing" as const,
    eta: "Tomorrow",
  },
  {
    id: "OS-2403",
    patient: "Amit Sharma",
    tests: "Special chemistry panel",
    partner: "Regional Lab",
    dispatched: "—",
    status: "awaiting-dispatch" as const,
    eta: "—",
  },
] as const;

function StatusBadge({ status }: { status: OutsourceStatus }) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn("font-normal", config.className)}>
      {config.label}
    </Badge>
  );
}

export function OutsourceView() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <Card className="gap-0 overflow-hidden border-dashed py-0">
        <CardContent className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
              <ArrowRightLeft className="size-5" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-lg font-semibold tracking-tight">
                  Outsource case management
                </h3>
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="size-3" />
                  Coming soon
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
                Send selected tests to partner laboratories, track progress, and
                reconcile outsourced billing without leaving your lab workflow.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
            <Link href="/patients/new" className={buttonVariants({ size: "sm" })}>
              <Plus className="size-4" />
              Register a case
            </Link>
            <Link
              href="/patients"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              View patients
            </Link>
          </div>
        </CardContent>
      </Card>

      <PageStatsRow
        stats={[
          { label: "Active outsource cases", value: "3", icon: Send },
          { label: "In transit", value: "1", icon: Truck },
          { label: "Partner laboratories", value: "3", icon: Building2 },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plannedFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.title} className="gap-0 py-0">
              <CardHeader className="px-5 py-5">
                <div className="bg-primary/10 text-primary mb-3 flex size-9 items-center justify-center rounded-lg">
                  <Icon className="size-4" />
                </div>
                <CardTitle className="text-sm font-semibold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card className="gap-0 overflow-hidden py-0">
        <CardHeader className="gap-3 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">
              Workspace preview
            </CardTitle>
            <CardDescription>
              Sample layout for tracking outsourced cases once the module is
              live.
            </CardDescription>
          </div>
          <Badge variant="outline" className="w-fit shrink-0 font-normal">
            Sample data
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-11 px-5">Case ID</TableHead>
                  <TableHead className="h-11 px-5">Patient</TableHead>
                  <TableHead className="h-11 px-5">Tests</TableHead>
                  <TableHead className="h-11 px-5">Partner lab</TableHead>
                  <TableHead className="h-11 px-5">Dispatched</TableHead>
                  <TableHead className="h-11 px-5">Status</TableHead>
                  <TableHead className="h-11 px-5 text-right">ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="px-5 font-medium tabular-nums">
                      {row.id}
                    </TableCell>
                    <TableCell className="px-5">{row.patient}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate px-5">
                      {row.tests}
                    </TableCell>
                    <TableCell className="text-muted-foreground px-5">
                      {row.partner}
                    </TableCell>
                    <TableCell className="text-muted-foreground px-5 tabular-nums">
                      {row.dispatched}
                    </TableCell>
                    <TableCell className="px-5">
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground px-5 text-right tabular-nums">
                      {row.eta}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="divide-y md:hidden">
            {previewRows.map((row) => (
              <div key={row.id} className="space-y-3 px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <p className="font-medium">{row.patient}</p>
                    <p className="text-muted-foreground text-xs tabular-nums">
                      {row.id}
                    </p>
                  </div>
                  <StatusBadge status={row.status} />
                </div>
                <div className="text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <p className="text-foreground/70 mb-0.5 font-medium">Tests</p>
                    <p>{row.tests}</p>
                  </div>
                  <div>
                    <p className="text-foreground/70 mb-0.5 font-medium">
                      Partner lab
                    </p>
                    <p>{row.partner}</p>
                  </div>
                  <div>
                    <p className="text-foreground/70 mb-0.5 font-medium">
                      Dispatched
                    </p>
                    <p>{row.dispatched}</p>
                  </div>
                  <div>
                    <p className="text-foreground/70 mb-0.5 font-medium">ETA</p>
                    <p>{row.eta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 text-muted-foreground border-t px-5 py-3.5 text-xs leading-relaxed">
            Outsource tracking is under development. Your existing patient and
            report workflows remain unchanged.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}