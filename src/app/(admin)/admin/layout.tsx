import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { SessionUser } from "@/types";
import Link from "next/link";
import { Zap, Settings, Shield, Package, Users } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: LayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;

  // Only ADMIN can access admin panel
  if (user.role !== "ADMIN") {
    redirect("/login");
  }

  const nav_items = [
    { href: "/admin", label: "Dashboard", icon: Settings },
    { href: "/admin/features", label: "Features", icon: Package },
    { href: "/admin/licenses", label: "Licenças", icon: Shield },
    { href: "/admin/users", label: "Usuários", icon: Users },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="flex h-screen w-64 flex-col border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {nav_items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4">
          <div className="text-xs text-muted-foreground">
            Logado como: {user.name}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
