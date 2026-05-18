import { GetTestCategory } from "@/actions/test-category/get-test-category";
import { GetTestGroupById } from "@/actions/test-group/get-test-group-by-id";
import { GetAllUnit } from "@/actions/test-unit/get-test-unit";
import PageContainer from "@/components/layout/page-container";
import { notFound } from "next/navigation";
import { TestGroupForm } from "../../new/_components/test-group-form";

interface EditTestGroupPageProps {
  params: Promise<{ testGroupId: string }>;
}

export default async function EditTestGroupPage({
  params,
}: Readonly<EditTestGroupPageProps>) {
  const { testGroupId } = await params;

  const [group, categories, testUnit] = await Promise.all([
    GetTestGroupById(testGroupId),
    GetTestCategory(),
    GetAllUnit(),
  ]);

  if (!group) {
    return notFound();
  }

  return (
    <PageContainer>
      <TestGroupForm
        mode="edit"
        testGroup={group}
        testCategories={categories}
        testUnit={testUnit}
      />
    </PageContainer>
  );
}
