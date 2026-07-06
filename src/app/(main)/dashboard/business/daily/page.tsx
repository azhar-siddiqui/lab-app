import { getDailyBusiness } from "@/actions/business/get-daily-business";
import { DailyBusinessView } from "@/app/(main)/dashboard/business/daily/_components/daily-business-view";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import { DailyBusinessSkeleton } from "@/components/skeletons/page-skeletons";

type DailyBusinessPageProps = {
  searchParams: Promise<{ date?: string }>;
};

export default async function DailyBusinessPage({
  searchParams,
}: DailyBusinessPageProps) {
  const { date } = await searchParams;

  return (
    <PageContainer
      pageTitle="Daily Business"
      pageDescription="Review cases, billing, collections, and outstanding balances for any day."
    >
      <Suspense fallback={<DailyBusinessSkeleton />} key={date ?? "today"}>
        <DailyBusinessSection date={date} />
      </Suspense>
    </PageContainer>
  );
}

async function DailyBusinessSection({ date }: { date?: string }) {
  const data = await getDailyBusiness(date);
  return <DailyBusinessView data={data} />;
}