import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { get_user_menu } from "@/lib/licenses/menu";
import { Sidebar } from "@/components/layout";
import type { SessionUser } from "@/types";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ company_slug: string }>;
}

export default async function CompanyLayout({ children, params }: LayoutProps) {
  const { company_slug } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;

  // Verify user has access to this company
  if (user.role !== "ADMIN" && user.company_slug !== company_slug) {
    redirect("/login");
  }

  const menu_items = await get_user_menu(user);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} menu_items={menu_items} company_slug={company_slug} />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
