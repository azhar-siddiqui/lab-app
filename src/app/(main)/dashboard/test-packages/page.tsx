import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { TestPackagesSection } from "./_components/test-packages-section";

export default function TestPackagesPage() {
  return (
    <PageContainer
      pageTitle="Test Packages"
      pageDescription="Browse and manage test group packages used in patient registration."
      pageHeaderAction={
        <Link href="/test/new" className={buttonVariants()}>
          <Plus className="mr-2 size-4" />
          Add package
        </Link>
      }
    >
      <Suspense fallback={<DataTableSkeleton rows={8} columns={5} />}>
        <TestPackagesSection />
      </Suspense>
    </PageContainer>
  );
}