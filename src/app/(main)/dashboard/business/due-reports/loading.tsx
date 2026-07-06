import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";

export default function DueReportsLoading() {
  return (
    <PageContainer
      pageTitle="Due Reports"
      pageDescription="Track outstanding balances and follow up on pending collections."
    >
      <DataTableSkeleton rows={8} columns={7} />
    </PageContainer>
  );
}