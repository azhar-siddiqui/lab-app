import { GetPatientReportById } from "@/actions/patient-report/get-patient-report";
import PageContainer from "@/components/layout/page-container";
import PrintableReport from "./_components/printable-report";

interface PreviewReportProps {
  params: Promise<{ reportId: string }>;
}
export default async function PreviewReport({
  params,
}: Readonly<PreviewReportProps>) {
  const { reportId } = await params;
  const report = await GetPatientReportById(reportId);
  return (
    <PageContainer>
      <PrintableReport report={report} />
    </PageContainer>
  );
}
