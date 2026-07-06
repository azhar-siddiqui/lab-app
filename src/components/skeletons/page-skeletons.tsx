import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function SkeletonField({
  className,
  labelWidth = "w-24",
}: {
  className?: string;
  labelWidth?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Skeleton className={cn("h-4", labelWidth)} />
      <Skeleton className="h-8 w-full rounded-lg" />
    </div>
  );
}

export function DataTableSkeleton({
  rows = 8,
  columns = 7,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div>
      <div className="flex flex-col gap-3 px-0 p-4 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-8 w-full rounded-lg lg:max-w-sm" />
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-8 w-full rounded-lg lg:w-70" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <div className="border-b bg-muted/30 px-4 py-3">
          <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton
                key={i}
                className={cn("h-4", i === 1 ? "flex-[1.4]" : "flex-1")}
              />
            ))}
          </div>
        </div>
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex items-center gap-4 px-4 py-3">
              <Skeleton className="h-4 w-20" />
              <div className="flex-[1.4] space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex flex-1 gap-1">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-4 w-16 flex-1" />
              <Skeleton className="h-5 w-14 flex-1 rounded-full" />
              <Skeleton className="h-4 w-20 flex-1" />
              <Skeleton className="h-8 w-8 flex-1 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 py-4">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-14 rounded-lg" />
      </div>
    </div>
  );
}

function ListPageHeaderSkeleton({
  actionCount = 1,
}: {
  actionCount?: number;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-52" />
        <div className="flex items-center gap-2">
          {Array.from({ length: actionCount }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-28 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        <Skeleton className="h-4 w-full max-w-3xl" />
        <Skeleton className="h-4 w-full max-w-2xl" />
      </div>
    </>
  );
}

export function PatientsPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col space-y-2">
      <ListPageHeaderSkeleton />
      <DataTableSkeleton rows={8} columns={7} />
    </div>
  );
}

export function TestPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col space-y-2">
      <ListPageHeaderSkeleton actionCount={2} />
      <DataTableSkeleton rows={8} columns={5} />
    </div>
  );
}

export function PatientRegistrationSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 space-y-2 xl:col-span-9">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <SkeletonField className="col-span-12 xl:col-span-3" labelWidth="w-12" />

      <SkeletonField className="col-span-12 xl:col-span-4" labelWidth="w-20" />
      <SkeletonField className="col-span-12 xl:col-span-2" labelWidth="w-24" />
      <SkeletonField className="col-span-12 xl:col-span-4" labelWidth="w-28" />
      <SkeletonField className="col-span-12 xl:col-span-4" labelWidth="w-28" />

      <div className="col-span-12 space-y-2 xl:col-span-4">
        <Skeleton className="h-4 w-16" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 flex-1 rounded-lg" />
          ))}
        </div>
      </div>

      <SkeletonField className="col-span-12 xl:col-span-2" labelWidth="w-10" />
      <SkeletonField className="col-span-12 xl:col-span-2" labelWidth="w-20" />
      <SkeletonField className="col-span-12" labelWidth="w-12" />
      <div className="col-span-12 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-26 w-full rounded-lg" />
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-4">
        <div className="col-span-12 rounded-xl border bg-card py-4 ring-1 ring-foreground/10 lg:col-span-6">
          <div className="space-y-3 px-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
          <div className="mt-4 space-y-3 px-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-5 w-5 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 rounded-xl border bg-card py-4 ring-1 ring-foreground/10 lg:col-span-6">
          <div className="space-y-1 px-4">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 px-4">
            <SkeletonField className="col-span-6" labelWidth="w-16" />
            <SkeletonField className="col-span-6" labelWidth="w-20" />
            <SkeletonField className="col-span-6" labelWidth="w-28" />
            <SkeletonField className="col-span-6" labelWidth="w-16" />
            <div className="col-span-12 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 flex justify-end gap-3 pt-2">
        <Skeleton className="h-9 w-28 rounded-lg" />
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>
    </div>
  );
}

export function TestGroupFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <SkeletonField className="col-span-12 xl:col-span-4" labelWidth="w-32" />
        <SkeletonField className="col-span-12 xl:col-span-4" labelWidth="w-24" />
        <SkeletonField className="col-span-12 xl:col-span-4" labelWidth="w-20" />
        <SkeletonField className="col-span-12 xl:col-span-4" labelWidth="w-14" />
        <div className="col-span-12 flex items-center gap-2 xl:col-span-8">
          <Skeleton className="h-5 w-5 rounded-sm" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>

      <div className="rounded-xl border bg-card ring-1 ring-foreground/10">
        <div className="border-b px-4 py-3">
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="space-y-3 p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-3 rounded-lg border p-3"
            >
              <SkeletonField className="col-span-12 md:col-span-3" />
              <SkeletonField className="col-span-6 md:col-span-2" />
              <SkeletonField className="col-span-6 md:col-span-2" />
              <SkeletonField className="col-span-6 md:col-span-2" />
              <SkeletonField className="col-span-6 md:col-span-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-32 w-full rounded-lg" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
    </div>
  );
}

export function ReportEntrySkeleton() {
  return (
    <div className="mx-auto space-y-4">
      <div className="rounded-lg border-none bg-card shadow-sm ring-1 ring-foreground/10">
        <div className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="size-10 rounded-2xl" />
                <Skeleton className="h-5 w-44 rounded-full" />
              </div>
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-28" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="hidden rounded-lg bg-card p-4 ring-1 ring-foreground/10 lg:block">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="mt-2 h-4 w-24" />
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-lg border px-4 py-4"
            >
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-8 w-full rounded-lg" />
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Skeleton className="h-10 w-full rounded-lg sm:h-9 sm:w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSettingsSkeleton() {
  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[350px_1fr]">
      <aside className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-3 rounded-xl border px-4 py-3.5",
              i === 0 ? "border-primary/30 bg-primary/10" : "border-transparent",
            )}
          >
            <Skeleton className="size-7 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="size-3.5 shrink-0 rounded-sm" />
          </div>
        ))}
      </aside>

      <div className="rounded-xl border bg-card ring-1 ring-foreground/10">
        <div className="space-y-1 border-b px-6 py-5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="size-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-28 rounded-lg" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonField key={i} labelWidth="w-24" />
            ))}
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function IntroductionPageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-10">
      <div className="overflow-hidden rounded-xl border border-primary/20 bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32 rounded-full" />
            <Skeleton className="h-8 w-72 max-w-full" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
          <Skeleton className="size-20 shrink-0 rounded-2xl" />
        </div>
      </div>

      <section className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="size-10 rounded-lg" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="mt-4 h-5 w-40" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-[85%]" />
              <Skeleton className="mt-4 h-8 w-28 rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
          >
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="mt-3 h-5 w-28" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-[85%]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-4 h-6 w-28 rounded-full" />
            <Skeleton className="mt-4 h-4 w-32" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card ring-1 ring-foreground/10 lg:col-span-2">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-4 py-3.5"
              >
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card px-5 py-5 ring-1 ring-foreground/10"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="size-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-10" />
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-xl border bg-card px-5 py-5 ring-1 ring-foreground/10">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-[90%]" />
            <Skeleton className="mt-5 h-8 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-56" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
            >
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="mt-3 h-4 w-24" />
              <Skeleton className="mt-2 h-3 w-full" />
              <Skeleton className="mt-4 h-8 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DailyBusinessSkeleton() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="rounded-xl border bg-card px-5 py-4 ring-1 ring-foreground/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-44" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-8 w-44 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-4 h-6 w-28 rounded-full" />
            <Skeleton className="mt-4 h-4 w-32" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <div className="rounded-xl border bg-card ring-1 ring-foreground/10 md:col-span-2">
          <div className="flex flex-col gap-4 border-b px-5 py-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-full rounded-lg md:max-w-sm" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card ring-1 ring-foreground/10">
          <div className="space-y-3 border-b px-5 py-5">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-1 px-5 py-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between py-2.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExpensesPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="rounded-xl border bg-card px-5 py-4 ring-1 ring-foreground/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-44" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-8 w-44 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-4 h-6 w-28 rounded-full" />
            <Skeleton className="mt-4 h-4 w-32" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <div className="rounded-xl border bg-card ring-1 ring-foreground/10 md:col-span-2">
          <div className="flex flex-col gap-4 border-b px-5 py-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Skeleton className="h-8 w-full rounded-lg md:max-w-xs" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </div>
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card ring-1 ring-foreground/10">
          <div className="space-y-3 border-b px-5 py-5">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-44" />
          </div>
          <div className="space-y-1 px-5 py-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between py-2.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeadingSkeleton() {
  return (
    <div className="mb-4 space-y-2 pb-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
  );
}

export function MainContentSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:px-6">
      <PageHeadingSkeleton />
      <PatientsPageSkeleton />
    </div>
  );
}

/** @deprecated Use PatientsPageSkeleton or DataTableSkeleton directly */
export function TablePageSkeleton(props: {
  rows?: number;
  columns?: number;
}) {
  return <DataTableSkeleton {...props} />;
}

/** @deprecated Use PatientRegistrationSkeleton */
export function FormPageSkeleton() {
  return <PatientRegistrationSkeleton />;
}

/** @deprecated Use ReportEntrySkeleton */
export function ReportPageSkeleton() {
  return <ReportEntrySkeleton />;
}