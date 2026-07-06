import { GetPatientReports } from "@/actions/patient-report/get-all-patient-report";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./colums";

export async function PatientsTableSection() {
  const reports = await GetPatientReports();

  return (
    <DataTable
      data={reports}
      columns={columns}
      searchKeys={["patient.name"]}
      searchPlaceholder="Search patient..."
      dateFilterKey="reportDate"
    />
  );
}