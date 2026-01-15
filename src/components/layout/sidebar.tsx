"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import type { MenuItem, SessionUser } from "@/types";

interface SidebarProps {
  user: SessionUser;
  menu_items: MenuItem[];
  company_slug?: string;
}

export function Sidebar({ user, menu_items, company_slug }: SidebarProps) {
  const pathname = usePathname();
  const base_path = company_slug ? `/${company_slug}` : "";

  const get_icon = (icon_name: string): LucideIcons.LucideIcon => {
    const icons = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
    return icons[icon_name] || LucideIcons.Circle;
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href={base_path || "/"} className="flex items-center gap-2">
          <LucideIcons.Zap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Performancy</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menu_items.map((item) => {
            const Icon = get_icon(item.icon);
            const href = `${base_path}${item.path}`;
            const is_active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={item.code}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    is_active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LucideIcons.LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
