import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export type PageStatItem = {
  label: string;
  value: string;
  icon: LucideIcon;
};

type PageStatsRowProps = {
  stats: PageStatItem[];
};

export function PageStatsRow({ stats }: PageStatsRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="gap-0 py-0">
          <CardHeader className="flex-row items-center gap-4 px-5 py-5">
            <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
              <stat.icon className="size-5" />
            </div>
            <div className="space-y-1">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-xl tabular-nums">{stat.value}</CardTitle>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}