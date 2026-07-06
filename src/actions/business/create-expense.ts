"use server";

import { cacheTags } from "@/lib/cache-tags";
import { toDateKey } from "@/lib/daily-business";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { expenseFormSchema, ExpenseFormValues } from "@/validation/expense-form";
import { revalidatePath, revalidateTag } from "next/cache";
import { unauthorized } from "next/navigation";

export async function createExpense(
  values: ExpenseFormValues,
): Promise<ApiResponse<{ id: string }>> {
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

  const data = parsed.data;

  const expense = await prisma.expense.create({
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      notes: data.notes,
      expenseDate: data.expenseDate,
      userId: user.id,
    },
  });

  const dateKey = toDateKey(data.expenseDate);
  revalidateTag(cacheTags.expenses(user.id, dateKey), "max");
  revalidatePath("/dashboard/business/expenses");

  return {
    status: "success",
    message: "Expense added successfully",
    data: { id: expense.id },
  };
}