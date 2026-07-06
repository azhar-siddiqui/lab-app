"use client";

import type { ReferralDoctorRow } from "@/lib/lab-pages-data";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

export const referralDoctorColumns: ColumnDef<ReferralDoctorRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Doctor
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">{row.original.name}</p>
        <p className="text-muted-foreground text-xs">
          {row.original.specialization || "General"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "contactNumber",
    header: "Contact",
    cell: ({ row }) => row.original.contactNumber || "—",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email || "—",
  },
  {
    accessorKey: "commission",
    header: () => <span className="block text-right">Commission</span>,
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">
        {row.original.commission}%
      </span>
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
    accessorKey: "createdAt",
    header: "Added",
    cell: ({ row }) => format(new Date(row.original.createdAt), "dd MMM yyyy"),
  },
];