import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Settings, Users, Building, Shield } from "lucide-react";
import type { SessionUser } from "@/types";
import { can_manage_company_settings } from "@/lib/rbac";
import Link from "next/link";

interface PageProps {
  params: Promise<{ company_slug: string }>;
}

export default async function SettingsPage({ params }: PageProps) {
  const { company_slug } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;
  const can_manage = can_manage_company_settings(user.role);

  const settings_sections = [
    {
      title: "Perfil",
      description: "Gerencie suas informações pessoais",
      icon: Settings,
      href: `/${company_slug}/profile`,
      allowed: true,
    },
    {
      title: "Usuários",
      description: "Gerencie os usuários da empresa",
      icon: Users,
      href: `/${company_slug}/settings/users`,
      allowed: can_manage,
    },
    {
      title: "Empresa",
      description: "Configurações da empresa",
      icon: Building,
      href: `/${company_slug}/settings/company`,
      allowed: can_manage,
    },
    {
      title: "Integrações",
      description: "Conecte com outras ferramentas",
      icon: Shield,
      href: `/${company_slug}/settings/integrations`,
      allowed: can_manage,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua conta e empresa
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settings_sections
          .filter((section) => section.allowed)
          .map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
