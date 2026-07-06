import { getCaseViewReports } from "@/actions/business/get-case-view-reports";
import { CaseViewReportsView } from "@/app/(main)/dashboard/business/case-view-reports/_components/case-view-reports-view";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import { CaseViewReportsSkeleton } from "./_components/case-view-reports-skeleton";

type CaseViewReportsPageProps = {
  searchParams: Promise<{ from?: string; to?: string }>;
};

export default async function CaseViewReportsPage({
  searchParams,
}: CaseViewReportsPageProps) {
  const { from, to } = await searchParams;

  return (
    <PageContainer
      pageTitle="Case View Reports"
      pageDescription="Analyze case volumes by doctor, test package, and reporting period."
    >
      <Suspense fallback={<CaseViewReportsSkeleton />} key={`${from}-${to}`}>
        <CaseViewReportsSection from={from} to={to} />
      </Suspense>
    </PageContainer>
  );
}

async function CaseViewReportsSection({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) {
  const data = await getCaseViewReports(from, to);
  return <CaseViewReportsView data={data} />;
}