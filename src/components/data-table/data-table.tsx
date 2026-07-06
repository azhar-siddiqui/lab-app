"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import React, { memo, useCallback, useMemo } from "react";
import { DateRange } from "react-day-picker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKeys?: string[];
  searchPlaceholder?: string;
  dateFilterKey?: keyof TData;
}

function getNestedValue(obj: unknown, path: string) {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (typeof acc === "object" && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function toSearchableString(value: unknown) {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return "";
}

function DataTableInner<TData, TValue>({
  columns,
  data,
  searchKeys,
  searchPlaceholder,
  dateFilterKey,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [search, setSearch] = React.useState("");

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (search && searchKeys?.length) {
      filtered = filtered.filter((item) => {
        return searchKeys.some((key) => {
          const value = getNestedValue(item, key);

          if (!value) {
            return false;
          }

          return toSearchableString(value)
            .toLowerCase()
            .includes(search.toLowerCase());
        });
      });
    }

    if (dateRange?.from && dateFilterKey) {
      const from = new Date(dateRange.from);

      const to = dateRange.to ? new Date(dateRange.to) : from;

      to.setHours(23, 59, 59, 999);

      filtered = filtered.filter((item) => {
        const value = getNestedValue(item, String(dateFilterKey));
        if (!value) {
          return false;
        }
        const dateValue = toSearchableString(value);

        if (!dateValue) {
          return false;
        }

        const itemDate = new Date(dateValue);
        return itemDate >= from && itemDate <= to;
      });
    }

    return filtered;
  }, [data, search, searchKeys, dateRange, dateFilterKey]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const clearFilters = useCallback(() => {
    setSearch("");
    setDateRange(undefined);
  }, []);

  const handlePreviousPage = useCallback(() => {
    table.previousPage();
  }, [table]);

  const handleNextPage = useCallback(() => {
    table.nextPage();
  }, [table]);

  return (
    <div>
      <div className=" flex flex-col gap-3 p-4 px-0 lg:flex-row lg:items-center lg:justify-between ">
        {!!searchKeys?.length && (
          <InputGroup className=" w-full lg:max-w-sm ">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={searchPlaceholder ?? "Search"}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </InputGroup>
        )}

        <div className=" flex flex-wrap items-center gap-2 ">
          {/* DATE RANGE */}
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full lg:w-70",
                    !dateRange && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className=" mr-2 size-4 " />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd MMM yyyy")} {" - "}
                        {format(dateRange.to, "dd MMM yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "dd MMM yyyy")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
          {/* CLEAR FILTERS */}
          <Button variant="outline" type="button" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export const DataTable = memo(DataTableInner) as typeof DataTableInner;
