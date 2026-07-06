import PageContainer from "@/components/layout/page-container";
import { ExpensesPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function ExpensesLoading() {
  return (
    <PageContainer
      pageTitle="Expenses"
      pageDescription="Track daily lab spending by category, amount, and entry."
    >
      <ExpensesPageSkeleton />
    </PageContainer>
  );
}