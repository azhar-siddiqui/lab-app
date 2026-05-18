import { GetTestCategory } from "@/actions/test-category/get-test-category";
import { GetAllUnit } from "@/actions/test-unit/get-test-unit";
import PageContainer from "@/components/layout/page-container";
import { TestGroupForm } from "./_components/test-group-form";

export default async function NewTestGroupPage() {
  const [testCategories, testUnit] = await Promise.all([
    GetTestCategory(),
    GetAllUnit(),
  ]);

  return (
    <PageContainer>
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Test database</h2>
        <p className="text-sm text-muted-foreground mt-2">
          You can also choose to create a similar test, by simply visiting view
          test page and using "Create similar test" link, present at the bottom
          of the page.
        </p>
      </div>

      <TestGroupForm testCategories={testCategories} testUnit={testUnit} />
    </PageContainer>
  );
}
