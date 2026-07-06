"use server";

import { toDateKey } from "@/lib/daily-business";
import { invalidateLabData } from "@/lib/invalidate-lab-cache";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { expenseFormSchema, ExpenseFormValues } from "@/validation/expense-form";

import { unauthorized } from "next/navigation";

export async function updateExpense(
  expenseId: string,
  values: ExpenseFormValues,
): Promise<ApiResponse> {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const parsed = expenseFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid expense data",
    };
  }

  const existing = await prisma.expense.findFirst({
    where: { id: expenseId, userId: user.id },
    select: { expenseDate: true },
  });

  if (!existing) {
    return { status: "error", message: "Expense not found" };
  }

  const data = parsed.data;

  await prisma.expense.update({
    where: { id: expenseId },
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      notes: data.notes,
      expenseDate: data.expenseDate,
    },
  });

  invalidateLabData(user.id, {
    dateKeys: [
      toDateKey(existing.expenseDate),
      toDateKey(data.expenseDate),
    ],
    paths: ["/dashboard/business/expenses"],
  });

  return {
    status: "success",
    message: "Expense updated successfully",
  };
}