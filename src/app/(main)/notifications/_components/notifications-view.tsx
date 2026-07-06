import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LabNotification } from "@/lib/lab-pages-data";
import { cn } from "@/lib/utils";
import { ArrowRight, Bell } from "lucide-react";
import Link from "next/link";

const variantStyles = {
  default: "border-border",
  warning: "border-amber-500/30 bg-amber-500/5",
  destructive: "border-destructive/30 bg-destructive/5",
} as const;

const badgeVariants = {
  default: "outline",
  warning: "secondary",
  destructive: "destructive",
} as const;

type NotificationsViewProps = {
  notifications: LabNotification[];
};

export function NotificationsView({ notifications }: NotificationsViewProps) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Link key={notification.id} href={notification.href} className="block">
          <Card
            className={cn(
              "gap-0 py-0 transition-colors hover:bg-muted/30",
              variantStyles[notification.variant],
            )}
          >
            <CardContent className="flex items-start justify-between gap-4 px-5 py-4">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base">{notification.title}</CardTitle>
                  <Badge
                    variant={
                      badgeVariants[notification.variant] as
                        | "outline"
                        | "secondary"
                        | "destructive"
                    }
                  >
                    {notification.variant === "default"
                      ? "Info"
                      : notification.variant === "warning"
                        ? "Action"
                        : "Urgent"}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {notification.description}
                </CardDescription>
              </div>
              <ArrowRight className="text-muted-foreground mt-1 size-4 shrink-0" />
            </CardContent>
          </Card>
        </Link>
      ))}

      <Card className="border-dashed">
        <CardHeader className="flex-row items-center gap-3">
          <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
            <Bell className="size-5" />
          </div>
          <div>
            <CardTitle className="text-sm">All caught up for now</CardTitle>
            <CardDescription>
              New alerts will appear here as your lab activity changes.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}