"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { GetPatientReportByIdType } from "@/actions/patient-report/get-patient-report";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PrinterIcon } from "lucide-react";
import { FooterOne } from "./_report-footer/footer-one";
import { PrintHeaderOne } from "./_report-header/print-header-one";
import { Report } from "./_report/report";

interface PrintableReportProps {
  report: GetPatientReportByIdType;
}

export default function PrintableReport({
  report,
}: Readonly<PrintableReportProps>) {
  const reportRef = useRef<HTMLDivElement>(null);

  const [selectedTestGroups, setSelectedTestGroups] = useState<string[]>([
    report.testGroups[0]?.id,
  ]);

  function handleGroupToggle(id: string) {
    setSelectedTestGroups((prev) => {
      /* REMOVE */ if (prev.includes(id)) {
        /* PREVENT EMPTY */ if (prev.length === 1) {
          return prev;
        }
        return prev.filter((item) => item !== id);
      }
      /* ADD */ return [...prev, id];
    });
  }

  const printableGroups = report.testGroups.filter((group) =>
    selectedTestGroups.includes(group.id),
  );

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `${report.patient.name}-${report.patientId}`,
  });

  return (
    <div className="gap-4 grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:sticky lg:top-20 h-[calc(100vh-100px)] order-1 col-span-3 border w-full">
        <ScrollArea className="h-[calc(100%-73px)] p-4">
          <FieldGroup className="w-full">
            {report.testGroups.map((group) => {
              const checked = selectedTestGroups.includes(group.id);
              return (
                <FieldLabel key={group.id} htmlFor={group.id}>
                  <Field orientation="horizontal">
                    <Checkbox
                      id={group.id}
                      checked={checked}
                      onCheckedChange={() => handleGroupToggle(group.id)}
                    />
                    <FieldContent>
                      <FieldTitle>{group.testGroup.name}</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              );
            })}
          </FieldGroup>
        </ScrollArea>
      </div>

      <div className="order-2 col-span-9 w-full max-w-[210mm] relative mx-auto">
        <div className="w-full bg-muted flex flex-wrap gap-1 items-center justify-between p-4">
          <FieldGroup className="w-64">
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox-basic"
                name="terms-checkbox-basic"
                className="border border-primary"
                checked
              />
              <FieldLabel htmlFor="terms-checkbox-basic">
                Page Break Between Test Group
              </FieldLabel>
            </Field>
          </FieldGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  aria-label="Download report"
                  variant="ghost"
                  type="button"
                  onClick={handlePrint}
                >
                  <PrinterIcon />
                </Button>
              }
            />
            <TooltipContent>Print Report</TooltipContent>
          </Tooltip>
        </div>
        <div ref={reportRef} className="flex flex-col gap-y-4">
          {printableGroups.map((group, index) => (
            <div
              key={group.id}
              className="bg-white w-[210mm] min-h-[297mm] mx-auto shadow flex flex-col print:shadow-none break-after-page"
            >
              <div className="flex-1">
                <PrintHeaderOne
                  pataient={report.patient}
                  doctor={report.doctor}
                />
                <Report testGroupItem={group} pataient={report.patient} />
              </div>
              <FooterOne index={index + 1} length={printableGroups.length} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
