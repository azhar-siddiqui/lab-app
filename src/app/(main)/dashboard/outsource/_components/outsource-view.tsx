import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRightLeft,
  Building2,
  Clock3,
  FileText,
  IndianRupee,
  Plus,
} from "lucide-react";
import Link from "next/link";

const plannedFeatures = [
  {
    title: "Partner laboratories",
    description: "Maintain a directory of outsource partners with contact details and default rates.",
    icon: Building2,
  },
  {
    title: "Turnaround tracking",
    description: "Monitor dispatch dates, expected results, and overdue cases in one view.",
    icon: Clock3,
  },
  {
    title: "Billing reconciliation",
    description: "Record partner charges and compare them against patient billing for each case.",
    icon: IndianRupee,
  },
] as const;

const previewRows = [
  { patient: "Sample case A", partner: "City Diagnostics", status: "In transit", due: "2 days" },
  { patient: "Sample case B", partner: "Metro Path Lab", status: "Processing", due: "Tomorrow" },
  { patient: "Sample case C", partner: "Regional Lab", status: "Awaiting dispatch", due: "—" },
] as const;

export function OutsourceView() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <Card className="from-primary/8 to-card gap-0 overflow-hidden border-primary/20 bg-linear-to-br py-0">
        <CardContent className="flex flex-col gap-6 px-5 py-6 sm:px-6 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <Badge variant="secondary" className="w-fit">
              Coming soon
            </Badge>
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-semibold tracking-tight">
                Outsource case management
              </h3>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                Send selected tests to partner laboratories, track progress, and
                reconcile outsourced billing without leaving your lab workflow.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/patients/new" className={buttonVariants({ size: "sm" })}>
                <Plus className="mr-2 size-4" />
                Register a case
              </Link>
              <Link
                href="/patients"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View patients
              </Link>
            </div>
          </div>

          <div className="bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center rounded-2xl lg:size-20">
            <ArrowRightLeft className="size-8 lg:size-9" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plannedFeatures.map((feature) => (
          <Card key={feature.title} className="h-full gap-0 py-0">
            <CardHeader className="px-5 py-5">
              <div className="bg-muted text-muted-foreground mb-3 flex size-10 items-center justify-center rounded-lg">
                <feature.icon className="size-5" />
              </div>
              <CardTitle className="text-base">{feature.title}</CardTitle>
              <CardDescription className="leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="gap-0 py-0">
        <CardHeader className="gap-1 border-b px-5 py-5">
          <CardTitle className="text-base">Workspace preview</CardTitle>
          <CardDescription>
            A glimpse of how outsourced cases will appear once this module is live.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="hidden md:block">
            <div className="border-b bg-muted/30 px-5 py-3">
              <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.6fr] gap-4 text-sm font-medium">
                <span>Patient case</span>
                <span>Partner lab</span>
                <span>Status</span>
                <span className="text-right">ETA</span>
              </div>
            </div>
            <div className="divide-y">
              {previewRows.map((row) => (
                <div
                  key={row.patient}
                  className="grid grid-cols-[1.4fr_1fr_0.8fr_0.6fr] items-center gap-4 px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                      <FileText className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium">{row.patient}</p>
                      <p className="text-muted-foreground text-xs">Preview row</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{row.partner}</p>
                  <Badge variant="outline">{row.status}</Badge>
                  <p className="text-muted-foreground text-right text-sm tabular-nums">
                    {row.due}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="divide-y md:hidden">
            {previewRows.map((row) => (
              <div key={row.patient} className="space-y-3 px-4 py-4 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <p className="font-medium">{row.patient}</p>
                    <p className="text-muted-foreground text-xs">{row.partner}</p>
                  </div>
                  <Badge variant="outline">{row.status}</Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  Expected turnaround: {row.due}
                </p>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "border-t px-5 py-4",
              "bg-muted/20 text-muted-foreground text-center text-sm",
            )}
          >
            Outsource tracking is under development. Your existing patient and
            report workflows remain unchanged.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}