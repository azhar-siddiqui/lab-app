"use client";

import { AnimatedNumber } from "@/app/(main)/dashboard/overview/_components/animated-number";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DailyExpensesData } from "@/lib/expenses";
import { expenseCategoryLabels } from "@/lib/expenses";
import { formatINR } from "@/lib/format-inr";
import {
  Calculator,
  IndianRupee,
  Receipt,
  Tags,
} from "lucide-react";

type ExpensesStatsProps = Pick<
  DailyExpensesData,
  | "totalSpent"
  | "totalEntries"
  | "largestExpense"
  | "topCategory"
  | "topCategoryAmount"
  | "averageExpense"
>;

function formatAnimatedINR(amount: number, target: number) {
  const rounded = Math.round(amount);
  const useCompact = rounded >= target && target >= 1_000;
  return formatINR(rounded, useCompact);
}

export function ExpensesStats({
  totalSpent,
  totalEntries,
  largestExpense,
  topCategory,
  topCategoryAmount,
  averageExpense,
}: ExpensesStatsProps) {
  const cards = [
    {
      label: "Total spent",
      value: (
        <AnimatedNumber
          value={totalSpent}
          delay={0}
          format={(n) => formatAnimatedINR(n, totalSpent)}
        />
      ),
      footer: `${totalEntries} ${totalEntries === 1 ? "entry" : "entries"} recorded`,
      icon: IndianRupee,
      badge: formatINR(totalSpent),
    },
    {
      label: "Expense entries",
      value: (
        <AnimatedNumber
          value={totalEntries}
          delay={100}
          format={(n) => Math.round(n).toString()}
        />
      ),
      footer: "Items logged for this date",
      icon: Receipt,
      badge: totalEntries === 1 ? "1 entry" : `${totalEntries} entries`,
    },
    {
      label: "Top category",
      value: (
        <span className="text-xl font-semibold @[250px]/card:text-2xl">
          {topCategory ? expenseCategoryLabels[topCategory] : "—"}
        </span>
      ),
      footer: topCategory
        ? `${formatINR(topCategoryAmount)} spent`
        : "No category data yet",
      icon: Tags,
      badge: topCategory ? formatINR(topCategoryAmount) : "No spend",
    },
    {
      label: "Average expense",
      value: (
        <AnimatedNumber
          value={averageExpense}
          delay={300}
          format={(n) => formatAnimatedINR(n, averageExpense)}
        />
      ),
      footer:
        largestExpense > 0
          ? `Largest: ${formatINR(largestExpense)}`
          : "No expenses recorded",
      icon: Calculator,
      badge: largestExpense > 0 ? formatINR(largestExpense) : "—",
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="@container/card">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <card.icon className="size-3.5" />
                {card.badge}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-muted-foreground text-sm">
            {card.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}