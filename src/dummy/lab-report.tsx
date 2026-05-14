import { Button } from "@/components/ui/button";

export function LabReportAccordionExample() {
  const testGroups = [
    {
      id: "blood-sugar",
      name: "Blood Sugar",
      tests: [
        {
          id: "fasting",
          name: "Fasting Blood Sugar",
          unit: "mg/dL",
          range: "70 - 100",
        },
        {
          id: "pp",
          name: "Postprandial Blood Sugar",
          unit: "mg/dL",
          range: "100 - 140",
        },
      ],
    },
    {
      id: "cbc",
      name: "CBC",
      tests: [
        {
          id: "hb",
          name: "Hemoglobin",
          unit: "g/dL",
          range: "13 - 17",
        },
        {
          id: "wbc",
          name: "WBC",
          unit: "cells/cumm",
          range: "4000 - 11000",
        },
      ],
    },
    {
      id: "cbc1",
      name: "CBC1",
      tests: [
        {
          id: "hb",
          name: "Hemoglobin",
          unit: "g/dL",
          range: "13 - 17",
        },
        {
          id: "wbc",
          name: "WBC",
          unit: "cells/cumm",
          range: "4000 - 11000",
        },
      ],
    },
    {
      id: "cbc2",
      name: "CBC2",
      tests: [
        {
          id: "hb",
          name: "Hemoglobin",
          unit: "g/dL",
          range: "13 - 17",
        },
        {
          id: "wbc",
          name: "WBC",
          unit: "cells/cumm",
          range: "4000 - 11000",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Patient Report Entry
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Enter patient test results and save each section independently.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
              <div>
                <p className="font-medium">Patient</p>
                <p className="text-muted-foreground">Mr. John Doe</p>
              </div>

              <div>
                <p className="font-medium">Age / Gender</p>
                <p className="text-muted-foreground">28 Years / Male</p>
              </div>

              <div>
                <p className="font-medium">Ref. Doctor</p>
                <p className="text-muted-foreground">Dr. Sharma</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] relative">
          <div className="sticky top-16 h-fit rounded-xl border bg-background p-4 shadow-sm order-1 hidden lg:block">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Test Groups
            </h2>

            <div className="space-y-3">
              {testGroups.map((group, index) => (
                <button
                  key={group.id}
                  className="w-full rounded-xl border p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {group.tests.length} Tests
                      </p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                      →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 order-2">
            {testGroups.map((group) => (
              <div
                key={group.id}
                className="overflow-hidden rounded-xl border bg-background shadow-sm"
              >
                <div className="flex items-center justify-between border-b bg-muted/30 px-6 py-4">
                  <div>
                    <h2 className="text-lg font-semibold">{group.name}</h2>
                    <p className="text-muted-foreground text-sm">
                      Enter patient result values.
                    </p>
                  </div>

                  <Button size="lg" className="rounded-xl">
                    Save & Next
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/20 text-left">
                        <th className="px-6 py-4 text-sm font-semibold">
                          Parameter
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold">
                          Result
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold">
                          Unit
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold">
                          Reference Range
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {group.tests.map((test) => (
                        <tr key={test.id} className="border-b last:border-none">
                          <td className="px-6 py-4 text-sm font-medium">
                            {test.name}
                          </td>

                          <td className="px-6 py-4">
                            <input
                              placeholder="Enter result"
                              className="focus:ring-primary w-full rounded-xl border bg-background px-4 py-2 text-sm outline-none focus:ring-2"
                            />
                          </td>

                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {test.unit}
                          </td>

                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {test.range}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
