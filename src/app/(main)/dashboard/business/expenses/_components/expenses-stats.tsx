"use client";

import { AnimatedNumber } from "@/components/dashboard/animated-number";
import {
  StatCardsGrid,
  type StatCardConfig,
} from "@/components/dashboard/stat-cards-grid";
import type { DailyExpensesData } from "@/lib/expenses";
import { expenseCategoryLabels } from "@/lib/expenses";
import { formatAnimatedINR, formatINR } from "@/lib/format-inr";
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

export function ExpensesStats({
  totalSpent,
  totalEntries,
  largestExpense,
  topCategory,
  topCategoryAmount,
  averageExpense,
}: ExpensesStatsProps) {
  const cards: StatCardConfig[] = [
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

  return <StatCardsGrid cards={cards} />;
}