import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { formatINR } from "@/lib/format-inr";
import type { LabActivity } from "@/lib/lab-pages-data";
import { formatDistanceToNow } from "date-fns";
import { ClipboardList, Receipt } from "lucide-react";

const activityMeta = {
  report: {
    label: "Case",
    icon: ClipboardList,
    variant: "default" as const,
  },
  patient: {
    label: "Patient",
    icon: ClipboardList,
    variant: "secondary" as const,
  },
  expense: {
    label: "Expense",
    icon: Receipt,
    variant: "outline" as const,
  },
};

type ActivitiesViewProps = {
  activities: LabActivity[];
};

export function ActivitiesView({ activities }: ActivitiesViewProps) {
  if (activities.length === 0) {
    return (
      <Card className="gap-0 py-0">
        <CardContent className="text-muted-foreground py-16 text-center text-sm">
          No recent activity yet. Register a case or log an expense to see updates here.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const meta = activityMeta[activity.type];
        const Icon = meta.icon;

        return (
          <Card key={activity.id} className="gap-0 py-0">
            <CardContent className="flex items-start gap-4 px-5 py-4">
              <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base">{activity.title}</CardTitle>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </div>
                <CardDescription>{activity.description}</CardDescription>
                <p className="text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(activity.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              {activity.amount !== undefined ? (
                <span className="text-sm font-medium tabular-nums">
                  {formatINR(activity.amount)}
                </span>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}