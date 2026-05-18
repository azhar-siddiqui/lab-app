"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { TestGroupType } from "@/actions/test-group/get-test-group";
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

export const testGroupColumns: ColumnDef<TestGroupType>[] = [
  {
    accessorKey: "id",
    header: "Test Group ID",
    cell: ({ row }) => {
      return (
        <span className="font-medium uppercase">
          MED-{row.original.id.slice(0, 8)}
        </span>
      );
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Group Name
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
      const group = row.original;

      return (
        <div className="space-y-1">
          <p className="font-medium">{group.name}</p>

          <p
            className="
              text-muted-foreground
              text-xs
            "
          >
            {group.testCategory.name || "-"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "shortName",
    header: "Short Name",
    cell: ({ row }) => {
      const group = row.original;
      return (
        <div
          className="
            flex
            flex-wrap
            gap-1
          "
        >
          <Badge variant="secondary" className="capitalize">
            {group.shortName}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <span className="font-medium">₹{row.original.price.toString()}</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString("en-IN");
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
                    href={`/test/${row.original.id}/edit`}
                    className={cn({ buttonVariants: "ghost" })}
                  >
                    Edit Test Group
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
