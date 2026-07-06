import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { TestTableSection } from "./_components/test-table-section";

export default function TestPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="flex-1 text-2xl font-bold tracking-tight">
            Test database
          </h2>
          <div className="flex items-center gap-x-2">
            <Link
              href="/test/new"
              className={buttonVariants({ variant: "default" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add new
            </Link>
            <Link
              href="/test"
              className={buttonVariants({ variant: "default" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Import
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground mt-4 text-sm">
          <b>Important:</b> It is required that your laboratory proofreads and
          updates the provided reference range before using it for printing lab
          reports.
        </p>

        <Suspense fallback={<DataTableSkeleton rows={8} columns={5} />}>
          <TestTableSection />
        </Suspense>
      </div>
    </PageContainer>
  );
}