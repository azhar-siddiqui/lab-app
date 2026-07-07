import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { getServerSession } from "@/lib/get-session";
import { getPostAuthRedirect } from "@/lib/onboarding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MedicareLab — Laboratory Management Software",
  description:
    "Manage patients, tests, billing, and printable pathology reports in one secure portal. Built for diagnostic labs.",
  openGraph: {
    title: "MedicareLab — Laboratory Management Software",
    description:
      "Precision in every test, care in every result. The all-in-one portal for pathology labs.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  const user = session?.user;
  const dashboardHref = user ? getPostAuthRedirect(user) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav dashboardHref={dashboardHref} />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}