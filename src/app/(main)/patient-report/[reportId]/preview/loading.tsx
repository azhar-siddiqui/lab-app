import PageContainer from "@/components/layout/page-container";
import { ReportPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function PatientReportPreviewLoading() {
  return (
    <PageContainer>
      <ReportPageSkeleton />
    </PageContainer>
  );
}