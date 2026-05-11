import AppSidebar from "@/components/common/app-sidebar";
import KBar from "@/components/kbar";
import { Header } from "@/components/layout/header";
import { InfobarProvider } from "@/components/ui/infobar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { cookies } from "next/headers";
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

  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <InfobarProvider defaultOpen={false}>
          <AppSidebar user={user} />
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </InfobarProvider>
      </SidebarProvider>
    </KBar>
  );
}
