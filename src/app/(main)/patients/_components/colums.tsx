"use client";
import { GetPatientReportsType } from "@/actions/patient-report/get-all-patient-report";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<GetPatientReportsType>[] = [
  {
    accessorKey: "patientId",
    header: "Patient ID",
    cell: ({ row }) => {
      return (
        <span className="font-medium uppercase">
          MED-{row.original.patientId.slice(0, 8)}
        </span>
      );
    },
  },
  {
    id: "patient.name",
    accessorKey: "patient.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient
          <ArrowUpDown
            className="
              ml-2
              size-4
            "
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const patient = row.original.patient;

      return (
        <div className="space-y-1">
          <p className="font-medium">{patient.name}</p>

          <p
            className="
              text-muted-foreground
              text-xs
            "
          >
            {patient.contactNumber || "No Contact"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "testGroups",
    header: "Test Groups",
    cell: ({ row }) => {
      const groups = row.original.testGroups;
      return (
        <div
          className="
            flex
            flex-wrap
            gap-1
          "
        >
          {groups.map((group) => (
            <Badge key={group.id} variant="secondary" className="capitalize">
              {group.testGroup.shortName}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          ₹{row.original.totalAmount.toString()}
        </span>
      );
    },
  },
  {
    accessorKey: "patient.balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.original.patient.balance;
      const isPending = Number(balance) > 0;
      return (
        <Badge variant={isPending ? "destructive" : "default"}>
          ₹ {balance.toString()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reportDate",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.original.reportDate).toLocaleDateString("en-IN");
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) {
        return true;
      }
      const rowDate = new Date(row.getValue(columnId))
        .toISOString()
        .split("T")[0];
      return rowDate === filterValue;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const report = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent className="w-46" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                render={
                  <Link
                    href={`/patient-report/${report.id}`}
                    className={cn({ buttonVariants: "ghost" })}
                  >
                    View & Update Report
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link
                    href={`/patient-report/${report.id}/preview`}
                    className={cn({ buttonVariants: "ghost" })}
                  >
                    Print & Download PDF
                  </Link>
                }
              />
              <DropdownMenuItem
                render={
                  <Link
                    href={`/patients/${report.patientId}/edit`}
                    className={cn({ buttonVariants: "ghost" })}
                  >
                    Edit Patient Details
                  </Link>
                }
              />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
