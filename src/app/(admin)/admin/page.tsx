import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Package, Shield, Users, Building } from "lucide-react";
import prisma from "@/lib/db";

export default async function AdminDashboardPage() {
  const [features_count, users_count, companies_count] = await Promise.all([
    prisma.feature.count(),
    prisma.user.count(),
    prisma.company.count(),
  ]);

  const stats = [
    {
      title: "Features",
      value: features_count,
      description: "Features configuradas",
      icon: Package,
    },
    {
      title: "Usuários",
      value: users_count,
      description: "Total de usuários",
      icon: Users,
    },
    {
      title: "Empresas",
      value: companies_count,
      description: "Empresas cadastradas",
      icon: Building,
    },
    {
      title: "Licenças",
      value: "4",
      description: "Tipos de licença",
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Gerencie features, licenças e permissões do sistema
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gestão de Features</CardTitle>
            <CardDescription>
              Configure quais features estão disponíveis em cada licença
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Acesse o painel de Features para habilitar ou desabilitar
              funcionalidades por tipo de licença.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissões por Role</CardTitle>
            <CardDescription>
              Configure permissões CRUD e visibilidade por função
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Defina o que cada nível hierárquico (ADMIN, DIRECTOR, MANAGER, AGENT)
              pode fazer em cada feature.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
