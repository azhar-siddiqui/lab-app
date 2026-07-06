"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Activity,
  FileText,
  LayoutDashboard,
  TestTube2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Patients" },
  { icon: TestTube2, label: "Tests" },
  { icon: FileText, label: "Reports" },
];

const stats = [
  { label: "Cases today", value: "24", change: "+12%" },
  { label: "Pending reports", value: "8", change: "-3" },
  { label: "Revenue", value: "₹18.4k", change: "+8%" },
];

const patients = [
  { name: "Rahul Sharma", test: "CBC Panel", status: "Ready" },
  { name: "Priya Desai", test: "Lipid Profile", status: "Pending" },
  { name: "Amit Patel", test: "Thyroid", status: "In progress" },
];

export function DashboardPreview() {
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="marketing-float-slow bg-primary/20 absolute -top-4 -right-4 size-20 rounded-2xl blur-2xl" />
      <div className="marketing-float bg-primary/10 absolute -bottom-6 -left-6 size-32 rounded-full blur-3xl" />

      <div className="ring-foreground/10 relative overflow-hidden rounded-2xl bg-card shadow-2xl ring-1">
        <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-muted-foreground mx-auto text-xs font-medium">
            MedicareLab — Dashboard
          </span>
        </div>

        <div className="flex min-h-[320px] sm:min-h-[360px]">
          <aside className="hidden w-36 shrink-0 border-r border-border/60 bg-muted/20 p-3 sm:block">
            <div className="bg-primary text-primary-foreground mb-4 flex size-8 items-center justify-center rounded-lg text-xs font-bold">
              M
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors",
                    item.active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  <item.icon className="size-3.5 shrink-0" />
                  {item.label}
                </div>
              ))}
            </nav>
          </aside>

          <div className="flex-1 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">Good morning</p>
                <p className="text-muted-foreground text-xs">Lab overview</p>
              </div>
              <Badge variant="outline" className="gap-1 text-[10px]">
                <Activity className="size-3 text-emerald-500" />
                Live
              </Badge>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {stats.map((stat, i) => (
                <button
                  key={stat.label}
                  type="button"
                  onClick={() => setActiveStat(i)}
                  className={cn(
                    "rounded-lg border p-2 text-left transition-all duration-300",
                    activeStat === i
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : "border-border/60 bg-muted/20 hover:bg-muted/40",
                  )}
                >
                  <p className="text-muted-foreground text-[10px]">{stat.label}</p>
                  <p className="font-heading text-sm font-semibold">{stat.value}</p>
                  <p
                    className={cn(
                      "text-[10px] font-medium",
                      stat.change.startsWith("+")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground",
                    )}
                  >
                    {stat.change}
                  </p>
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/10">
              <div className="border-b border-border/60 px-3 py-2">
                <p className="text-xs font-medium">Recent cases</p>
              </div>
              <div className="divide-y divide-border/40">
                {patients.map((patient) => (
                  <div
                    key={patient.name}
                    className="flex items-center justify-between px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-medium">{patient.name}</p>
                      <p className="text-muted-foreground text-[10px]">
                        {patient.test}
                      </p>
                    </div>
                    <Badge
                      variant={
                        patient.status === "Ready" ? "default" : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {patient.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}