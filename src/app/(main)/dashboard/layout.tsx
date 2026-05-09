import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MedicareLab Admin Portal",
  description:
    "Secure administrative interface for Medicare Lab data management and laboratory reporting.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect("/auth/sign-in");

  return children;
}
