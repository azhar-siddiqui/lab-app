import { getReferralDoctors } from "@/actions/referral-doctors/get-referral-doctors";
import { ReferralDoctorsView } from "@/app/(main)/dashboard/referral-doctors/_components/referral-doctors-view";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";
import { Suspense } from "react";

export default function ReferralDoctorsPage() {
  return (
    <PageContainer
      pageTitle="Referral Doctors"
      pageDescription="Manage referring doctors, commissions, and case volumes."
    >
      <Suspense fallback={<DataTableSkeleton rows={8} columns={6} />}>
        <ReferralDoctorsSection />
      </Suspense>
    </PageContainer>
  );
}

async function ReferralDoctorsSection() {
  const data = await getReferralDoctors();
  return <ReferralDoctorsView data={data} />;
}