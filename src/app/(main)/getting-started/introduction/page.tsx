import { IntroductionView } from "@/features/getting-started/introduction-view";
import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction — MedicareLab",
  description:
    "Get started with MedicareLab — your pathology laboratory management portal.",
};

export default async function IntroductionPage() {
  const session = await getServerSession();

  return <IntroductionView userName={session?.user?.name} />;
}