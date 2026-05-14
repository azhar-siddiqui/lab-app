import { GetPatientReportById } from "@/actions/patient-report/get-patient-report";
import PageContainer from "@/components/layout/page-container";
import { ResultForm } from "./_components/result-form";

export default async function PatientReportPage({
  params,
}: Readonly<{
  params: Promise<{ reportId: string }>;
}>) {
  const { reportId } = await params;
  const report = await GetPatientReportById(reportId);

  console.log("report", report);

  return (
    <PageContainer>
      <ResultForm report={report} />
    </PageContainer>
  );
}
