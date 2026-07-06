"use server";

import { toDateKey } from "@/lib/daily-business";
import { invalidateLabData } from "@/lib/invalidate-lab-cache";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";

import { unauthorized } from "next/navigation";

export async function deleteExpense(expenseId: string): Promise<ApiResponse> {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return unauthorized();

  const existing = await prisma.expense.findFirst({
    where: { id: expenseId, userId: user.id },
    select: { expenseDate: true },
  });

  if (!existing) {
    return { status: "error", message: "Expense not found" };
  }

  await prisma.expense.delete({
    where: { id: expenseId },
  });

  invalidateLabData(user.id, {
    dateKeys: [toDateKey(existing.expenseDate)],
    paths: ["/dashboard/business/expenses"],
  });

  return {
    status: "success",
    message: "Expense deleted successfully",
  };
}