"use client";

import { AnimatedNumber } from "@/app/(main)/dashboard/overview/_components/animated-number";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DailyBusinessData } from "@/lib/daily-business";
import { formatINR } from "@/lib/format-inr";
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

function formatAnimatedINR(amount: number, target: number) {
  const rounded = Math.round(amount);
  const useCompact = rounded >= target && target >= 1_000;
  return formatINR(rounded, useCompact);
}

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

  const cards = [
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
      badgeVariant: collectionRate >= 100 ? ("default" as const) : ("outline" as const),
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
      badgeVariant: totalDue > 0 ? ("destructive" as const) : ("outline" as const),
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
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
          <CardFooter className="text-muted-foreground text-sm">
            {card.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}