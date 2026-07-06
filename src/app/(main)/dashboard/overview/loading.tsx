import PageContainer from "@/components/layout/page-container";
import { DashboardOverviewSkeleton } from "@/components/skeletons/page-skeletons";

export default function DashboardOverviewLoading() {
  return (
    <PageContainer>
      <DashboardOverviewSkeleton />
    </PageContainer>
  );
}