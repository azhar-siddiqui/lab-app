"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangle,
  Beaker,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Download,
  FlaskConical,
  Printer,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import { JSX } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const report = {
  lab: {
    name: "MediPath Diagnostics",
    address: "Plot 14, Senapati Bapat Road, Pune - 411016",
    phone: "+91 20 6745 8900",
    email: "reports@medipath.in",
    accreditation: "NABL Accredited · Reg. No. MC-2847",
  },
  report: {
    id: "RPT-2026-084521",
    type: "Complete Blood Count (CBC) with Differential",
    collectedAt: "2026-05-08T07:15:00.000Z",
    receivedAt: "2026-05-08T07:45:00.000Z",
    reportedAt: "2026-05-08T11:30:00.000Z",
    sampleType: "Whole Blood (EDTA)",
    sampleId: "SMP-084521",
    method: "Automated Haematology Analyser",
  },
  patient: {
    id: "ebd07b2d-1fc6-44b7-90e0-7ec6ae458364",
    name: "Priya Shrma",
    designation: "Miss",
    age: "38",
    ageType: "Year",
    gender: "Female",
    referredBy: "Dr. Ananya Mehta",
    ward: "OPD",
  },
  groups: [
    {
      name: "Complete Blood Count",
      tests: [
        {
          name: "Haemoglobin (Hb)",
          value: 9.8,
          unit: "g/dL",
          low: 12.0,
          high: 16.0,
          precision: 1,
        },
        {
          name: "Total RBC Count",
          value: 3.9,
          unit: "×10⁶/µL",
          low: 3.8,
          high: 5.2,
          precision: 2,
        },
        {
          name: "Haematocrit (PCV)",
          value: 32.4,
          unit: "%",
          low: 36.0,
          high: 46.0,
          precision: 1,
        },
        {
          name: "MCV",
          value: 74.2,
          unit: "fL",
          low: 80.0,
          high: 100.0,
          precision: 1,
        },
        {
          name: "MCH",
          value: 24.1,
          unit: "pg",
          low: 27.0,
          high: 33.0,
          precision: 1,
        },
        {
          name: "MCHC",
          value: 30.3,
          unit: "g/dL",
          low: 31.5,
          high: 35.0,
          precision: 1,
        },
        {
          name: "RDW-CV",
          value: 16.8,
          unit: "%",
          low: 11.5,
          high: 14.5,
          precision: 1,
        },
        {
          name: "Total WBC Count",
          value: 7200,
          unit: "cells/µL",
          low: 4000,
          high: 11000,
          precision: 0,
        },
        {
          name: "Platelet Count",
          value: 210000,
          unit: "cells/µL",
          low: 150000,
          high: 410000,
          precision: 0,
        },
      ],
    },
    {
      name: "Differential Count",
      tests: [
        {
          name: "Neutrophils",
          value: 62,
          unit: "%",
          low: 40,
          high: 70,
          precision: 0,
        },
        {
          name: "Lymphocytes",
          value: 28,
          unit: "%",
          low: 20,
          high: 40,
          precision: 0,
        },
        {
          name: "Monocytes",
          value: 6,
          unit: "%",
          low: 2,
          high: 10,
          precision: 0,
        },
        {
          name: "Eosinophils",
          value: 3,
          unit: "%",
          low: 1,
          high: 6,
          precision: 0,
        },
        {
          name: "Basophils",
          value: 1,
          unit: "%",
          low: 0,
          high: 2,
          precision: 0,
        },
      ],
    },
  ],
  remarks: `Microcytic hypochromic anaemia pattern observed. RBC indices (MCV, MCH, MCHC) are below the normal range, suggesting possible Iron Deficiency Anaemia or Thalassaemia trait. Serum ferritin, TIBC, and peripheral blood smear examination are recommended for further evaluation. Clinical correlation advised.`,
  technician: {
    name: "Mr. Rakesh Patil",
    qualification: "B.Sc. MLT",
    signature: "R. Patil",
  },
  pathologist: {
    name: "Dr. Kavitha Nair",
    qualification: "MD Pathology, MBBS",
    regNo: "MH-28471",
    signature: "Dr. K. Nair",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtVal(v: number, p: number): string {
  return v.toLocaleString("en-IN", {
    minimumFractionDigits: p,
    maximumFractionDigits: p,
  });
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatus(value: number, low: number, high: number) {
  if (value > high) return "high";
  if (value < low) return "low";
  return "normal";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({
  value,
  low,
  high,
}: Readonly<{
  value: number;
  low: number;
  high: number;
}>) {
  const status = getStatus(value, low, high);

  if (status === "high")
    return (
      <Badge className="gap-1 bg-red-50 text-red-700 border border-red-200 hover:bg-red-50 font-bold text-[10px] tracking-wide">
        <TrendingUp className="h-3 w-3" /> HIGH
      </Badge>
    );
  if (status === "low")
    return (
      <Badge className="gap-1 bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-50 font-bold text-[10px] tracking-wide">
        <TrendingDown className="h-3 w-3" /> LOW
      </Badge>
    );
  return (
    <Badge className="gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-bold text-[10px] tracking-wide">
      <CheckCircle2 className="h-3 w-3" /> NORMAL
    </Badge>
  );
}

function InfoRow({
  label,
  value,
}: Readonly<{ label: string; value: string | JSX.Element }>) {
  return (
    <div className="flex justify-between items-baseline py-2 border-b border-dashed border-slate-100 last:border-0">
      <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide min-w-30">
        {label}
      </span>
      <span className="text-[12.5px] font-semibold text-slate-800 text-right">
        {value}
      </span>
    </div>
  );
}

function SectionDivider({ label }: Readonly<{ label: string }>) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="h-px flex-1 bg-slate-100" />
      <span className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-slate-400 px-1">
        {label}
      </span>
      <div className="h-px flex-1 bg-slate-100" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PathologyReport() {
  const allTests = report.groups.flatMap((g) => g.tests);
  const abnormalCount = allTests.filter(
    (t) => getStatus(t.value, t.low, t.high) !== "normal",
  ).length;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* ── Toolbar ── */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <ClipboardList className="h-4 w-4" />
              <span className="text-sm font-semibold">Pathology Report</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-xs font-mono text-slate-400">
                {report.report.id}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs h-8"
                onClick={() => globalThis.print()}
              >
                <Printer className="h-3.5 w-3.5" /> Print
              </Button>
              <Button
                size="sm"
                className="gap-2 text-xs h-8 bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </Button>
            </div>
          </div>

          {/* ── Report Paper ── */}
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            {/* ── Lab Header ── */}
            <div className="bg-slate-900 px-8 py-6 relative overflow-hidden">
              {/* decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/5" />
              <div className="absolute -bottom-6 left-1/3 w-24 h-24 rounded-full bg-emerald-500/5" />
              {/* green accent line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-600 via-emerald-400 to-emerald-600" />

              <div className="relative flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* Lab icon */}
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-700 to-emerald-500 flex items-center justify-center ring-1 ring-emerald-400/30 shrink-0">
                    <FlaskConical className="h-6 w-6 text-emerald-100" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                      {report.lab.name}
                    </h1>
                    <p className="text-[11px] text-emerald-400 mt-0.5 font-medium">
                      {report.lab.accreditation}
                    </p>
                    <p className="text-[10.5px] text-slate-400 mt-0.5">
                      {report.lab.address}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-[11.5px] font-mono text-emerald-300">
                    {report.lab.phone}
                  </p>
                  <p className="text-[11.5px] font-mono text-emerald-300">
                    {report.lab.email}
                  </p>
                  <Badge className="mt-2 bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/60 text-[10px]">
                    <Calendar className="h-2.5 w-2.5 mr-1" />
                    {fmtDate(report.report.reportedAt)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* ── Report Title ── */}
            <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                  Diagnostic Report
                </p>
                <h2 className="text-base font-bold text-slate-900">
                  {report.report.type}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-mono bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded-md">
                  {report.report.id}
                </p>
                <p className="text-[10.5px] text-slate-400 mt-1.5">
                  Method: {report.report.method}
                </p>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="p-8 space-y-8">
              {/* ── Patient + Sample ── */}
              <div>
                <SectionDivider label="Patient & Sample Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Patient Card */}
                  <Card className="border-slate-200 shadow-none">
                    <CardHeader className="pb-3 pt-4 px-5 bg-slate-50 border-b border-slate-100 rounded-t-lg">
                      <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <User className="h-3 w-3" /> Patient Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 py-3 space-y-0">
                      <InfoRow
                        label="Name"
                        value={`${report.patient.designation}. ${report.patient.name}`}
                      />
                      <InfoRow
                        label="Age / Gender"
                        value={`${report.patient.age} ${report.patient.ageType}s · ${report.patient.gender}`}
                      />
                      <InfoRow
                        label="Referred By"
                        value={report.patient.referredBy}
                      />
                      <InfoRow
                        label="Ward / Unit"
                        value={report.patient.ward}
                      />
                      <InfoRow
                        label="Patient ID"
                        value={
                          <Tooltip>
                            <TooltipTrigger
                              render={
                                <span className="font-mono text-[11px] cursor-default text-slate-600">
                                  {report.patient.id.slice(0, 16)}…
                                </span>
                              }
                            />
                            <TooltipContent
                              side="top"
                              className="font-mono text-xs"
                            >
                              {report.patient.id}
                            </TooltipContent>
                          </Tooltip>
                        }
                      />
                    </CardContent>
                  </Card>

                  {/* Sample Card */}
                  <Card className="border-slate-200 shadow-none">
                    <CardHeader className="pb-3 pt-4 px-5 bg-slate-50 border-b border-slate-100 rounded-t-lg">
                      <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Beaker className="h-3 w-3" /> Sample Collection Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 py-3 space-y-0">
                      <InfoRow
                        label="Sample Type"
                        value={report.report.sampleType}
                      />
                      <InfoRow
                        label="Sample ID"
                        value={report.report.sampleId}
                      />
                      <InfoRow
                        label="Collected On"
                        value={fmtDateTime(report.report.collectedAt)}
                      />
                      <InfoRow
                        label="Received On"
                        value={fmtDateTime(report.report.receivedAt)}
                      />
                      <InfoRow
                        label="Reported On"
                        value={fmtDateTime(report.report.reportedAt)}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* ── Abnormal Alert ── */}
              {abnormalCount > 0 && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-amber-800">
                      {abnormalCount} Parameter{abnormalCount > 1 ? "s" : ""}{" "}
                      Outside Reference Range
                    </p>
                    <p className="text-[12px] text-amber-700 mt-0.5 leading-relaxed">
                      Values highlighted in red/orange require clinical
                      correlation. Please review with your physician.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Test Results ── */}
              <div>
                <SectionDivider label="Investigation Results" />

                {/* Legend */}
                <div className="flex justify-end gap-3 mt-3 mb-4 flex-wrap">
                  {[
                    {
                      icon: <TrendingUp className="h-3 w-3" />,
                      label: "High",
                      cls: "bg-red-50 text-red-700 border-red-200",
                    },
                    {
                      icon: <TrendingDown className="h-3 w-3" />,
                      label: "Low",
                      cls: "bg-orange-50 text-orange-700 border-orange-200",
                    },
                    {
                      icon: <CheckCircle2 className="h-3 w-3" />,
                      label: "Normal",
                      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    },
                  ].map(({ icon, label, cls }) => (
                    <Badge
                      key={label}
                      className={`gap-1 border text-[10px] font-bold tracking-wide hover:opacity-100 ${cls}`}
                    >
                      {icon} {label}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-4">
                  {report.groups.map((group) => (
                    <div
                      key={group.name}
                      className="rounded-xl overflow-hidden border border-slate-200"
                    >
                      {/* Group header */}
                      <div className="flex items-center gap-2 bg-emerald-50 border-b border-emerald-100 px-4 py-2.5">
                        <div className="w-1 h-4 rounded-full bg-emerald-500" />
                        <span className="text-[13px] font-bold text-emerald-900">
                          {group.name}
                        </span>
                      </div>

                      {/* Table */}
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50 hover:bg-slate-50">
                            <TableHead className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 py-2.5 w-[38%]">
                              Parameter
                            </TableHead>
                            <TableHead className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 py-2.5 text-center w-[15%]">
                              Result
                            </TableHead>
                            <TableHead className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 py-2.5 text-center w-[12%]">
                              Unit
                            </TableHead>
                            <TableHead className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 py-2.5 text-center w-[21%]">
                              Reference Range
                            </TableHead>
                            <TableHead className="text-[10.5px] font-extrabold uppercase tracking-widest text-slate-400 py-2.5 text-center w-[14%]">
                              Status
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {group.tests.map((test) => {
                            const status = getStatus(
                              test.value,
                              test.low,
                              test.high,
                            );
                            const isAbnormal = status !== "normal";
                            return (
                              <TableRow
                                key={test.name}
                                className={
                                  isAbnormal
                                    ? "bg-amber-50/40 hover:bg-amber-50/70"
                                    : "hover:bg-slate-50/80"
                                }
                              >
                                <TableCell className="py-3 text-[13px] font-medium text-slate-700">
                                  {test.name}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                  <span
                                    className={[
                                      "font-mono text-[13.5px] font-bold",
                                      status === "high" ? "text-red-700" : "",
                                      status === "low" ? "text-orange-700" : "",
                                      status === "normal"
                                        ? "text-slate-800"
                                        : "",
                                    ].join(" ")}
                                  >
                                    {fmtVal(test.value, test.precision)}
                                  </span>
                                </TableCell>
                                <TableCell className="py-3 text-center font-mono text-[11.5px] text-slate-500">
                                  {test.unit}
                                </TableCell>
                                <TableCell className="py-3 text-center font-mono text-[12px] text-slate-500">
                                  {fmtVal(test.low, test.precision)} –{" "}
                                  {fmtVal(test.high, test.precision)}
                                </TableCell>
                                <TableCell className="py-3 text-center">
                                  <StatusBadge {...test} />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Remarks ── */}
              <div>
                <SectionDivider label="Interpretation & Remarks" />
                <div className="mt-4 bg-slate-50 border border-slate-200 border-l-4 border-l-emerald-500 rounded-r-xl px-5 py-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
                    Pathologist's Note
                  </p>
                  <p className="text-[13px] text-slate-600 leading-7 italic">
                    {report.remarks}
                  </p>
                </div>
              </div>

              {/* ── Signatures ── */}
              <div>
                <SectionDivider label="Authorisation" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      role: "Lab Technician",
                      person: report.technician,
                      note: "Sample Processing & Analysis",
                    },
                    {
                      role: "Reporting Pathologist",
                      person: report.pathologist,
                      note: `Reg. No. ${report.pathologist.regNo}`,
                    },
                  ].map(({ role, person, note }) => (
                    <Card key={role} className="border-slate-200 shadow-none">
                      <CardHeader className="pb-3 pt-4 px-5 bg-slate-50 border-b border-slate-100 rounded-t-lg">
                        <CardTitle className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                          {role}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-5 py-4">
                        <p className="font-serif text-xl text-slate-800 border-b border-slate-300 pb-2 mb-3 tracking-wide">
                          {person.signature}
                        </p>
                        <p className="text-[13px] font-semibold text-slate-700">
                          {person.name}
                        </p>
                        <p className="text-[12px] text-slate-500 mt-0.5">
                          {person.qualification}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {note}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex items-center justify-between gap-4">
              <p className="text-[10.5px] text-slate-400 italic leading-relaxed max-w-lg">
                * This report is electronically generated and is valid without a
                physical signature. Results must be interpreted by a qualified
                clinician in clinical context.
              </p>
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px] shrink-0">
                <ShieldCheck className="h-4 w-4" />
                Verified Report
              </div>
            </div>
          </div>
          {/* end report paper */}
        </div>
      </div>
    </TooltipProvider>
  );
}
