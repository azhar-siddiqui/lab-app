"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, useTransition } from "react";
import { Control, Controller, useForm, useWatch } from "react-hook-form";

import { Field, FieldError } from "@/components/ui/field";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { GetPatientReportByIdType } from "@/actions/patient-report/get-patient-report";
import { SavePatientReport } from "@/actions/patient-report/save-patient-report";
import {
  getReferenceRange,
  getTestStatus,
  type TestStatus,
} from "@/lib/report-range";
import { cn } from "@/lib/utils";
import { tryCatch } from "@/utils/try-catch";
import {
  ReportFormValues,
  reportSchema,
} from "@/validation/patient-report-form";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Loader,
  TrendingDown,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ResultFormProps {
  report: GetPatientReportByIdType;
}

type GroupStats = Record<string, { filled: number; total: number }>;

type ReportTestItem =
  GetPatientReportByIdType["testGroups"][number]["tests"][number];

function isReportEntryTest(test: ReportTestItem) {
  return !test.test.isOptionalTest;
}

function getEntryTests(tests: ReportTestItem[]) {
  return tests.filter(isReportEntryTest);
}

const STATUS_CONFIG: Record<
  TestStatus | "empty",
  {
    label: string;
    badgeClass: string;
    inputClass: string;
    rowClass: string;
    icon: React.ReactNode;
  }
> = {
  empty: {
    label: "Pending",
    badgeClass: "border-transparent bg-muted/60 text-muted-foreground",
    inputClass: "",
    rowClass: "",
    icon: null,
  },
  normal: {
    label: "Normal",
    badgeClass:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400",
    inputClass: "border-emerald-200 focus-visible:ring-emerald-100",
    rowClass: "bg-emerald-50/30 dark:bg-emerald-950/20",
    icon: <CheckCircle2 className="size-3" />,
  },
  high: {
    label: "High",
    badgeClass:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400",
    inputClass: "border-amber-300 focus-visible:ring-amber-100",
    rowClass: "bg-amber-50/40 dark:bg-amber-950/20",
    icon: <TrendingUp className="size-3" />,
  },
  low: {
    label: "Low",
    badgeClass:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-400",
    inputClass: "border-sky-300 focus-visible:ring-sky-100",
    rowClass: "bg-sky-50/40 dark:bg-sky-950/20",
    icon: <TrendingDown className="size-3" />,
  },
};

function ResultValueInput({
  control,
  fieldIndex,
  status,
}: {
  control: Control<ReportFormValues>;
  fieldIndex: number;
  status: TestStatus | "empty";
}) {
  const cfg = STATUS_CONFIG[status];

  return (
    <Controller
      control={control}
      name={`tests.${fieldIndex}.resultValue`}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              placeholder="Enter result"
              autoFocus={true}
              className={cn(
                "h-9 font-mono text-sm",
                !fieldState.invalid && cfg.inputClass,
              )}
            />
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function TestStatusBadge({ status }: { status: TestStatus | "empty" }) {
  const cfg = STATUS_CONFIG[status];

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        cfg.badgeClass,
      )}
    >
      {cfg.icon}
      {cfg.label}
    </Badge>
  );
}

function TestGroupList({
  groups,
  activeGroupId,
  groupStats,
  onSelect,
  className,
}: {
  groups: GetPatientReportByIdType["testGroups"];
  activeGroupId: string | undefined;
  groupStats: GroupStats;
  onSelect: (groupId: string) => void;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "rounded-xl border-none shadow-sm ring-1 ring-foreground/10",
        className,
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b px-4 py-3.5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Test Groups
          </h2>
          <Badge variant="outline" className="text-[10px] font-semibold">
            {groups.length} Groups
          </Badge>
        </div>

        <ScrollArea className="@3xl:max-h-[calc(100dvh-22rem)]">
          <div className="space-y-1.5 p-3">
            {groups.map((group) => {
              const isActive = group.id === activeGroupId;
              const stats = groupStats[group.id] ?? {
                filled: 0,
                total: getEntryTests(group.tests).length,
              };
              const isComplete =
                stats.total > 0 && stats.filled === stats.total;
              const pct =
                stats.total > 0
                  ? Math.round((stats.filled / stats.total) * 100)
                  : 0;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => onSelect(group.id)}
                  className={cn(
                    "w-full rounded-xl border p-3.5 text-left transition-all duration-150",
                    isActive
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : "border-transparent hover:border-border hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isComplete
                          ? "bg-emerald-500 text-white"
                          : isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary",
                      )}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <FlaskConical className="size-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={cn(
                            "truncate text-sm font-semibold capitalize",
                            isActive ? "text-primary" : "text-foreground",
                          )}
                        >
                          {group.testGroup.name}
                        </span>
                        <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                          {stats.filled}/{stats.total}
                        </span>
                      </div>

                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-300",
                            isComplete ? "bg-emerald-500" : "bg-primary",
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <ChevronRight
                      className={cn(
                        "size-4 shrink-0 transition-transform",
                        isActive
                          ? "rotate-90 text-primary"
                          : "text-muted-foreground/50",
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function TestGroupDetailForm({
  group,
  report,
  control,
  getFieldIndex,
  getLiveStatus,
  hasExistingResults,
  pending,
  isAllGroupsComplete,
  onNext,
}: {
  group: GetPatientReportByIdType["testGroups"][number];
  report: GetPatientReportByIdType;
  control: Control<ReportFormValues>;
  getFieldIndex: (testId: string) => number;
  getLiveStatus: (testId: string) => TestStatus | "empty";
  hasExistingResults: boolean;
  pending: boolean;
  isAllGroupsComplete: boolean;
  onNext: () => void;
}) {
  const entryTests = getEntryTests(group.tests);
  const filledCount = entryTests.filter(
    (test) => getLiveStatus(test.id) !== "empty",
  ).length;
  const isComplete =
    entryTests.length === 0 || filledCount === entryTests.length;

  return (
    <Card className="min-w-0 overflow-hidden rounded-xl border-none shadow-sm ring-1 ring-foreground/10">
      <div className="border-b bg-muted/20 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-xl",
                isComplete
                  ? "bg-emerald-500 text-white"
                  : "bg-primary/10 text-primary",
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <FlaskConical className="size-4" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold capitalize sm:text-lg">
                {group.testGroup.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filledCount} of {entryTests.length} parameters filled
              </p>
            </div>
          </div>

          {isComplete ? (
            <Badge className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              <CheckCircle2 className="size-3" />
              Complete
            </Badge>
          ) : filledCount > 0 ? (
            <Badge
              variant="secondary"
              className="gap-1 text-[10px] font-semibold uppercase tracking-wide"
            >
              <AlertCircle className="size-3" />
              In progress
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] font-semibold">
              Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="min-w-0 overflow-x-auto">
        <div className="min-w-0 @3xl:min-w-full">
          <div className="hidden border-b bg-muted/30 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground @3xl:grid @3xl:grid-cols-12 sm:px-6">
            <div className="col-span-4">Parameter</div>
            <div className="col-span-3">Result</div>
            <div className="col-span-2 text-center">Unit</div>
            <div className="col-span-2">Ref. Range</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          <div className="divide-y">
            {entryTests.map((test) => {
              const fieldIndex = getFieldIndex(test.id);
              const status = getLiveStatus(test.id);
              const cfg = STATUS_CONFIG[status];

              return (
                <div
                  key={test.id}
                  className={cn(
                    "px-4 py-4 transition-colors sm:px-6 @3xl:grid @3xl:grid-cols-12 @3xl:items-center @3xl:py-3.5",
                    cfg.rowClass,
                  )}
                >
                  <div className="min-w-0 @3xl:col-span-4 @3xl:pr-3">
                    <p className="text-sm font-medium">{test.test.name}</p>
                  </div>

                  <div className="mt-3 @3xl:col-span-3 @3xl:mt-0 @3xl:pr-4">
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground @3xl:sr-only">
                      Result
                    </p>
                    <ResultValueInput
                      control={control}
                      fieldIndex={fieldIndex}
                      status={status}
                    />
                  </div>

                  <div className="mt-3 @3xl:col-span-2 @3xl:mt-0 @3xl:text-center">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground @3xl:sr-only">
                      Unit
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                      {test.test.testUnit.name}
                    </p>
                  </div>

                  <div className="mt-3 @3xl:col-span-2 @3xl:mt-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground @3xl:sr-only">
                      Reference Range
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                      {getReferenceRange(
                        test.test.normalValueMale,
                        test.test.normalValueFemale,
                        report.patient.gender,
                      )}
                    </p>
                  </div>

                  <div className="mt-3 flex @3xl:col-span-1 @3xl:mt-0 @3xl:justify-center">
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground @3xl:sr-only">
                      Status
                    </p>
                    <TestStatusBadge status={status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 mx-4 mb-4 mt-2 flex flex-col gap-3 rounded-xl border bg-card/95 px-4 py-3.5 shadow-md backdrop-blur-sm sm:mx-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {isAllGroupsComplete
            ? `All parameters filled. ${hasExistingResults ? "Update" : "Save"} to continue to preview.`
            : isComplete
              ? "This group is complete. Continue to the next test group."
              : "Fill all parameters in this group to continue."}
        </p>
        {isAllGroupsComplete ? (
          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="sm:w-auto"
          >
            {pending ? (
              <>
                Saving... <Loader className="animate-spin" />
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 size-5" />
                {hasExistingResults ? "Update & Preview" : "Save & Preview"}
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            disabled={pending}
            className="sm:w-auto"
            onClick={onNext}
          >
            Next
            <ChevronRight className="ml-2 size-5" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export function ResultForm({ report }: Readonly<ResultFormProps>) {
  const router = useRouter();
  const [activeGroupId, setActiveGroupId] = useState(report.testGroups[0]?.id);
  const [pending, startTransition] = useTransition();

  const activeGroup =
    report.testGroups.find((group) => group.id === activeGroupId) ??
    report.testGroups[0];

  const allTests = useMemo(
    () =>
      report.testGroups.flatMap((group) =>
        getEntryTests(group.tests).map((test) => ({
          id: test.id,
          resultValue: test.resultValue ?? "",
        })),
      ),
    [report.testGroups],
  );

  const hasExistingResults = report.testGroups.some((group) =>
    getEntryTests(group.tests).some((test) => test.resultValue),
  );

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      tests: allTests,
    },
    mode: "onSubmit",
  });

  const watchedTests = useWatch({
    control: form.control,
    name: "tests",
    defaultValue: allTests,
  });

  const groupStats = useMemo(() => {
    const stats: GroupStats = {};

    for (const group of report.testGroups) {
      const entryTests = getEntryTests(group.tests);
      const total = entryTests.length;
      const filled = entryTests.filter((test) => {
        const item = watchedTests?.find((entry) => entry.id === test.id);
        return Boolean(item?.resultValue?.trim());
      }).length;

      stats[group.id] = { filled, total };
    }

    return stats;
  }, [report.testGroups, watchedTests]);

  const totalFilled = Object.values(groupStats).reduce(
    (sum, stat) => sum + stat.filled,
    0,
  );
  const totalTests = Object.values(groupStats).reduce(
    (sum, stat) => sum + stat.total,
    0,
  );
  const overallPct =
    totalTests > 0 ? Math.round((totalFilled / totalTests) * 100) : 0;

  const isAllGroupsComplete =
    totalTests === 0 || totalFilled === totalTests;

  function getFieldIndex(testId: string) {
    return form.getValues("tests").findIndex((item) => item.id === testId);
  }

  function getLiveStatus(testId: string): TestStatus | "empty" {
    const item = watchedTests?.find((entry) => entry.id === testId);
    const value = item?.resultValue?.trim();

    if (!value) return "empty";

    const test = report.testGroups
      .flatMap((group) => group.tests)
      .find((entry) => entry.id === testId);

    if (!test) return "empty";

    return (
      getTestStatus(
        value,
        test.test.normalValueMale,
        test.test.normalValueFemale,
        report.patient.gender,
      ) ?? "empty"
    );
  }

  async function handleNext() {
    if (!activeGroup) return;

    const fieldNames = getEntryTests(activeGroup.tests).map(
      (test) => `tests.${getFieldIndex(test.id)}.resultValue` as const,
    );
    const isCurrentGroupValid = await form.trigger(fieldNames);

    if (!isCurrentGroupValid) {
      toast.error("Please fill all parameters in this group");
      return;
    }

    const currentIndex = report.testGroups.findIndex(
      (group) => group.id === activeGroupId,
    );

    for (
      let index = currentIndex + 1;
      index < report.testGroups.length;
      index++
    ) {
      const group = report.testGroups[index];
      const stats = groupStats[group.id];

      if (stats.filled < stats.total) {
        setActiveGroupId(group.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    for (let index = 0; index < currentIndex; index++) {
      const group = report.testGroups[index];
      const stats = groupStats[group.id];

      if (stats.filled < stats.total) {
        setActiveGroupId(group.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
  }

  function onSubmit(values: ReportFormValues) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(SavePatientReport(values));

      if (error) {
        toast.error(
          error.message ?? "An unexpected error occor please try again",
        );
      }

      if (result?.status === "success") {
        toast.success(result.message);
        router.push(`/patient-report/${report.id}/preview`);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  if (!activeGroup) {
    return null;
  }

  return (
    <div className="@container mx-auto w-full min-w-0 max-w-7xl space-y-4 overflow-x-hidden">
      <Card className="overflow-hidden rounded-xl border-none shadow-sm ring-1 ring-foreground/10">
        <div className="h-1 bg-linear-to-r from-primary/80 via-primary to-primary/60" />
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                  <FlaskConical className="size-5" />
                </div>

                <Badge variant="secondary" className="max-w-full truncate">
                  Laboratory Information System
                </Badge>
              </div>

              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Patient Report Entry
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                {hasExistingResults ? "Update" : "Enter"} patient test results
                section by section.
              </p>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2 lg:max-w-xl lg:grid-cols-3">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Patient
                </p>
                <div className="mt-1 flex min-w-0 items-center gap-2 font-medium">
                  <UserRound className="size-4 shrink-0" />
                  <span className="truncate">{report.patient.name}</span>
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Age / Gender
                </p>
                <p className="mt-1 truncate font-medium">
                  {`${report.patient.age} ${report.patient.ageType} / ${report.patient.gender}`}
                </p>
              </div>

              <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ref. Doctor
                </p>
                <p className="mt-1 truncate font-medium">
                  {report.doctor.name}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span>Overall Progress</span>
              <span>
                {totalFilled} / {totalTests} parameters ({overallPct}%)
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid min-w-0 grid-cols-1 gap-4 @3xl:grid-cols-12 @3xl:gap-6">
        <div className="min-w-0 @3xl:col-span-4">
          <div className="@3xl:sticky @3xl:top-6">
            <TestGroupList
              groups={report.testGroups}
              activeGroupId={activeGroupId}
              groupStats={groupStats}
              onSelect={setActiveGroupId}
            />
          </div>
        </div>

        <div className="min-w-0 @3xl:col-span-8">
          <form id="patient-report-form" onSubmit={form.handleSubmit(onSubmit)}>
            <TestGroupDetailForm
              group={activeGroup}
              report={report}
              control={form.control}
              getFieldIndex={getFieldIndex}
              getLiveStatus={getLiveStatus}
              hasExistingResults={hasExistingResults}
              pending={pending}
              isAllGroupsComplete={isAllGroupsComplete}
              onNext={handleNext}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
