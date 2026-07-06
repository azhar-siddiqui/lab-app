"use client";

import { createExpense } from "@/actions/business/create-expense";
import { updateExpense } from "@/actions/business/update-expense";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { parseDateKey } from "@/lib/daily-business";
import {
  expenseCategoryOptions,
  type ExpenseItem,
} from "@/lib/expenses";
import { cn } from "@/lib/utils";
import { tryCatch } from "@/utils/try-catch";
import {
  expenseFormSchema,
  type ExpenseFormValues,
} from "@/validation/expense-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type ExpenseFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateKey: string;
  expense?: ExpenseItem | null;
};

export function ExpenseFormDialog({
  open,
  onOpenChange,
  dateKey,
  expense,
}: ExpenseFormDialogProps) {
  const [pending, startTransition] = useTransition();
  const isEdit = Boolean(expense);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: "Other",
      expenseDate: parseDateKey(dateKey),
      notes: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (expense) {
      form.reset({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        expenseDate: new Date(expense.expenseDate),
        notes: expense.notes ?? "",
      });
      return;
    }

    form.reset({
      title: "",
      amount: 0,
      category: "Other",
      expenseDate: parseDateKey(dateKey),
      notes: "",
    });
  }, [open, expense, dateKey, form]);

  function onSubmit(values: ExpenseFormValues) {
    startTransition(async () => {
      const response = isEdit
        ? await tryCatch(updateExpense(expense!.id, values))
        : await tryCatch(createExpense(values));

      if (response.error) {
        toast.error(response.error.message ?? "Something went wrong");
        return;
      }

      if (response.data?.status === "success") {
        toast.success(response.data.message);
        onOpenChange(false);
        form.reset();
      } else {
        toast.error(response.data?.message ?? "Something went wrong");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit expense" : "Add expense"}</DialogTitle>
          <DialogDescription>
            Record lab spending with a title, amount, category, and date.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4 py-2">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="expense-title">Title</FieldLabel>
                  <Input
                    id="expense-title"
                    placeholder="e.g. CBC reagent kit"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="expense-amount">Amount (₹)</FieldLabel>
                    <Input
                      id="expense-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {expenseCategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="expenseDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Expense date</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start gap-2 font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="size-4" />
                          {field.value
                            ? format(field.value, "dd MMM yyyy")
                            : "Pick a date"}
                        </Button>
                      }
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) field.onChange(date);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="expense-notes">Notes (optional)</FieldLabel>
                  <Textarea
                    id="expense-notes"
                    placeholder="Vendor, invoice number, or remarks"
                    rows={3}
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline" type="button" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Add expense"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}