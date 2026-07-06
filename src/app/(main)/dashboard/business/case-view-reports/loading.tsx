import PageContainer from "@/components/layout/page-container";
import { CaseViewReportsSkeleton } from "./_components/case-view-reports-skeleton";

export default function CaseViewReportsLoading() {
  return (
    <PageContainer
      pageTitle="Case View Reports"
      pageDescription="Analyze case volumes by doctor, test package, and reporting period."
    >
      <CaseViewReportsSkeleton />
    </PageContainer>
  );
}