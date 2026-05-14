import { GetPatientReportById } from "@/actions/patient-report/get-patient-report";
import PageContainer from "@/components/layout/page-container";

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
      <h1>Report Page</h1>
    </PageContainer>
  );
}
