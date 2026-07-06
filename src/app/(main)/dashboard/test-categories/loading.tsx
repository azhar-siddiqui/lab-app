import PageContainer from "@/components/layout/page-container";
import { TestCategoriesSkeleton } from "./_components/test-categories-skeleton";

export default function TestCategoriesLoading() {
  return (
    <PageContainer
      pageTitle="Test Categories"
      pageDescription="Organize test packages into categories for easier catalog management."
    >
      <TestCategoriesSkeleton />
    </PageContainer>
  );
}