"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatDisplayDate,
  parseDateKey,
  shiftDateKey,
  toDateKey,
} from "@/lib/daily-business";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type ExpensesDateToolbarProps = {
  dateKey: string;
};

export function ExpensesDateToolbar({ dateKey }: ExpensesDateToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedDate = parseDateKey(dateKey);
  const isToday = dateKey === toDateKey(new Date());

  const navigate = (nextDateKey: string) => {
    router.push(`${pathname}?date=${nextDateKey}`);
  };

  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="space-y-0.5">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            Expense date
          </p>
          <p className="font-heading text-base font-semibold">
            {formatDisplayDate(dateKey)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => navigate(shiftDateKey(dateKey, -1))}
            aria-label="Previous day"
          >
            <ChevronLeft />
          </Button>

          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  className={cn(
                    "w-full min-w-50 justify-start gap-2 font-normal sm:w-auto",
                  )}
                >
                  <CalendarIcon className="size-4" />
                  {format(selectedDate, "dd MMM yyyy")}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) navigate(toDateKey(date));
                }}
              />
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => navigate(shiftDateKey(dateKey, 1))}
            aria-label="Next day"
          >
            <ChevronRight />
          </Button>

          <Button
            type="button"
            variant={isToday ? "secondary" : "outline"}
            size="sm"
            disabled={isToday}
            onClick={() => navigate(toDateKey(new Date()))}
          >
            Today
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
