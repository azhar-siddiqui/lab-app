import { GetPatientReports } from "@/actions/patient-report/get-all-patient-report";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./_components/colums";
import { DataTable } from "./_components/data-table";

export default async function PatientsPage() {
  const reports = await GetPatientReports();
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight flex-1">
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
        <p className="text-sm text-muted-foreground mt-4">
          <b>Important:</b> It is required that your laboratory proofreads and
          updates the provided reference range before using it for printing lab
          reports.
        </p>

        <div>
          <DataTable columns={columns} data={reports} />
        </div>
      </div>
    </PageContainer>
  );
}
