"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { GetPatientReportByIdType } from "@/actions/patient-report/get-patient-report";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  const [selectedTestGroup, setSelectedTestGroup] = useState(
    report.testGroups[0],
  );

  const handleGroupChange = (id: string) => {
    const group = report.testGroups.find((g) => g.id === id);
    if (group) {
      setSelectedTestGroup(group);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `${report.patient.name}-${report.patientId}`,
  });

  return (
    <div className="gap-4 flex">
      <div className="lg:sticky lg:top-20 h-[calc(100vh-100px)] order-1 col-span-4 border w-full">
        <ScrollArea className="h-[calc(100%-73px)] p-4">
          <RadioGroup
            value={selectedTestGroup?.id}
            onValueChange={handleGroupChange}
            className="w-full gap-3"
          >
            {report.testGroups.map((group) => {
              return (
                <FieldLabel key={group.id} htmlFor={group.id}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{group.testGroup.name}</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value={group.id} id={group.id} />
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>
        </ScrollArea>
      </div>

      <div className="order-2 col-span-8 w-full max-w-[210mm] relative">
        <div className="w-full bg-muted flex flex-wrap gap-1 items-center justify-end p-4">
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
        <div
          ref={reportRef}
          className="h-[297mm] w-[210mm] ms-auto bg-white shadow-lg flex flex-col"
        >
          <div className="flex-1">
            <PrintHeaderOne pataient={report.patient} doctor={report.doctor} />
            <Report
              testGroupItem={selectedTestGroup}
              pataient={report.patient}
            />
          </div>
          <FooterOne />
        </div>
      </div>
    </div>
  );
}
