import PageContainer from "@/components/layout/page-container";
import { ReportEntrySkeleton } from "@/components/skeletons/page-skeletons";

export default function PatientReportLoading() {
  return (
    <PageContainer>
      <ReportEntrySkeleton />
    </PageContainer>
  );
}