"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, useTransition } from "react";
import { Control, Controller, useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Field, FieldError } from "@/components/ui/field";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { GetPatientReportByIdType } from "@/actions/patient-report/get-patient-report";
import { SavePatientReport } from "@/actions/patient-report/save-patient-report";
import { tryCatch } from "@/utils/try-catch";
import {
  ReportFormValues,
  reportSchema,
} from "@/validation/patient-report-form";
import {
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Loader,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ResultFormProps {
  report: GetPatientReportByIdType;
}

function ResultValueInput({
  control,
  fieldIndex,
}: {
  control: Control<ReportFormValues>;
  fieldIndex: number;
}) {
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
            />
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
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
        group.tests.map((test) => ({
          id: test.id,
          resultValue: test.resultValue ?? "",
        })),
      ),
    [],
  );

  const hasExistingResults = report.testGroups.some((group) =>
    group.tests.some((test) => test.resultValue),
  );

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      tests: allTests,
    },
    mode: "onSubmit",
  });

  function getFieldIndex(testId: string) {
    return form.getValues("tests").findIndex((item) => item.id === testId);
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

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto space-y-4">
        <Card className="rounded-lg border-none shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <FlaskConical className="size-5" />
                  </div>

                  <Badge variant="secondary" className="max-w-full truncate">
                    Laboratory Information System
                  </Badge>
                </div>

                <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                  Patient Report Entry
                </h1>

                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {hasExistingResults ? "Update" : "Enter"} patient test results
                  and continue section by section.
                </p>
              </div>

              <div className="grid w-full min-w-0 grid-cols-1 gap-4 rounded-lg border bg-muted/20 p-4 sm:grid-cols-2 lg:max-w-xl lg:grid-cols-3">
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
          </CardContent>
        </Card>

        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,320px)_1fr]">
          <Card className="hidden rounded-lg border-none shadow-sm lg:block lg:sticky lg:top-6 lg:h-fit">
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Test Groups
                </h2>

                <Badge variant="outline">
                  {report.testGroups.length} Groups
                </Badge>
              </div>

              <ScrollArea className="h-75 lg:h-[calc(100vh-380px)]">
                <div className="space-y-3 pr-2">
                  {report.testGroups.map((group) => {
                    const isActive = group.id === activeGroupId;

                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveGroupId(group.id)}
                        className={`w-full rounded-lg border p-4 text-left transition-all ${
                          isActive
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/40 hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold capitalize">
                              {group.testGroup.name}
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {group.tests.length} Parameters
                            </p>
                          </div>

                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${
                              isActive &&
                              "border-primary bg-primary text-primary-foreground"
                            }`}
                          >
                            <ChevronRight className="size-4" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="min-w-0">
            <form
              id="patient-report-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 pb-20 md:pb-0"
            >
              <Accordion
                value={[activeGroup.id]}
                defaultValue={[activeGroup.id]}
                onValueChange={(value) => {
                  if (!value) return;
                  setActiveGroupId(value[0]);
                }}
                className="space-y-4"
              >
                {report.testGroups.map((group) => (
                  <AccordionItem
                    key={group.id}
                    value={group.id}
                    className="overflow-hidden rounded-lg border bg-card shadow-sm"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:no-underline sm:px-6 sm:py-5">
                      <div className="flex min-w-0 items-center gap-3 text-left">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <FlaskConical className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <h2 className="truncate font-semibold capitalize">
                            {group.testGroup.name}
                          </h2>

                          <p className="text-sm text-muted-foreground">
                            {hasExistingResults ? "Update" : "Enter"} patient
                            test result values.
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-0">
                      <div className="overflow-x-auto">
                        <div className="min-w-0 md:min-w-190">
                          <div className="hidden border-y bg-muted/20 px-4 py-4 text-sm font-semibold md:grid md:grid-cols-12 sm:px-6">
                            <div className="col-span-4">Parameter</div>

                            <div className="col-span-3">Result</div>

                            <div className="col-span-2 text-center">Unit</div>

                            <div className="col-span-3">Reference Range</div>
                          </div>

                          {group.tests.map((test) => {
                            const fieldIndex = getFieldIndex(test.id);

                            return (
                              <div
                                key={test.id}
                                className="border-b px-4 py-4 last:border-none sm:px-6 md:grid md:grid-cols-12 md:items-center"
                              >
                                <div className="min-w-0 md:col-span-4 md:pr-2">
                                  <p className="font-medium">
                                    {test.test.name}
                                  </p>
                                </div>

                                <div className="mt-3 md:col-span-3 md:mt-0 md:pr-4">
                                  <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground md:sr-only">
                                    Result
                                  </p>
                                  <ResultValueInput
                                    control={form.control}
                                    fieldIndex={fieldIndex}
                                  />
                                </div>

                                <div className="mt-3 md:col-span-2 md:mt-0 md:text-center">
                                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground md:sr-only">
                                    Unit
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {test.test.testUnit.name}
                                  </p>
                                </div>

                                <div className="mt-3 md:col-span-3 md:mt-0">
                                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground md:sr-only">
                                    Reference Range
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {test.test.normalValueMale}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-card/95 p-4 backdrop-blur md:static md:inset-auto md:flex md:justify-end md:rounded-lg md:border">
                <Button
                  form="patient-report-form"
                  type="submit"
                  size="lg"
                  disabled={pending}
                  className="w-full md:ml-auto md:w-auto"
                >
                  {pending ? (
                    <>
                      Saving... <Loader className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 size-5" />
                      {hasExistingResults ? "Update & Next" : "Save & Next"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
