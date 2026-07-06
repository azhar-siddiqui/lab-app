import { GetTestGroup } from "@/actions/test-group/get-test-group";
import { DataTable } from "@/components/data-table/data-table";
import { testGroupColumns } from "./columns";

export async function TestTableSection() {
  const testGroups = await GetTestGroup();

  return (
    <DataTable
      data={testGroups}
      columns={testGroupColumns}
      searchKeys={["name", "shortName"]}
      searchPlaceholder="Search Test Group"
      dateFilterKey="createdAt"
    />
  );
}