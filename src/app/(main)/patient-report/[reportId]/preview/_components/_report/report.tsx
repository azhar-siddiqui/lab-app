import {
  PatientType,
  TestGroupItemType,
} from "@/actions/patient-report/get-patient-report";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getReferenceRange,
  getTestStatus,
  type TestStatus,
} from "@/lib/report-range";
import React from "react";

const TABLE_COLS = [
  { label: "Parameter", cls: "w-[40%] text-left" },
  { label: "Result", cls: "w-[15%] text-center" },
  { label: "Units", cls: "w-[15%] text-center" },
  { label: "Reference Range", cls: "w-[30%] text-center" },
] as const;

const ROW_CLS: Record<TestStatus, string> = {
  high: "bg-red-50 hover:bg-red-50",
  low: "bg-orange-50 hover:bg-orange-50",
  normal: "hover:bg-slate-50",
};

const VALUE_CLS: Record<TestStatus, string> = {
  high: "text-red-700",
  low: "text-orange-700",
  normal: "text-slate-800",
};

interface ReportProps {
  testGroupItem: TestGroupItemType;
  pataient: PatientType;
}

export function Report({ testGroupItem, pataient }: Readonly<ReportProps>) {
  const textGroupId = testGroupItem.id.split("-")[0];

  const groupedTests = testGroupItem.tests.reduce(
    (acc, item) => {
      const key = item.test.sectionName ?? "__default__";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, typeof testGroupItem.tests>,
  );

  return (
    <div className="mx-auto max-w-4xl bg-white text-zinc-900 py-4 px-6 pt-0">
      <div className="flex items-center justify-between pb-2">
        <div>
          <p className="text-xs font-bold  text-slate-400 mb-0.5">
            {testGroupItem.testGroup.testCategory.name}
          </p>
          <h2 className="text-sm font-bold text-slate-900">
            {`${testGroupItem.testGroup.name} (${testGroupItem.testGroup.shortName})`}
          </h2>
        </div>
        <p className="font-mono text-[9px] rounded print-rounded border border-slate-200 px-2 py-1 text-slate-500 uppercase select-none">
          {`RPT-${testGroupItem.testGroup.shortName}-2026-${textGroupId}`}
        </p>
      </div>
      {/* <SectionDivider label="Investigation Results" /> */}
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 print:bg-slate-100  hover:bg-slate-50 border-b-slate-200">
            {TABLE_COLS.map(({ label, cls }) => (
              <TableHead
                key={label}
                className={`py-2 text-[10.5px] font-bold uppercase tracking-widest text-slate-400 print:text-slate-800 ${cls}`}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.entries(groupedTests).map(([section, tests]) => (
            <React.Fragment key={section}>
              {section !== "__default__" && (
                <TableRow className="hover:bg-transparent border-0">
                  <TableCell
                    colSpan={4}
                    className="font-bold uppercase text-xs py-1"
                  >
                    {section}
                  </TableCell>
                </TableRow>
              )}
              {tests.map((item) => {
                const test = item.test;
                const status =
                  getTestStatus(
                    item.resultValue,
                    test.normalValueMale,
                    test.normalValueFemale,
                    pataient.gender,
                  ) ?? "normal";
                const unit = test.testUnit?.name || "";
                const referenceRange = getReferenceRange(
                  test.normalValueMale,
                  test.normalValueFemale,
                  pataient.gender,
                );

                return (
                  <TableRow
                    key={item.id}
                    className={`border-0 transition-colors ${ROW_CLS[status]}`}
                  >
                    {/* Parameter name */}
                    <TableCell className="py-1">
                      <div className="flex items-center gap-3">
                        {/* <span className="font-mono text-[10px] text-slate-500 bg-slate-100 print:bg-slate-200 px-1.5 py-0.5 rounded print-rounded">
                      {test.name.slice(0, 2).toUpperCase()}
                    </span> */}
                        <div>
                          <p className="text-xs font-medium text-slate-700">
                            {test.name}
                          </p>
                          {test.fullName && (
                            <p className="text-[10px] font-medium text-slate-500">
                              {test.fullName}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Result */}
                    <TableCell className="py-1 text-center">
                      <span
                        className={`font-mono text-xs ${VALUE_CLS[status]}`}
                      >
                        {item.resultValue}
                      </span>
                    </TableCell>

                    {/* Unit */}
                    <TableCell className="py-2 text-center font-mono text-xs text-slate-500">
                      {unit}
                    </TableCell>

                    {/* Reference range */}
                    <TableCell className="py-2 text-center font-mono text-xs text-slate-500">
                      {referenceRange}
                    </TableCell>
                  </TableRow>
                );
              })}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <SectionDivider label="End Of Report" />
    </div>
  );
}

function SectionDivider({ label }: Readonly<{ label: string }>) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="px-1 text-xs text-slate-400">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
