import { GetTestGroup } from "@/actions/test-group/get-test-group";
import { DataTable } from "@/components/data-table/data-table";
import { testGroupColumns } from "@/app/(main)/test/_components/columns";

export async function TestPackagesSection() {
  const testGroups = await GetTestGroup();

  return (
    <DataTable
      data={testGroups}
      columns={testGroupColumns}
      searchKeys={["name", "shortName"]}
      searchPlaceholder="Search test packages..."
      dateFilterKey="createdAt"
    />
  );
}