import type { DailyExpensesData } from "@/lib/expenses";
import { ExpensesDateToolbar } from "./expenses-date-toolbar";
import { ExpensesList } from "./expenses-list";
import { ExpensesStats } from "./expenses-stats";
import { ExpensesSummaryPanel } from "./expenses-summary-panel";

type ExpensesViewProps = {
  data: DailyExpensesData;
};

export function ExpensesView({ data }: ExpensesViewProps) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <ExpensesDateToolbar dateKey={data.dateKey} />

      <ExpensesStats
        totalSpent={data.totalSpent}
        totalEntries={data.totalEntries}
        largestExpense={data.largestExpense}
        topCategory={data.topCategory}
        topCategoryAmount={data.topCategoryAmount}
        averageExpense={data.averageExpense}
      />

      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
        <ExpensesList dateKey={data.dateKey} expenses={data.expenses} />
        <div className="md:col-span-1">
          <ExpensesSummaryPanel
            totalSpent={data.totalSpent}
            totalEntries={data.totalEntries}
            categoryBreakdown={data.categoryBreakdown}
          />
        </div>
      </div>
    </div>
  );
}