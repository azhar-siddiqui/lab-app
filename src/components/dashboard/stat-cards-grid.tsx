"use client";

import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type StatCardConfig = {
  label: string;
  value: ReactNode;
  footer: ReactNode;
  icon: LucideIcon;
  badge: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
};

type StatCardsGridProps = {
  cards: StatCardConfig[];
  columnsFrom?: "sm" | "md";
  footerClassName?: string;
};

const gridClassNames = {
  sm: "sm:grid-cols-2 lg:grid-cols-4",
  md: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export function StatCardsGrid({
  cards,
  columnsFrom = "sm",
  footerClassName,
}: StatCardsGridProps) {
  return (
    <div
      className={cn(
        "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs",
        gridClassNames[columnsFrom],
      )}
    >
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
          <CardFooter
            className={cn(
              "text-muted-foreground text-sm",
              footerClassName,
            )}
          >
            {card.footer}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}