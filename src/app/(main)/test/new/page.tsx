import PageContainer from "@/components/layout/page-container";

export default function NewTestGroupPage() {
  return (
    <PageContainer>
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Test database</h2>
        <p className="text-sm text-muted-foreground mt-2">
          You can also choose to create a similar test, by simply visiting view
          test page and using "Create similar test" link, present at the bottom
          of the page.
        </p>
      </div>
    </PageContainer>
  );
}
