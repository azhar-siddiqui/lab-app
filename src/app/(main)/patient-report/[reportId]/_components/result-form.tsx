"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

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
import { toast } from "sonner";

interface ResultFormProps {
  report: GetPatientReportByIdType;
}

export function ResultForm({ report }: Readonly<ResultFormProps>) {
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
          resultValue: "",
        })),
      ),
    [],
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
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto  space-y-6">
        <Card className="rounded-lg border-none shadow-sm">
          <CardContent>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                    <FlaskConical className="size-5" />
                  </div>

                  <Badge variant="secondary">
                    Laboratory Information System
                  </Badge>
                </div>

                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Patient Report Entry
                </h1>

                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  Enter patient test results and continue section by section.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Patient
                  </p>

                  <div className="mt-1 flex items-center gap-2 font-medium">
                    <UserRound className="size-4" />
                    {report.patient.name}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Age / Gender
                  </p>

                  <p className="mt-1 font-medium">
                    {`${report.patient.age} ${report.patient.ageType} / ${report.patient.gender}`}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Ref. Doctor
                  </p>

                  <p className="mt-1 font-medium">{report.doctor.name}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="rounded-lg border-none shadow-sm lg:sticky lg:top-6 lg:h-fit">
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Test Groups
                </h2>

                <Badge variant="outline">
                  {report.testGroups.length} Groups
                </Badge>
              </div>

              <ScrollArea className="h-75 lg:h-[calc(100vh-220px)]">
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
                            <h3 className="font-semibold">
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

          <div>
            <form
              id="patient-report-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
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
                    className="bg-card overflow-hidden rounded-lg shadow-sm border"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10">
                          <FlaskConical className="size-4" />
                        </div>

                        <div>
                          <h2 className="font-semibold">
                            {group.testGroup.name}
                          </h2>

                          <p className="text-sm text-muted-foreground">
                            Enter patient test values.
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="overflow-x-auto">
                        <div className="min-w-190">
                          <div className="grid grid-cols-12 border-y bg-muted/20 px-6 py-4 text-sm font-semibold">
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
                                className="grid grid-cols-12 items-center border-b px-6 py-4 last:border-none"
                              >
                                <div className="col-span-4">
                                  <p className="font-medium">
                                    {test.test.name}
                                  </p>
                                </div>

                                <div className="col-span-3 pr-4">
                                  <Controller
                                    control={form.control}
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

                                        {fieldState.invalid && (
                                          <FieldError
                                            errors={[fieldState.error]}
                                          />
                                        )}
                                      </Field>
                                    )}
                                  />
                                </div>

                                <div className="col-span-2 text-center text-sm text-muted-foreground">
                                  {test.test.testUnit.name}
                                </div>

                                <div className="col-span-3 text-sm text-muted-foreground">
                                  {test.test.normalValueMale}
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

              <div className="sticky bottom-4 flex justify-end rounded-lg bg-card p-4 backdrop-blur border">
                <Button
                  form="patient-report-form"
                  type="submit"
                  size="lg"
                  disabled={pending}
                >
                  {pending ? (
                    <>
                      Saving... <Loader className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 size-5" />
                      Save & Next
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
