import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";

export default function BillsLoading() {
  return (
    <PageContainer
      pageTitle="Bills"
      pageDescription="Review billing, collections, and outstanding balances across all cases."
    >
      <DataTableSkeleton rows={8} columns={7} />
    </PageContainer>
  );
}