"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import type { DailyBusinessCase } from "@/lib/daily-business";
import { formatINR } from "@/lib/format-inr";
import { cn } from "@/lib/utils";
import { FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type DailyCasesListProps = {
  cases: DailyBusinessCase[];
};

export function DailyCasesList({ cases }: DailyCasesListProps) {
  const [search, setSearch] = useState("");

  const filteredCases = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return cases;

    return cases.filter((item) => {
      return (
        item.patientName.toLowerCase().includes(query) ||
        item.doctorName.toLowerCase().includes(query) ||
        item.testGroups.join(" ").toLowerCase().includes(query) ||
        item.contactNumber?.toLowerCase().includes(query)
      );
    });
  }, [cases, search]);

  if (cases.length === 0) {
    return (
      <Card className="h-full gap-0 py-0 md:col-span-2">
        <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 px-6 py-14 text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
            <FileText className="size-6" />
          </div>
          <div className="max-w-sm space-y-1">
            <p className="font-medium">No cases for this date</p>
            <p className="text-muted-foreground text-sm">
              Register a new patient case to see it in the daily ledger.
            </p>
          </div>
          <Link href="/patients/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="mr-2 size-4" />
            New case
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full gap-0 py-0 md:col-span-2">
      <CardHeader className="gap-4 border-b px-4 py-5 sm:px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">Case ledger</CardTitle>
            <CardDescription>
              {filteredCases.length} of {cases.length} cases
            </CardDescription>
          </div>

          <InputGroup className="w-full md:max-w-sm">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patient, doctor, or test..."
            />
          </InputGroup>
        </div>
      </CardHeader>

      <div className="divide-y md:hidden">
        {filteredCases.length === 0 ? (
          <p className="text-muted-foreground px-5 py-10 text-center text-sm">
            No cases match your search.
          </p>
        ) : (
          filteredCases.map((item) => (
            <Link
              key={item.id}
              href={`/patient-report/${item.id}`}
              className="hover:bg-muted/40 block px-4 py-4 transition-colors sm:px-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="truncate font-medium">{item.patientName}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {item.doctorName} ·{" "}
                    {item.testGroups.join(", ") || "No tests"}
                  </p>
                </div>
                <Badge variant={item.balance > 0 ? "destructive" : "default"}>
                  {formatINR(item.balance)}
                </Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Billed</p>
                  <p className="mt-0.5 font-medium tabular-nums">
                    {formatINR(item.totalAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Received</p>
                  <p className="mt-0.5 font-medium tabular-nums">
                    {formatINR(item.amountReceived)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Discount</p>
                  <p className="mt-0.5 font-medium tabular-nums">
                    {item.discountAmount > 0
                      ? formatINR(item.discountAmount)
                      : "—"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <CardContent className="hidden p-0 md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-[150px] pl-5">Patient</TableHead>
                <TableHead className="min-w-[120px]">Doctor</TableHead>
                <TableHead className="min-w-[160px]">Tests</TableHead>
                <TableHead className="text-right">Billed</TableHead>
                <TableHead className="text-right">Received</TableHead>
                <TableHead className="text-right">Due</TableHead>
                <TableHead className="pr-5 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-muted-foreground h-24 text-center"
                  >
                    No cases match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCases.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="pl-5">
                      <div className="space-y-0.5">
                        <p className="font-medium">{item.patientName}</p>
                        <p className="text-muted-foreground text-xs">
                          {item.contactNumber || "No contact"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{item.doctorName}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.testGroups.map((group) => (
                          <Badge
                            key={group}
                            variant="secondary"
                            className="text-[10px]"
                          >
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatINR(item.totalAmount)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatINR(item.amountReceived)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={item.balance > 0 ? "destructive" : "default"}
                      >
                        {formatINR(item.balance)}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <Link
                        href={`/patient-report/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                        )}
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}