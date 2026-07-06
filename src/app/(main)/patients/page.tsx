import PageContainer from "@/components/layout/page-container";
import { DataTableSkeleton } from "@/components/skeletons/page-skeletons";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PatientsTableSection } from "./_components/patients-table-section";

export default function PatientsPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="flex-1 text-2xl font-bold tracking-tight">
            Patients database
          </h2>
          <Link
            href="/patients/new"
            className={buttonVariants({ variant: "default" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Link>
        </div>
        <p className="text-muted-foreground mt-4 text-sm">
          <b>Important:</b> It is required that your laboratory proofreads and
          updates the provided reference range before using it for printing lab
          reports.
        </p>

        <Suspense fallback={<DataTableSkeleton rows={8} columns={7} />}>
          <PatientsTableSection />
        </Suspense>
      </div>
    </PageContainer>
  );
}