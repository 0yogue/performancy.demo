import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { BarChart3, Users, MessageSquare, Target } from "lucide-react";
import type { SessionUser } from "@/types";
import { LICENSE_NAMES, LICENSE_DESCRIPTIONS } from "@/lib/licenses";
import { ROLE_NAMES } from "@/lib/rbac";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;

  const stats = [
    {
      title: "Conversas",
      value: "128",
      description: "+12% desde o mês passado",
      icon: MessageSquare,
    },
    {
      title: "Performance",
      value: "87%",
      description: "Meta: 85%",
      icon: Target,
    },
    {
      title: "Equipe",
      value: "24",
      description: "Membros ativos",
      icon: Users,
    },
    {
      title: "Análises",
      value: "342",
      description: "Este mês",
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo(a), {user.name}!
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
            <CardTitle>Seu Perfil</CardTitle>
            <CardDescription>Informações da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nome:</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Função:</span>
              <span className="font-medium">{ROLE_NAMES[user.role]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Licença:</span>
              <span className="font-medium">{LICENSE_NAMES[user.license_type]}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sua Licença</CardTitle>
            <CardDescription>{LICENSE_NAMES[user.license_type]}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {LICENSE_DESCRIPTIONS[user.license_type]}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
