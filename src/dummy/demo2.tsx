"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

import {
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  UserRound,
} from "lucide-react";

const reportSchema = z.object({
  tests: z.array(
    z.object({
      id: z.string(),
      resultValue: z.string().min(1, "Result is required"),
    }),
  ),
});

type ReportFormValues = z.infer<typeof reportSchema>;

const testGroups = [
  {
    id: "blood-sugar",
    name: "Blood Sugar",
    tests: [
      {
        id: "fbs",
        name: "Fasting Blood Sugar",
        unit: "mg/dL",
        range: "70 - 100",
      },
      {
        id: "ppbs",
        name: "PP Blood Sugar",
        unit: "mg/dL",
        range: "100 - 140",
      },
    ],
  },
  {
    id: "cbc",
    name: "CBC",
    tests: [
      {
        id: "hb",
        name: "Hemoglobin",
        unit: "g/dL",
        range: "13 - 17",
      },
      {
        id: "wbc",
        name: "WBC",
        unit: "cells/cumm",
        range: "4000 - 11000",
      },
    ],
  },
  {
    id: "thyroid",
    name: "Thyroid Profile",
    tests: [
      {
        id: "t3",
        name: "T3",
        unit: "ng/dL",
        range: "80 - 200",
      },
      {
        id: "t4",
        name: "T4",
        unit: "µg/dL",
        range: "5 - 12",
      },
    ],
  },
];

export function LabReportAccordionExampleDemo2() {
  const [activeGroupId, setActiveGroupId] = useState(testGroups[0]?.id);

  const allTests = useMemo(
    () =>
      testGroups.flatMap((group) =>
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
    console.log(values);
  }

  const activeGroup =
    testGroups.find((group) => group.id === activeGroupId) ?? testGroups[0];

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
                    Mr. John Doe
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Age / Gender
                  </p>

                  <p className="mt-1 font-medium">28 Years / Male</p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Ref. Doctor
                  </p>

                  <p className="mt-1 font-medium">Dr. Sharma</p>
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

                <Badge variant="outline">{testGroups.length} Groups</Badge>
              </div>

              <ScrollArea className="h-75 lg:h-[calc(100vh-220px)]">
                <div className="space-y-3 pr-2">
                  {testGroups.map((group, index) => {
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
                            <h3 className="font-semibold">{group.name}</h3>

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
                {testGroups.map((group) => (
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
                          <h2 className="font-semibold">{group.name}</h2>

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
                                  <p className="font-medium">{test.name}</p>
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
                                  {test.unit}
                                </div>

                                <div className="col-span-3 text-sm text-muted-foreground">
                                  {test.range}
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
                <Button form="patient-report-form" type="submit" size="lg">
                  <CheckCircle2 className="mr-2 size-5" />
                  Save & Next
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
