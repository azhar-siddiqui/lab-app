import { getTestCategoriesPage } from "@/actions/test-category/get-test-categories-page";
import { TestCategoriesView } from "@/app/(main)/dashboard/test-categories/_components/test-categories-view";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import { TestCategoriesSkeleton } from "./_components/test-categories-skeleton";

export default function TestCategoriesPage() {
  return (
    <PageContainer
      pageTitle="Test Categories"
      pageDescription="Organize test packages into categories for easier catalog management."
    >
      <Suspense fallback={<TestCategoriesSkeleton />}>
        <TestCategoriesSection />
      </Suspense>
    </PageContainer>
  );
}

async function TestCategoriesSection() {
  const categories = await getTestCategoriesPage();
  return <TestCategoriesView categories={categories} />;
}