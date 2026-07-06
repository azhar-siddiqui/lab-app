import { ExpenseCategory } from "@/generated/prisma/enums";

export type ExpenseItem = {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  notes: string | null;
  expenseDate: string;
};

export type ExpenseCategoryTotal = {
  category: ExpenseCategory;
  label: string;
  amount: number;
  count: number;
};

export type DailyExpensesData = {
  dateKey: string;
  totalSpent: number;
  totalEntries: number;
  largestExpense: number;
  topCategory: ExpenseCategory | null;
  topCategoryAmount: number;
  averageExpense: number;
  categoryBreakdown: ExpenseCategoryTotal[];
  expenses: ExpenseItem[];
};

export const expenseCategoryLabels: Record<ExpenseCategory, string> = {
  Reagents: "Reagents & consumables",
  Utilities: "Utilities",
  Salaries: "Salaries & wages",
  Equipment: "Equipment",
  Maintenance: "Maintenance",
  Transport: "Transport",
  Other: "Other",
};

export const expenseCategoryOptions = Object.entries(expenseCategoryLabels).map(
  ([value, label]) => ({
    value: value as ExpenseCategory,
    label,
  }),
);