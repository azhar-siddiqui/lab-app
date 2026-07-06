import { getServerSession } from "@/lib/get-session";
import { getFreshUserProfile } from "@/lib/get-user-profile";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    const profile = await getFreshUserProfile(user.id);

    if (profile?.onboardingCompleted) {
      redirect("/dashboard/overview");
    }
  }

  return children;
}