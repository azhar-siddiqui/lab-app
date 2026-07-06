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
import { useEffect, useState } from "react";

type DateToolbarProps = {
  dateKey: string;
  label: string;
  todayKey: string;
  compact?: boolean;
};

export function DateToolbar({
  dateKey,
  label,
  todayKey,
  compact = false,
}: DateToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedDate = parseDateKey(dateKey);
  const [isToday, setIsToday] = useState(dateKey === todayKey);

  useEffect(() => {
    setIsToday(dateKey === toDateKey(new Date()));
  }, [dateKey, todayKey]);

  const navigate = (nextDateKey: string) => {
    router.push(`${pathname}?date=${nextDateKey}`);
  };

  const controls = (
    <div className="flex items-center justify-end gap-2">
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
                "justify-start gap-2 font-normal",
                compact ? "min-w-45" : "min-w-50",
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
  );

  if (compact) {
    return controls;
  }

  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-5">
        <div className="min-w-0 space-y-0.5">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="font-heading truncate text-base font-semibold">
            {formatDisplayDate(dateKey)}
          </p>
        </div>
        {controls}
      </CardContent>
    </Card>
  );
}