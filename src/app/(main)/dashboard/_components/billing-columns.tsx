"use client";

import type { BillRow } from "@/lib/lab-pages-data";
import { formatINR } from "@/lib/format-inr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const billingColumns: ColumnDef<BillRow>[] = [
  {
    accessorKey: "patientName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Patient
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">{row.original.patientName}</p>
        <p className="text-muted-foreground text-xs">
          {row.original.contactNumber || "No contact"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "doctorName",
    header: "Doctor",
  },
  {
    accessorKey: "testGroups",
    header: "Tests",
    cell: ({ row }) => (
      <span className="text-muted-foreground line-clamp-2 text-sm">
        {row.original.testGroups || "—"}
      </span>
    ),
  },
  {
    accessorKey: "reportDate",
    header: "Date",
  },
  {
    accessorKey: "totalAmount",
    header: () => <span className="block text-right">Billed</span>,
    cell: ({ row }) => (
      <span className="block text-right font-medium tabular-nums">
        {formatINR(row.original.totalAmount)}
      </span>
    ),
  },
  {
    accessorKey: "amountReceived",
    header: () => <span className="block text-right">Received</span>,
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">
        {formatINR(row.original.amountReceived)}
      </span>
    ),
  },
  {
    accessorKey: "balance",
    header: () => <span className="block text-right">Due</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Badge variant={row.original.balance > 0 ? "destructive" : "default"}>
          {formatINR(row.original.balance)}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="size-4" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <Link href={`/patient-report/${row.original.id}`}>
                  Enter results
                </Link>
              }
            />
            <DropdownMenuItem
              render={
                <Link href={`/patients/${row.original.patientId}/edit`}>
                  Edit patient
                </Link>
              }
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];