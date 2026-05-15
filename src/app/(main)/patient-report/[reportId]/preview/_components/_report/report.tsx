import { TestGroupItemType } from "@/actions/patient-report/get-patient-report";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const parameters = [
  {
    name: "Haemoglobin",
    abbr: "Hb",
    value: 9.8,
    unit: "g/dL",
    low: 12.0,
    high: 16.0,
    precision: 1,
    method: "Colorimetric",
  },
  {
    name: "Total RBC Count",
    abbr: "RBC",
    value: 3.9,
    unit: "×10⁶/µL",
    low: 3.8,
    high: 5.2,
    precision: 2,
  },
  {
    name: "Haematocrit (PCV)",
    abbr: "HCT",
    value: 32.4,
    unit: "%",
    low: 36.0,
    high: 46.0,
    precision: 1,
  },
  {
    name: "Mean Corpuscular Volume",
    abbr: "MCV",
    value: 74.2,
    unit: "fL",
    low: 80.0,
    high: 100.0,
    precision: 1,
  },
  {
    name: "MCH",
    abbr: "MCH",
    value: 24.1,
    unit: "pg",
    low: 27.0,
    high: 33.0,
    precision: 1,
  },
  {
    name: "MCHC",
    abbr: "MCHC",
    value: 30.3,
    unit: "g/dL",
    low: 31.5,
    high: 35.0,
    precision: 1,
  },
  {
    name: "RDW-CV",
    abbr: "RDW",
    value: 16.8,
    unit: "%",
    low: 11.5,
    high: 14.5,
    precision: 1,
  },
];

function getStatus(value: number, low: number, high: number): TestStatus {
  if (value > high) return "high";
  if (value < low) return "low";
  return "normal";
}

function fmtVal(value: number, precision: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

const VALUE_CLS: Record<TestStatus, string> = {
  high: "text-red-700",
  low: "text-orange-700",
  normal: "text-slate-800",
};

interface ReportProps {
  testGroupItem: TestGroupItemType;
}

export function Report({ testGroupItem }: Readonly<ReportProps>) {
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
          {parameters.map((param) => {
            const status: TestStatus = getStatus(
              param.value,
              param.low,
              param.high,
            );

            return (
              <TableRow
                key={param.abbr}
                className={`border-0 transition-colors  ${ROW_CLS[status]}`}
              >
                {/* Parameter name */}
                <TableCell className="py-2.5 pl-5">
                  <div className="flex items-center gap-2.5">
                    <span className="items-center justify-center font-mono text-xs text-slate-500">
                      {param.abbr}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-slate-700">
                        {param.name}
                      </p>
                      {param.method && (
                        <p className="text-[10.5px] text-slate-400">
                          {param.method}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Result */}
                <TableCell className="py-2.5 pl-5 text-center">
                  <span className={`font-mono text-sm ${VALUE_CLS[status]}`}>
                    {fmtVal(param.value, param.precision)}
                  </span>
                </TableCell>

                {/* Unit */}
                <TableCell className="py-2.5 text-center font-mono text-xs text-slate-500">
                  {param.unit}
                </TableCell>

                {/* Reference range */}
                <TableCell className="py-2.5 text-center font-mono text-xs text-slate-500">
                  {fmtVal(param.low, param.precision)}
                  {" - "}
                  {fmtVal(param.high, param.precision)}
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
