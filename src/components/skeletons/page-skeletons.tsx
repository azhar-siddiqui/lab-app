import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton({
  showAction = true,
}: {
  showAction?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      {showAction && <Skeleton className="h-9 w-28" />}
    </div>
  );
}

export function TablePageSkeleton({
  rows = 8,
  columns = 6,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="rounded-xl border border-border/60 p-4">
        <div className="mb-4 flex gap-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex gap-3">
              {Array.from({ length: columns }).map((_, col) => (
                <Skeleton key={col} className="h-10 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormPageSkeleton({ fields = 8 }: { fields?: number }) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

export function ReportPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-12 w-full rounded-lg" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function IntroductionPageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <Skeleton className="h-40 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function MainContentSkeleton() {
  return (
    <div className="flex flex-1 animate-pulse flex-col gap-4 p-4 md:px-6">
      <PageHeaderSkeleton />
      <Skeleton className="mt-2 h-4 w-full max-w-2xl" />
      <TablePageSkeleton rows={5} columns={5} />
    </div>
  );
}