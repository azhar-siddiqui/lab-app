import { ExpenseCategory } from "@/generated/prisma/enums";
import { z } from "zod";

export const expenseFormSchema = z.object({
  title: z.string().min(2, "Title is required"),
  amount: z
    .number({ error: "Amount is required" })
    .positive("Amount must be greater than zero"),
  category: z.enum(ExpenseCategory),
  expenseDate: z.date(),
  notes: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;