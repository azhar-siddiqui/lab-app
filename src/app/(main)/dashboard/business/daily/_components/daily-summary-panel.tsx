import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { DailyBusinessData } from "@/lib/daily-business";
import { formatINR } from "@/lib/format-inr";
import { PieChart } from "lucide-react";

type DailySummaryPanelProps = Pick<
  DailyBusinessData,
  | "totalCases"
  | "grossBilling"
  | "totalDiscount"
  | "netBilling"
  | "totalReceived"
  | "totalDue"
>;

function SummaryRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span
        className={
          emphasis
            ? "font-heading text-base font-semibold tabular-nums"
            : "text-sm font-medium tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function DailySummaryPanel({
  totalCases,
  grossBilling,
  totalDiscount,
  netBilling,
  totalReceived,
  totalDue,
}: DailySummaryPanelProps) {
  const collectionRate =
    netBilling > 0 ? Math.round((totalReceived / netBilling) * 100) : 0;

  return (
    <Card className="h-full min-h-full gap-0 py-0">
      <CardHeader className="border-b px-5 py-5">
        <div className="bg-primary/10 text-primary mb-3 flex size-10 w-fit items-center justify-center rounded-lg">
          <PieChart className="size-5" />
        </div>
        <CardTitle className="text-base">Day summary</CardTitle>
        <CardDescription>
          Financial breakdown for {totalCases}{" "}
          {totalCases === 1 ? "case" : "cases"}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-2">
        <SummaryRow label="Gross billing" value={formatINR(grossBilling)} />
        <SummaryRow label="Discount" value={formatINR(totalDiscount)} />
        <Separator />
        <SummaryRow label="Net billing" value={formatINR(netBilling)} emphasis />
        <SummaryRow label="Amount received" value={formatINR(totalReceived)} />
        <SummaryRow label="Outstanding due" value={formatINR(totalDue)} emphasis />
        <Separator />
        <SummaryRow
          label="Collection rate"
          value={netBilling > 0 ? `${collectionRate}%` : "—"}
        />
      </CardContent>
    </Card>
  );
}