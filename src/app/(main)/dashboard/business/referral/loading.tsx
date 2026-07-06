import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";

export default function ReferralBusinessLoading() {
  return (
    <PageContainer
      pageTitle="Referral Business"
      pageDescription="Analyze referral volumes, billing, and commission performance by doctor."
    >
      <DataTableSkeleton rows={8} columns={5} />
    </PageContainer>
  );
}