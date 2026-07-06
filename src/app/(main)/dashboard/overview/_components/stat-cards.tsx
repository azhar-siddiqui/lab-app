"use client";

import { AnimatedNumber } from "@/components/dashboard/animated-number";
import {
  StatCardsGrid,
  type StatCardConfig,
} from "@/components/dashboard/stat-cards-grid";
import { formatAnimatedINR, formatINR } from "@/lib/format-inr";
import {
  Activity,
  IndianRupee,
  TestTube2,
  Users,
} from "lucide-react";

type StatCardsProps = {
  casesToday: number;
  totalReports: number;
  pendingReports: number;
  revenueToday: number;
  totalRevenue: number;
  outstandingDues: number;
  totalPatients: number;
};

export function StatCards({
  casesToday,
  totalReports,
  pendingReports,
  revenueToday,
  totalRevenue,
  outstandingDues,
  totalPatients,
}: StatCardsProps) {
  const cards: StatCardConfig[] = [
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
    <StatCardsGrid
      cards={cards}
      columnsFrom="md"
      footerClassName="flex-col items-start gap-1.5"
    />
  );
}