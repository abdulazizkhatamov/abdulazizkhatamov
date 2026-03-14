import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

const ADMIN_GITHUB_USERNAME = "abdulazizkhatamov";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/admin/login");
  }

  // Double-check the GitHub username from the account
  const isAdmin = session.user.name === ADMIN_GITHUB_USERNAME ||
    session.user.email?.includes(ADMIN_GITHUB_USERNAME);

  // The primary guard is the databaseHooks in auth.ts — this is a secondary UI guard
  if (!isAdmin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-(--color-bg) dark:bg-(--color-bg-dark)">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-60">{children}</main>
    </div>
  );
}
