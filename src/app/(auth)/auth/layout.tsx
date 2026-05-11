import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerSession();

  if (user?.session) {
    redirect("/dashboard/overview");
  }
  return children;
}
