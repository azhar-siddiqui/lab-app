"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Droplets,
  FlaskConical,
  Microscope,
  TrendingDown,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestDef {
  id: string;
  name: string;
  unit: string;
  range: string;
  low: number;
  high: number;
}

interface TestGroupDef {
  id: string;
  name: string;
  icon: React.ReactNode;
  accentColor: string; // hex for dynamic use
  tests: TestDef[];
}

type ResultStatus = "normal" | "high" | "low" | "empty";

// ─── Schema ───────────────────────────────────────────────────────────────────

const reportSchema = z.object({
  tests: z.array(
    z.object({
      id: z.string(),
      resultValue: z.string().min(1, "Required"),
    }),
  ),
});

type ReportFormValues = z.infer<typeof reportSchema>;

// ─── Static Data ──────────────────────────────────────────────────────────────

const TEST_GROUPS: TestGroupDef[] = [
  {
    id: "blood-sugar",
    name: "Blood Sugar",
    icon: <Droplets className="h-4 w-4" />,
    accentColor: "#f43f5e",
    tests: [
      {
        id: "fbs",
        name: "Fasting Blood Sugar",
        unit: "mg/dL",
        range: "70 – 100",
        low: 70,
        high: 100,
      },
      {
        id: "ppbs",
        name: "PP Blood Sugar",
        unit: "mg/dL",
        range: "100 – 140",
        low: 100,
        high: 140,
      },
      {
        id: "hba1c",
        name: "HbA1c",
        unit: "%",
        range: "4 – 5.6",
        low: 4,
        high: 5.6,
      },
    ],
  },
  {
    id: "cbc",
    name: "CBC",
    icon: <Activity className="h-4 w-4" />,
    accentColor: "#0ea5e9",
    tests: [
      {
        id: "hb",
        name: "Hemoglobin",
        unit: "g/dL",
        range: "13 – 17",
        low: 13,
        high: 17,
      },
      {
        id: "wbc",
        name: "WBC",
        unit: "cells/cumm",
        range: "4000 – 11000",
        low: 4000,
        high: 11000,
      },
      {
        id: "plt",
        name: "Platelets",
        unit: "×10³/µL",
        range: "150 – 400",
        low: 150,
        high: 400,
      },
      {
        id: "rbc",
        name: "RBC",
        unit: "million/µL",
        range: "4.5 – 5.5",
        low: 4.5,
        high: 5.5,
      },
    ],
  },
  {
    id: "thyroid",
    name: "Thyroid Profile",
    icon: <Zap className="h-4 w-4" />,
    accentColor: "#8b5cf6",
    tests: [
      {
        id: "t3",
        name: "T3",
        unit: "ng/dL",
        range: "80 – 200",
        low: 80,
        high: 200,
      },
      {
        id: "t4",
        name: "T4",
        unit: "µg/dL",
        range: "5 – 12",
        low: 5,
        high: 12,
      },
      {
        id: "tsh",
        name: "TSH",
        unit: "µIU/mL",
        range: "0.4 – 4",
        low: 0.4,
        high: 4,
      },
    ],
  },
  {
    id: "liver",
    name: "Liver Function",
    icon: <Microscope className="h-4 w-4" />,
    accentColor: "#f59e0b",
    tests: [
      {
        id: "sgot",
        name: "SGOT / AST",
        unit: "U/L",
        range: "10 – 40",
        low: 10,
        high: 40,
      },
      {
        id: "sgpt",
        name: "SGPT / ALT",
        unit: "U/L",
        range: "7 – 56",
        low: 7,
        high: 56,
      },
      {
        id: "alp",
        name: "Alkaline Phosphatase",
        unit: "U/L",
        range: "44 – 147",
        low: 44,
        high: 147,
      },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getResultStatus(
  value: string,
  low: number,
  high: number,
): ResultStatus {
  const trimmed = value?.trim();
  if (!trimmed) return "empty";
  const num = Number.parseFloat(trimmed);
  if (isNaN(num)) return "empty";
  if (num > high) return "high";
  if (num < low) return "low";
  return "normal";
}

const STATUS_CFG: Record<
  ResultStatus,
  {
    rowCls: string;
    inputBorder: string;
    valueCls: string;
    badgeEl: React.ReactNode;
  }
> = {
  normal: {
    rowCls: "bg-emerald-50/30",
    inputBorder:
      "border-emerald-200 focus-visible:border-emerald-400 focus-visible:ring-emerald-100",
    valueCls: "text-emerald-700 font-bold",
    badgeEl: (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
        <CheckCircle2 className="h-2.5 w-2.5" /> Normal
      </span>
    ),
  },
  high: {
    rowCls: "bg-red-50/40",
    inputBorder:
      "border-red-200 focus-visible:border-red-400 focus-visible:ring-red-100",
    valueCls: "text-red-700 font-bold",
    badgeEl: (
      <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700">
        <TrendingUp className="h-2.5 w-2.5" /> High
      </span>
    ),
  },
  low: {
    rowCls: "bg-orange-50/40",
    inputBorder:
      "border-orange-200 focus-visible:border-orange-400 focus-visible:ring-orange-100",
    valueCls: "text-orange-700 font-bold",
    badgeEl: (
      <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-700">
        <TrendingDown className="h-2.5 w-2.5" /> Low
      </span>
    ),
  },
  empty: {
    rowCls: "hover:bg-slate-50/60",
    inputBorder:
      "border-slate-200 focus-visible:border-indigo-400 focus-visible:ring-indigo-100",
    valueCls: "text-slate-800",
    badgeEl: null,
  },
};

// ─── ProgressRing ─────────────────────────────────────────────────────────────

function ProgressRing({
  percent,
  size = 40,
  stroke = 3.5,
  color = "#6366f1",
}: Readonly<{
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
}>) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: "stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </svg>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function LabReportAccordionExampleDemo3() {
  const [activeGroupId, setActiveGroupId] = useState<string>(
    TEST_GROUPS[0]!.id,
  );

  // Stable index map — O(1) lookup, computed once
  const testIndexMap = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    TEST_GROUPS.flatMap((g) => g.tests).forEach((t, i) => {
      map[t.id] = i;
    });
    return map;
  }, []);

  const allTests = useMemo(
    () =>
      TEST_GROUPS.flatMap((g) =>
        g.tests.map((t) => ({ id: t.id, resultValue: "" })),
      ),
    [],
  );

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: { tests: allTests },
    mode: "onChange",
  });

  const watchedTests = form.watch("tests");

  // Per-group completion stats — reactive on watchedTests
  const groupStats = useMemo(() => {
    const stats: Record<string, { filled: number; total: number }> = {};
    TEST_GROUPS.forEach((group) => {
      let filled = 0;
      group.tests.forEach((t) => {
        const val = watchedTests[testIndexMap[t.id]!]?.resultValue ?? "";
        if (val.trim() !== "") filled++;
      });
      stats[group.id] = { filled, total: group.tests.length };
    });
    return stats;
  }, [watchedTests, testIndexMap]);

  const totalTests = TEST_GROUPS.flatMap((g) => g.tests).length;
  const totalFilled = Object.values(groupStats).reduce(
    (s, g) => s + g.filled,
    0,
  );
  const overallPct = Math.round((totalFilled / totalTests) * 100);

  // Live per-row status
  const getLiveStatus = useCallback(
    (testId: string, low: number, high: number): ResultStatus => {
      const val = watchedTests[testIndexMap[testId]!]?.resultValue ?? "";
      return getResultStatus(val, low, high);
    },
    [watchedTests, testIndexMap],
  );

  // Keyboard: Enter advances to next input in the group
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    testId: string,
    groupTests: TestDef[],
  ): void {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const idx = groupTests.findIndex((t) => t.id === testId);
    const next = groupTests[idx + 1];
    if (next) inputRefs.current[next.id]?.focus();
  }

  function onSubmit(values: ReportFormValues): void {
    console.log("Submitted:", values);
  }

  const activeGroupIndex = TEST_GROUPS.findIndex((g) => g.id === activeGroupId);
  const isLastGroup = activeGroupIndex === TEST_GROUPS.length - 1;

  function goToNextGroup(): void {
    const next = TEST_GROUPS[activeGroupIndex + 1];
    if (next) setActiveGroupId(next.id);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-5">
        {/* ════════════════════════════════════════
            PAGE HEADER
        ════════════════════════════════════════ */}
        <div
          className="overflow-hidden rounded-lg border bg-card"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.05)",
          }}
        >
          {/* Gradient top stripe */}
          <div className="h-0.75 bg-linear-to-r from-chart-1 via-chart-3 to-chart-5" />

          <div className="p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* Title block */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg font-bold tracking-tight">
                      Patient Report Entry
                    </h1>
                  </div>
                  <p className="mt-0.5 text-[13px] text-slate-500">
                    Enter results section by section. Press Enter to advance
                    rows.
                  </p>
                </div>
              </div>

              {/* Patient info + ring */}
              <div className="flex items-center gap-5">
                <div className="grid grid-cols-1 gap-3 rounded-xl border bg-muted px-4 py-3 sm:grid-cols-3">
                  {(
                    [
                      {
                        label: "Patient",
                        value: "Mr. John Doe",
                        icon: <UserRound className="h-3 w-3" />,
                      },
                      {
                        label: "Age / Gender",
                        value: "28 Yrs / Male",
                        icon: null,
                      },
                      { label: "Ref. Doctor", value: "Dr. Sharma", icon: null },
                    ] as const
                  ).map(({ label, value, icon }) => (
                    <div key={label}>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold">
                        {icon}
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Circular progress (desktop) */}
                <div className="hidden shrink-0 flex-col items-center gap-1 lg:flex">
                  <div className="relative">
                    <ProgressRing
                      percent={overallPct}
                      size={52}
                      stroke={4}
                      color="#6366f1"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-indigo-600">
                      {overallPct}%
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Done
                  </span>
                </div>
              </div>
            </div>

            {/* Overall progress bar */}
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                  Overall Progress
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {totalFilled} / {totalTests} parameters
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            MAIN GRID
        ════════════════════════════════════════ */}
        <div className="grid gap-5 lg:grid-cols-[268px_1fr]">
          {/* ── Sidebar ── */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white"
              style={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                  Test Groups
                </span>
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold text-slate-500"
                >
                  {TEST_GROUPS.length} groups
                </Badge>
              </div>

              <ScrollArea className="h-auto lg:max-h-[calc(100vh-260px)]">
                <div className="space-y-1 p-2.5">
                  {TEST_GROUPS.map((group) => {
                    const stats = groupStats[group.id]!;
                    const isActive = group.id === activeGroupId;
                    const isComplete = stats.filled === stats.total;
                    const pct = Math.round((stats.filled / stats.total) * 100);

                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveGroupId(group.id)}
                        className={[
                          "w-full rounded-xl border p-3.5 text-left transition-all duration-150",
                          isActive
                            ? "border-indigo-200 bg-indigo-50/70 shadow-sm"
                            : "border-transparent hover:border-slate-200 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-3">
                          {/* Icon pill */}
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition-colors"
                            style={{
                              background: isComplete
                                ? "#10b981"
                                : group.accentColor,
                            }}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              group.icon
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between">
                              <span
                                className={`text-[13px] font-semibold ${
                                  isActive
                                    ? "text-indigo-700"
                                    : "text-slate-700"
                                }`}
                              >
                                {group.name}
                              </span>
                              <span className="ml-1 shrink-0 text-[11px] font-medium text-slate-400">
                                {stats.filled}/{stats.total}
                              </span>
                            </div>
                            {/* Mini progress */}
                            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${pct}%`,
                                  background: isComplete
                                    ? "#10b981"
                                    : group.accentColor,
                                }}
                              />
                            </div>
                          </div>

                          <ChevronRight
                            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                              isActive
                                ? "rotate-90 text-indigo-500"
                                : "text-slate-300"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* ── Form Area ── */}
          <div>
            <form
              id="patient-report-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <Accordion
                value={[activeGroupId]}
                onValueChange={(value) => {
                  if (!value) return;
                  setActiveGroupId(value[0]);
                }}
                className="space-y-3"
              >
                {TEST_GROUPS.map((group) => {
                  const stats = groupStats[group.id]!;
                  const isComplete = stats.filled === stats.total;
                  const pct = Math.round((stats.filled / stats.total) * 100);
                  const isOpen = group.id === activeGroupId;

                  return (
                    <AccordionItem
                      key={group.id}
                      value={group.id}
                      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white"
                      style={
                        isOpen
                          ? {
                              boxShadow:
                                "0 2px 6px rgba(0,0,0,0.04), 0 8px 28px rgba(0,0,0,0.06)",
                            }
                          : { boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }
                      }
                    >
                      {/* ── Accordion trigger ── */}
                      <AccordionTrigger
                        className="px-6 py-4 hover:no-underline data-[state=open]:border-b data-[state=open]:border-slate-100"
                        onClick={() => setActiveGroupId(group.id)}
                      >
                        <div className="flex w-full items-center justify-between pr-2">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white transition-colors duration-200"
                              style={{
                                background: isComplete
                                  ? "#10b981"
                                  : group.accentColor,
                              }}
                            >
                              {isComplete ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                group.icon
                              )}
                            </div>
                            <div className="text-left">
                              <p className="text-[14px] font-bold text-slate-900">
                                {group.name}
                              </p>
                              <p className="text-[11.5px] text-slate-400">
                                {stats.filled} of {stats.total} parameters
                                filled
                              </p>
                            </div>
                          </div>

                          {/* Status badge */}
                          {isComplete ? (
                            <Badge className="gap-1 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 text-[10px] font-bold uppercase tracking-wide">
                              <CheckCircle2 className="h-2.5 w-2.5" /> Done
                            </Badge>
                          ) : stats.filled > 0 ? (
                            <Badge className="gap-1 bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-50 text-[10px] font-bold uppercase tracking-wide">
                              {pct}% filled
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-[10px] font-semibold text-slate-400"
                            >
                              Pending
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>

                      {/* ── Accordion content ── */}
                      <AccordionContent className="p-0">
                        {/* Column headers */}
                        <div className="grid grid-cols-12 border-b bg-slate-50/80 px-6 py-2.5 text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400">
                          <div className="col-span-4">Parameter</div>
                          <div className="col-span-3">Result</div>
                          <div className="col-span-2 text-center">Unit</div>
                          <div className="col-span-2">Ref. Range</div>
                          <div className="col-span-1 text-center">Status</div>
                        </div>

                        {/* Test rows */}
                        {group.tests.map((test, rowIdx) => {
                          const fieldIndex = testIndexMap[test.id]!;
                          const status = getLiveStatus(
                            test.id,
                            test.low,
                            test.high,
                          );
                          const cfg = STATUS_CFG[status];

                          return (
                            <div
                              key={test.id}
                              className={[
                                "grid grid-cols-12 items-center border-b px-6 py-3.5 last:border-0 transition-colors duration-150",
                                cfg.rowCls,
                              ].join(" ")}
                            >
                              {/* Parameter name */}
                              <div className="col-span-4 pr-3">
                                <p className="text-[13px] font-medium text-slate-700">
                                  {test.name}
                                </p>
                                {rowIdx === 0 && (
                                  <p className="mt-0.5 text-[10px] text-slate-400">
                                    Press Enter to advance
                                  </p>
                                )}
                              </div>

                              {/* Input */}
                              <div className="col-span-3 pr-4">
                                <Controller
                                  control={form.control}
                                  name={`tests.${fieldIndex}.resultValue`}
                                  render={({ field, fieldState }) => (
                                    <div>
                                      <Input
                                        {...field}
                                        ref={(el) => {
                                          inputRefs.current[test.id] = el;
                                          if (typeof field.ref === "function")
                                            field.ref(el);
                                        }}
                                        id={`input-${test.id}`}
                                        type="number"
                                        step="any"
                                        autoComplete="off"
                                        placeholder="—"
                                        onKeyDown={(e) =>
                                          handleKeyDown(e, test.id, group.tests)
                                        }
                                        className={[
                                          "h-9 rounded-xl font-mono text-[13.5px] shadow-none",
                                          "placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-offset-0",
                                          fieldState.invalid
                                            ? "border-red-300 focus-visible:border-red-400 focus-visible:ring-red-100"
                                            : cfg.inputBorder,
                                          cfg.valueCls,
                                        ].join(" ")}
                                      />
                                      {fieldState.invalid && (
                                        <p className="mt-0.5 text-[11px] text-red-500">
                                          {fieldState.error?.message}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                />
                              </div>

                              {/* Unit */}
                              <div className="col-span-2 text-center font-mono text-[12px] text-slate-400">
                                {test.unit}
                              </div>

                              {/* Range */}
                              <div className="col-span-2 font-mono text-[12px] text-slate-400">
                                {test.range}
                              </div>

                              {/* Status badge */}
                              <div className="col-span-1 flex justify-center">
                                {cfg.badgeEl}
                              </div>
                            </div>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* ════════════════════════════════════════
                  STICKY FOOTER
              ════════════════════════════════════════ */}
              <div
                className="sticky bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-3.5 backdrop-blur-sm"
                style={{
                  boxShadow:
                    "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {/* Progress summary */}
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <ProgressRing
                      percent={overallPct}
                      size={38}
                      stroke={3.5}
                      color="#6366f1"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                      {overallPct}%
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Progress
                    </p>
                    <p className="text-[13px] font-bold text-slate-800">
                      {totalFilled} / {totalTests} filled
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5">
                  {!isLastGroup && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={goToNextGroup}
                      className="h-9 gap-1.5 rounded-xl border-slate-200 text-[13px] font-semibold text-slate-600 shadow-none hover:bg-slate-50"
                    >
                      Next Group
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  )}

                  <Button
                    form="patient-report-form"
                    type="submit"
                    size="sm"
                    className="h-9 gap-1.5 rounded-xl text-[13px] font-semibold text-white shadow-none"
                    style={{
                      background:
                        "linear-gradient(135deg,#6366f1 0%,#818cf8 100%)",
                      boxShadow: "0 2px 8px rgba(99,102,241,0.28)",
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Save Report
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
