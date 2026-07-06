import PageContainer from "@/components/layout/page-container";
import { IntroductionPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function IntroductionLoading() {
  return (
    <PageContainer scrollable>
      <IntroductionPageSkeleton />
    </PageContainer>
  );
}