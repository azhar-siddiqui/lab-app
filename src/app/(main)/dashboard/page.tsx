import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect("/auth/sign-in");

  return <h1>Dashboard</h1>;
}
