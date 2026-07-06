import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingNav } from "@/components/marketing/marketing-nav";
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

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}