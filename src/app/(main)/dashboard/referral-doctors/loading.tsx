import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";

export default function ReferralDoctorsLoading() {
  return (
    <PageContainer
      pageTitle="Referral Doctors"
      pageDescription="Manage referring doctors, commissions, and case volumes."
    >
      <DataTableSkeleton rows={8} columns={6} />
    </PageContainer>
  );
}