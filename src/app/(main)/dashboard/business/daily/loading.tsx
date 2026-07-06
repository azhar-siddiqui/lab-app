import PageContainer from "@/components/layout/page-container";
import { DailyBusinessSkeleton } from "@/components/skeletons/page-skeletons";

export default function DailyBusinessLoading() {
  return (
    <PageContainer
      pageTitle="Daily Business"
      pageDescription="Track cases, billing, collections, and dues for any selected day."
    >
      <DailyBusinessSkeleton />
    </PageContainer>
  );
}