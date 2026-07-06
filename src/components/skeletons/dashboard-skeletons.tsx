import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function DateToolbarSkeleton() {
  return (
    <Card className="gap-0 py-0">
      <CardContent className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-5">
        <div className="min-w-0 space-y-0.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-44" />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-8 w-50 rounded-lg" />
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton({
  footerClassName,
}: {
  footerClassName?: string;
}) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-4 w-24" />
        </CardDescription>
        <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
          <Skeleton className="h-8 w-24" />
        </CardTitle>
        <CardAction>
          <Skeleton className="h-6 w-28 rounded-full" />
        </CardAction>
      </CardHeader>
      <CardFooter
        className={cn("text-muted-foreground text-sm", footerClassName)}
      >
        <Skeleton className="h-4 w-36" />
      </CardFooter>
    </Card>
  );
}

export function StatCardsGridSkeleton({
  count = 4,
  columnsFrom = "sm",
  footerClassName,
}: {
  count?: number;
  columnsFrom?: "sm" | "md";
  footerClassName?: string;
}) {
  const gridClassNames = {
    sm: "sm:grid-cols-2 lg:grid-cols-4",
    md: "md:grid-cols-2 lg:grid-cols-4",
  } as const;

  return (
    <div
      className={cn(
        "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs",
        gridClassNames[columnsFrom],
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <StatCardSkeleton key={index} footerClassName={footerClassName} />
      ))}
    </div>
  );
}

export function SummaryPanelSkeleton({
  titleWidth = "w-28",
  descriptionWidth = "w-40",
  rows = 6,
}: {
  titleWidth?: string;
  descriptionWidth?: string;
  rows?: number;
}) {
  return (
    <Card className="h-full min-h-full gap-0 py-0">
      <CardHeader className="border-b px-5 py-5">
        <div className="bg-muted mb-3 flex size-10 w-fit items-center justify-center rounded-lg">
          <Skeleton className="size-5 rounded-md" />
        </div>
        <Skeleton className={cn("h-5", titleWidth)} />
        <Skeleton className={cn("h-4", descriptionWidth)} />
      </CardHeader>
      <CardContent className="space-y-0 px-5 py-2">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 py-2.5"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function LedgerCardSkeleton({
  showAddButton = false,
  rows = 5,
}: {
  showAddButton?: boolean;
  rows?: number;
}) {
  return (
    <Card className="h-full gap-0 py-0 md:col-span-2">
      <CardHeader className="gap-4 border-b px-4 py-5 sm:px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div
            className={cn(
              "flex gap-2",
              showAddButton
                ? "flex-col sm:flex-row sm:items-center"
                : "w-full md:max-w-sm",
            )}
          >
            <Skeleton
              className={cn(
                "h-8 rounded-lg",
                showAddButton ? "w-full md:max-w-xs" : "w-full",
              )}
            />
            {showAddButton ? (
              <Skeleton className="h-8 w-28 shrink-0 rounded-lg" />
            ) : null}
          </div>
        </div>
      </CardHeader>

      <div className="hidden divide-y md:block">
        <div className="border-b px-5 py-3">
          <div className="flex gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-4 w-14" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-5 py-4"
          >
            <div className="w-36 space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-1">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="ml-auto h-4 w-14" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>

      <div className="divide-y md:hidden">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="space-y-3 px-4 py-4 sm:px-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function BusinessDayPageSkeleton({
  ledgerShowAddButton = false,
  summaryTitleWidth = "w-28",
  summaryDescriptionWidth = "w-40",
  summaryRows = 6,
}: {
  ledgerShowAddButton?: boolean;
  summaryTitleWidth?: string;
  summaryDescriptionWidth?: string;
  summaryRows?: number;
}) {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <DateToolbarSkeleton />
      <StatCardsGridSkeleton />
      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
        <LedgerCardSkeleton showAddButton={ledgerShowAddButton} />
        <SummaryPanelSkeleton
          titleWidth={summaryTitleWidth}
          descriptionWidth={summaryDescriptionWidth}
          rows={summaryRows}
        />
      </div>
    </div>
  );
}

export function QuickActionsSkeleton() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <Skeleton className="mb-3 size-9 rounded-lg" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-8 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}