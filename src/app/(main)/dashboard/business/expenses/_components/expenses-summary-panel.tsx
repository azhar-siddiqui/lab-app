import { SummaryRow } from "@/components/dashboard/summary-row";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ExpenseCategoryTotal } from "@/lib/expenses";
import { formatINR } from "@/lib/format-inr";
import { PieChart } from "lucide-react";

type ExpensesSummaryPanelProps = {
  totalSpent: number;
  totalEntries: number;
  categoryBreakdown: ExpenseCategoryTotal[];
};

export function ExpensesSummaryPanel({
  totalSpent,
  totalEntries,
  categoryBreakdown,
}: ExpensesSummaryPanelProps) {
  return (
    <Card className="h-full min-h-full gap-0 py-0">
      <CardHeader className="border-b px-5 py-5">
        <div className="bg-primary/10 text-primary mb-3 flex size-10 w-fit items-center justify-center rounded-lg">
          <PieChart className="size-5" />
        </div>
        <CardTitle className="text-base">Category breakdown</CardTitle>
        <CardDescription>
          Spend distribution across {totalEntries}{" "}
          {totalEntries === 1 ? "entry" : "entries"}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-2">
        {categoryBreakdown.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No expenses recorded for this date.
          </p>
        ) : (
          <>
            {categoryBreakdown.map((item) => {
              const share =
                totalSpent > 0
                  ? Math.round((item.amount / totalSpent) * 100)
                  : 0;

              return (
                <div key={item.category} className="py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.label}</p>
                      <p className="text-muted-foreground text-xs">
                        {item.count} {item.count === 1 ? "entry" : "entries"} ·{" "}
                        {share}%
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium tabular-nums">
                      {formatINR(item.amount)}
                    </span>
                  </div>
                </div>
              );
            })}
            <Separator />
            <SummaryRow
              label="Total spent"
              value={formatINR(totalSpent)}
              emphasis
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}