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
import { Gender } from "@/generated/prisma/enums";

const TABLE_COLS = [
  { label: "Parameter", cls: "w-[40%] text-left" },
  { label: "Result", cls: "w-[15%] text-center" },
  { label: "Unit", cls: "w-[15%] text-center" },
  { label: "Reference Range", cls: "w-[30%] text-center" },
] as const;

type TestStatus = "high" | "low" | "normal";

const ROW_CLS: Record<TestStatus, string> = {
  high: "bg-red-50/40 hover:bg-red-50/60",
  low: "bg-orange-50/40 hover:bg-orange-50/60",
  normal: "hover:bg-slate-50/60",
};

function getStatus(value: number, low: number, high: number): TestStatus {
  if (value > high) return "high";
  if (value < low) return "low";
  return "normal";
}

const VALUE_CLS: Record<TestStatus, string> = {
  high: "text-red-700",
  low: "text-orange-700",
  normal: "text-slate-800",
};

function parseNormalRange(rangeStr: string): { low: number; high: number } {
  if (!rangeStr) return { low: 0, high: 999999 };

  const numbers = rangeStr.match(/\d+/g);
  if (!numbers) return { low: 0, high: 999999 };

  return {
    low: Number.parseFloat(numbers[0]),
    high: Number.parseFloat(numbers.at(-1) ?? "0"),
  };
}

interface ReportProps {
  testGroupItem: TestGroupItemType;
  pataient: PatientType;
}

export function Report({ testGroupItem, pataient }: Readonly<ReportProps>) {
  return (
    <div className="mx-auto max-w-4xl bg-white text-zinc-900 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold  text-slate-400 mb-0.5">
            Haematology Report
          </p>
          <h2 className="text-sm font-bold text-slate-900">
            {`${testGroupItem.testGroup.name} (${testGroupItem.testGroup.shortName})`}
          </h2>
        </div>
        <p className="font-mono text-[11.5px] rounded-md border border-slate-200 bg-white px-3 py-1 text-slate-500">
          RPT-CBC-2026-00421
        </p>
      </div>
      <SectionDivider label="Investigation Results" />
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50 border-b-slate-200">
            {TABLE_COLS.map(({ label, cls }) => (
              <TableHead
                key={label}
                className={`py-2 text-[10.5px] font-bold uppercase tracking-widest text-slate-400 ${cls}`}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {testGroupItem.tests.map((item) => {
            const test = item.test;
            const resultValue = Number.parseFloat(item.resultValue ?? "");
            const { low, high } = parseNormalRange(
              test.normalValueMale || test.normalValueFemale || "",
            );
            const status = getStatus(resultValue, low, high);
            const unit = test.testUnit?.name || "";

            return (
              <TableRow
                key={item.id}
                className={`border-0 transition-colors ${ROW_CLS[status]}`}
              >
                {/* Parameter name */}
                <TableCell className="py-2 pl-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {test.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-[13.5px] font-medium text-slate-700">
                        {test.name}
                      </p>
                      <p className="text-[10.5px] text-slate-400">Type</p>
                    </div>
                  </div>
                </TableCell>

                {/* Result */}
                <TableCell className="py-2 pl-5 text-center">
                  <span className={`font-mono text-sm ${VALUE_CLS[status]}`}>
                    {item.resultValue}
                  </span>
                </TableCell>

                {/* Unit */}
                <TableCell className="py-2 text-center font-mono text-xs text-slate-500">
                  {unit}
                </TableCell>

                {/* Reference range */}
                <TableCell className="py-2 text-center font-mono text-xs text-slate-500">
                  {pataient.gender === Gender.Male
                    ? test.normalValueMale
                    : test.normalValueFemale}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function SectionDivider({ label }: Readonly<{ label: string }>) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="px-1 text-sm">{label}</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
