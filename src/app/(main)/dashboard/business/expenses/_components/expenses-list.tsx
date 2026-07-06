"use client";

import { deleteExpense } from "@/actions/business/delete-expense";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { expenseCategoryLabels, type ExpenseItem } from "@/lib/expenses";
import { formatINR } from "@/lib/format-inr";
import { tryCatch } from "@/utils/try-catch";
import { Loader2, MoreHorizontal, Plus, Receipt, Search } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { ExpenseFormDialog } from "./expense-form-dialog";

type ExpensesListProps = {
  dateKey: string;
  expenses: ExpenseItem[];
};

export function ExpensesList({ dateKey, expenses }: ExpensesListProps) {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(
    null,
  );
  const [deletingExpense, setDeletingExpense] = useState<ExpenseItem | null>(
    null,
  );
  const [pending, startTransition] = useTransition();

  const filteredExpenses = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return expenses;

    return expenses.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        expenseCategoryLabels[item.category].toLowerCase().includes(query) ||
        item.notes?.toLowerCase().includes(query)
      );
    });
  }, [expenses, search]);

  function openCreate() {
    setEditingExpense(null);
    setFormOpen(true);
  }

  function openEdit(expense: ExpenseItem) {
    setEditingExpense(expense);
    setFormOpen(true);
  }

  function confirmDelete() {
    if (!deletingExpense) return;

    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteExpense(deletingExpense.id),
      );

      if (error) {
        toast.error(error.message ?? "Something went wrong");
        return;
      }

      if (result?.status === "success") {
        toast.success(result.message);
        setDeletingExpense(null);
      } else {
        toast.error(result?.message ?? "Something went wrong");
      }
    });
  }

  const emptyState = (
    <CardContent className="flex h-full min-h-70 flex-col items-center justify-center gap-4 px-6 py-14 text-center">
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
        <Receipt className="size-6" />
      </div>
      <div className="max-w-sm space-y-1">
        <p className="font-medium">No expenses for this date</p>
        <p className="text-muted-foreground text-sm">
          Add your first expense entry to start tracking lab spending.
        </p>
      </div>
      <Button size="sm" onClick={openCreate}>
        <Plus className="mr-2 size-4" />
        Add expense
      </Button>
    </CardContent>
  );

  const listHeader = (
    <CardHeader className="gap-4 border-b px-4 py-5 sm:px-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base">Expense ledger</CardTitle>
          <CardDescription>
            {filteredExpenses.length} of {expenses.length} entries
          </CardDescription>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <InputGroup className="w-full md:max-w-xs">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title or category..."
            />
          </InputGroup>
          <Button size="sm" onClick={openCreate} className="shrink-0">
            <Plus data-icon="inline-start" />
            Add expense
          </Button>
        </div>
      </div>
    </CardHeader>
  );

  return (
    <>
      {expenses.length === 0 ? (
        <Card className="h-full gap-0 py-0 md:col-span-2">{emptyState}</Card>
      ) : (
        <Card className="h-full gap-0 py-0 md:col-span-2">
          {listHeader}

          <div className="divide-y md:hidden">
            {filteredExpenses.length === 0 ? (
              <p className="text-muted-foreground px-5 py-10 text-center text-sm">
                No expenses match your search.
              </p>
            ) : (
              filteredExpenses.map((item) => (
                <div key={item.id} className="space-y-3 px-4 py-4 sm:px-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <p className="truncate font-medium">{item.title}</p>
                      <Badge variant="secondary" className="text-[10px]">
                        {expenseCategoryLabels[item.category]}
                      </Badge>
                    </div>
                    <p className="shrink-0 font-medium tabular-nums">
                      {formatINR(item.amount)}
                    </p>
                  </div>
                  {item.notes && (
                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {item.notes}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingExpense(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <CardContent className="hidden p-0 md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-45 pl-5">Title</TableHead>
                    <TableHead className="min-w-40">Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="min-w-50">Notes</TableHead>
                    <TableHead className="pr-5 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-muted-foreground h-24 text-center"
                      >
                        No expenses match your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredExpenses.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="pl-5 font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px]">
                            {expenseCategoryLabels[item.category]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          {formatINR(item.amount)}
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-60 truncate text-sm">
                          {item.notes || "—"}
                        </TableCell>
                        <TableCell className="pr-5 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  aria-label="Open actions"
                                >
                                  <MoreHorizontal />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end">
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => openEdit(item)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => setDeletingExpense(item)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <ExpenseFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        dateKey={dateKey}
        expense={editingExpense}
      />

      <Dialog
        open={Boolean(deletingExpense)}
        onOpenChange={(open) => {
          if (!open) setDeletingExpense(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete expense</DialogTitle>
            <DialogDescription>
              This will permanently remove{" "}
              <span className="text-foreground font-medium">
                {deletingExpense?.title}
              </span>{" "}
              ({deletingExpense ? formatINR(deletingExpense.amount) : ""}) from
              your records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>
              Cancel
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
