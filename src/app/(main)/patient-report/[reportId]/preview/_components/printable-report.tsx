"use client";
import { GetPatientReportByIdType } from "@/actions/patient-report/get-patient-report";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { PrintHeaderOne } from "./_report-header/print-header-one";
import { Report } from "./_report/report";

interface PrintableReportProps {
  report: GetPatientReportByIdType;
}

export default function PrintableReport({
  report,
}: Readonly<PrintableReportProps>) {
  const [selectedTestGroup, setSelectedTestGroup] = useState(
    report.testGroups[0],
  );

  const handleGroupChange = (id: string) => {
    const group = report.testGroups.find((g) => g.id === id);
    if (group) {
      setSelectedTestGroup(group);
    }
  };

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

      <div className="order-2 col-span-8 w-full max-w-[210mm]">
        <div className="border h-[297mm] w-[210mm] ms-auto bg-white shadow-lg">
          <PrintHeaderOne pataient={report.patient} doctor={report.doctor} />
          <Report testGroupItem={selectedTestGroup} pataient={report.patient} />
        </div>
      </div>
    </div>
  );
}

/* 
  <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
      <div className="lg:sticky lg:top-20 h-[calc(100vh-100px)] order-1 col-span-4 border">
        List her
      </div>
      <div className="order-2 col-span-8 ">
        <div className="border h-[297mm] w-[210mm] ms-auto bg-white shadow-lg">
          <PrintHeaderOne pataient={report.patient} doctor={report.doctor} />
          <Report />
        </div>
      </div>
    </div>
*/
