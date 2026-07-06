import PageContainer from "@/components/layout/page-container";
import { IntroductionPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function IntroductionLoading() {
  return (
    <PageContainer
      scrollable
      pageTitle="Introduction"
      pageDescription="Learn how MedicareLab helps you run your pathology lab from case registration to final report delivery."
    >
      <IntroductionPageSkeleton />
    </PageContainer>
  );
}