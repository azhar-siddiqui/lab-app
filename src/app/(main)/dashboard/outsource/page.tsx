import PageContainer from "@/components/layout/page-container";
import { OutsourceView } from "./_components/outsource-view";

export default function OutsourcePage() {
  return (
    <PageContainer
      pageTitle="Outsource Cases"
      pageDescription="Track cases sent to partner laboratories for external processing."
    >
      <OutsourceView />
    </PageContainer>
  );
}