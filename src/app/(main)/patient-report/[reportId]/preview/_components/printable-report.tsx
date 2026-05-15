"use client";
import { GetPatientReportByIdType } from "@/actions/patient-report/get-patient-report";
import { PrintHeader } from "./_report-header/print-header-one";

interface PrintableReportProps {
  report: GetPatientReportByIdType;
}
export default function PrintableReport({
  report,
}: Readonly<PrintableReportProps>) {
  const labId = "LAB-2026-98765";
  const websiteUrl = `www.google.com`;

  return (
    <div className="space-y-6">
      <PrintHeader />
    </div>
  );
}
