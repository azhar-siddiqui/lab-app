import { getDueReports } from "@/actions/business/get-due-reports";
import { DueReportsView } from "@/app/(main)/dashboard/business/due-reports/_components/due-reports-view";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";
import { Suspense } from "react";

export default function DueReportsPage() {
  return (
    <PageContainer
      pageTitle="Due Reports"
      pageDescription="Track outstanding balances and follow up on pending collections."
    >
      <Suspense fallback={<DataTableSkeleton rows={8} columns={7} />}>
        <DueReportsSection />
      </Suspense>
    </PageContainer>
  );
}

async function DueReportsSection() {
  const data = await getDueReports();
  return <DueReportsView data={data} />;
}