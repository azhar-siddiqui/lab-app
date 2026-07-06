"use client";

import type { ReferralBusinessRow } from "@/lib/lab-pages-data";
import { formatINR } from "@/lib/format-inr";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const referralBusinessColumns: ColumnDef<ReferralBusinessRow>[] = [
  {
    accessorKey: "doctorName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Doctor
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "totalCases",
    header: () => <span className="block text-right">Cases</span>,
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">
        {row.original.totalCases}
      </span>
    ),
  },
  {
    accessorKey: "totalBilling",
    header: () => <span className="block text-right">Billing</span>,
    cell: ({ row }) => (
      <span className="block text-right font-medium tabular-nums">
        {formatINR(row.original.totalBilling)}
      </span>
    ),
  },
  {
    accessorKey: "commission",
    header: () => <span className="block text-right">Rate</span>,
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">
        {row.original.commission}%
      </span>
    ),
  },
  {
    accessorKey: "commissionAmount",
    header: () => <span className="block text-right">Commission</span>,
    cell: ({ row }) => (
      <span className="block text-right font-medium tabular-nums">
        {formatINR(row.original.commissionAmount)}
      </span>
    ),
  },
];