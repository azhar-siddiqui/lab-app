import { getReferralBusiness } from "@/actions/business/get-referral-business";
import { ReferralBusinessView } from "@/app/(main)/dashboard/business/referral/_components/referral-business-view";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";
import { Suspense } from "react";

export default function ReferralBusinessPage() {
  return (
    <PageContainer
      pageTitle="Referral Business"
      pageDescription="Analyze referral volumes, billing, and commission performance by doctor."
    >
      <Suspense fallback={<DataTableSkeleton rows={8} columns={5} />}>
        <ReferralBusinessSection />
      </Suspense>
    </PageContainer>
  );
}

async function ReferralBusinessSection() {
  const data = await getReferralBusiness();
  return <ReferralBusinessView data={data} />;
}