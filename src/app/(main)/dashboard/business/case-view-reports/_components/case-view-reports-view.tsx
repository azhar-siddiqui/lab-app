import { PageStatsRow } from "@/components/dashboard/page-stats-row";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDisplayDate } from "@/lib/daily-business";
import { formatINR } from "@/lib/format-inr";
import type { CaseViewReportData } from "@/lib/lab-pages-data";
import { BarChart3, ClipboardList, IndianRupee } from "lucide-react";

type CaseViewReportsViewProps = {
  data: CaseViewReportData;
};

export function CaseViewReportsView({ data }: CaseViewReportsViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <Card className="gap-0 py-0">
        <CardContent className="flex w-full items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0 space-y-0.5">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              Reporting period
            </p>
            <p className="font-heading truncate text-base font-semibold">
              {formatDisplayDate(data.dateFrom)} — {formatDisplayDate(data.dateTo)}
            </p>
          </div>
        </CardContent>
      </Card>

      <PageStatsRow
        stats={[
          {
            label: "Total cases",
            value: String(data.totalCases),
            icon: ClipboardList,
          },
          {
            label: "Total billing",
            value: formatINR(data.totalBilling),
            icon: IndianRupee,
          },
          {
            label: "Active doctors",
            value: String(data.byDoctor.length),
            icon: BarChart3,
          },
        ]}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">By doctor</CardTitle>
            <CardDescription>
              Case volume and billing per referring doctor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            {data.byDoctor.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No cases in this period.
              </p>
            ) : (
              data.byDoctor.map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between gap-4 border-b py-3 last:border-0"
                >
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {row.cases} {row.cases === 1 ? "case" : "cases"}
                    </p>
                  </div>
                  <span className="font-medium tabular-nums">
                    {formatINR(row.amount)}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">By test package</CardTitle>
            <CardDescription>
              Most requested packages in the selected period
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            {data.byTestGroup.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-sm">
                No test data in this period.
              </p>
            ) : (
              data.byTestGroup.map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between gap-4 border-b py-3 last:border-0"
                >
                  <p className="font-medium">{row.name}</p>
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {row.cases} {row.cases === 1 ? "case" : "cases"}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}