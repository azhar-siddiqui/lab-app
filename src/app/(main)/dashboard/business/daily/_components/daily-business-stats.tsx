"use client";

import { AnimatedNumber } from "@/components/dashboard/animated-number";
import {
  StatCardsGrid,
  type StatCardConfig,
} from "@/components/dashboard/stat-cards-grid";
import type { DailyBusinessData } from "@/lib/daily-business";
import { formatAnimatedINR, formatINR } from "@/lib/format-inr";
import {
  ClipboardList,
  HandCoins,
  IndianRupee,
  Wallet,
} from "lucide-react";

type DailyBusinessStatsProps = Pick<
  DailyBusinessData,
  "totalCases" | "netBilling" | "totalReceived" | "totalDue"
> & {
  grossBilling: number;
  totalDiscount: number;
};

export function DailyBusinessStats({
  totalCases,
  grossBilling,
  totalDiscount,
  netBilling,
  totalReceived,
  totalDue,
}: DailyBusinessStatsProps) {
  const collectionRate =
    netBilling > 0 ? Math.round((totalReceived / netBilling) * 100) : 0;

  const cards: StatCardConfig[] = [
    {
      label: "Total cases",
      value: (
        <AnimatedNumber
          value={totalCases}
          delay={0}
          format={(n) => Math.round(n).toString()}
        />
      ),
      footer: "Patients registered today",
      icon: ClipboardList,
      badge: totalCases === 1 ? "1 case" : `${totalCases} cases`,
    },
    {
      label: "Net billing",
      value: (
        <AnimatedNumber
          value={netBilling}
          delay={100}
          format={(n) => formatAnimatedINR(n, netBilling)}
        />
      ),
      footer: `${formatINR(grossBilling)} gross · ${formatINR(totalDiscount)} off`,
      icon: IndianRupee,
      badge: formatINR(netBilling),
    },
    {
      label: "Collected",
      value: (
        <AnimatedNumber
          value={totalReceived}
          delay={200}
          format={(n) => formatAnimatedINR(n, totalReceived)}
        />
      ),
      footer:
        netBilling > 0
          ? `${collectionRate}% of net billing collected`
          : "No billing recorded",
      icon: HandCoins,
      badge: `${collectionRate}%`,
      badgeVariant:
        collectionRate >= 100 ? ("default" as const) : ("outline" as const),
    },
    {
      label: "Outstanding",
      value: (
        <AnimatedNumber
          value={totalDue}
          delay={300}
          format={(n) => formatAnimatedINR(n, totalDue)}
        />
      ),
      footer: "Balance pending from patients",
      icon: Wallet,
      badge: totalDue > 0 ? "Due pending" : "Fully collected",
      badgeVariant:
        totalDue > 0 ? ("destructive" as const) : ("outline" as const),
    },
  ];

  return <StatCardsGrid cards={cards} />;
}