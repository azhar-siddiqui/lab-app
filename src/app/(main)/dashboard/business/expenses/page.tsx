import { getDailyExpenses } from "@/actions/business/get-daily-expenses";
import { ExpensesView } from "@/app/(main)/dashboard/business/expenses/_components/expenses-view";
import PageContainer from "@/components/layout/page-container";
import { ExpensesPageSkeleton } from "@/components/skeletons/page-skeletons";
import { Suspense } from "react";

type ExpensesPageProps = {
  searchParams: Promise<{ date?: string }>;
};

export default async function ExpensesPage({ searchParams }: ExpensesPageProps) {
  const { date } = await searchParams;

  return (
    <PageContainer
      pageTitle="Expenses"
      pageDescription="Track daily lab spending by category, amount, and entry."
    >
      <Suspense fallback={<ExpensesPageSkeleton />} key={date ?? "today"}>
        <ExpensesSection date={date} />
      </Suspense>
    </PageContainer>
  );
}

async function ExpensesSection({ date }: { date?: string }) {
  const data = await getDailyExpenses(date);
  return <ExpensesView data={data} />;
}