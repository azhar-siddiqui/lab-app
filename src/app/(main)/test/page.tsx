import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TestPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight flex-1">
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
        <p className="text-sm text-muted-foreground mt-4">
          <b>Important:</b> It is required that your laboratory proofreads and
          updates the provided reference range before using it for printing lab
          reports.
        </p>

        <div>TestDataPage</div>
      </div>
    </PageContainer>
  );
}
