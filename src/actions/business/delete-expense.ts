"use server";

import { cacheTags } from "@/lib/cache-tags";
import { toDateKey } from "@/lib/daily-business";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { revalidatePath, revalidateTag } from "next/cache";
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

  revalidateTag(
    cacheTags.expenses(user.id, toDateKey(existing.expenseDate)),
    "max",
  );
  revalidatePath("/dashboard/business/expenses");

  return {
    status: "success",
    message: "Expense deleted successfully",
  };
}