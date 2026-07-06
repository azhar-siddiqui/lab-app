import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NotificationsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="gap-0 py-0">
          <CardContent className="space-y-2 px-5 py-4">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}