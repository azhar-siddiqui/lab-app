import { getBills } from "@/actions/bills/get-bills";
import { BillsView } from "@/app/(main)/dashboard/bills/_components/bills-view";
import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";
import { Suspense } from "react";

export default function BillsPage() {
  return (
    <PageContainer
      pageTitle="Bills"
      pageDescription="Review billing, collections, and outstanding balances across all cases."
    >
      <Suspense fallback={<DataTableSkeleton rows={8} columns={7} />}>
        <BillsSection />
      </Suspense>
    </PageContainer>
  );
}

async function BillsSection() {
  const data = await getBills();
  return <BillsView data={data} />;
}