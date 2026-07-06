"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  IndianRupee,
  TestTube2,
  Users,
} from "lucide-react";
import { AnimatedNumber } from "./animated-number";
import { formatINR } from "./format-inr";

type StatCardsProps = {
  casesToday: number;
  totalReports: number;
  pendingReports: number;
  revenueToday: number;
  totalRevenue: number;
  outstandingDues: number;
  totalPatients: number;
};

function formatAnimatedINR(amount: number, target: number) {
  const rounded = Math.round(amount);
  const useCompact = rounded >= target && target >= 1_000;
  return formatINR(rounded, useCompact);
}

export function StatCards({
  casesToday,
  totalReports,
  pendingReports,
  revenueToday,
  totalRevenue,
  outstandingDues,
  totalPatients,
}: StatCardsProps) {
  const cards = [
    {
      label: "Cases today",
      value: (
        <AnimatedNumber
          value={casesToday}
          delay={0}
          format={(n) => Math.round(n).toString()}
        />
      ),
      footer: `${totalReports} total cases`,
      icon: Activity,
      badge: casesToday > 0 ? `${casesToday} new` : "No cases yet",
    },
    {
      label: "Pending reports",
      value: (
        <AnimatedNumber
          value={pendingReports}
          delay={120}
          format={(n) => Math.round(n).toString()}
        />
      ),
      footer: "Awaiting result entry",
      icon: TestTube2,
      badge: pendingReports > 0 ? "Action needed" : "All clear",
      badgeVariant:
        pendingReports > 0 ? ("destructive" as const) : ("outline" as const),
    },
    {
      label: "Revenue today",
      value: (
        <AnimatedNumber
          value={revenueToday}
          delay={240}
          format={(n) => formatAnimatedINR(n, revenueToday)}
        />
      ),
      footer: `${formatINR(totalRevenue)} all time`,
      icon: IndianRupee,
      badge: formatINR(revenueToday),
    },
    {
      label: "Outstanding dues",
      value: (
        <AnimatedNumber
          value={outstandingDues}
          delay={360}
          format={(n) => formatAnimatedINR(n, outstandingDues)}
        />
      ),
      footer: `${totalPatients} patients on file`,
      icon: Users,
      badge: outstandingDues > 0 ? formatINR(outstandingDues) : "No dues",
      badgeVariant:
        outstandingDues > 0 ? ("destructive" as const) : ("outline" as const),
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="@container/card">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant={card.badgeVariant ?? "outline"}>
                <card.icon className="size-3.5" />
                {card.badge}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-muted-foreground flex-col items-start gap-1.5 text-sm">
            {card.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}