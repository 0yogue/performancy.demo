import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { TrendingUp, Target, Phone, DollarSign, Award, ArrowUp, ArrowDown } from "lucide-react";
import type { SessionUser } from "@/types";

export default async function PerformancePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;

  const metrics = [
    {
      title: "Conversões",
      value: "24",
      target: "30",
      percentage: 80,
      trend: "up",
      icon: Target,
    },
    {
      title: "Ligações",
      value: "156",
      target: "150",
      percentage: 104,
      trend: "up",
      icon: Phone,
    },
    {
      title: "Receita",
      value: "R$ 125k",
      target: "R$ 150k",
      percentage: 83,
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Score Médio",
      value: "87",
      target: "85",
      percentage: 102,
      trend: "up",
      icon: Award,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Performance</h1>
        <p className="text-muted-foreground">
          Acompanhe suas métricas e resultados
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className="text-sm text-muted-foreground">/ {metric.target}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.percentage >= 100 ? "bg-green-500" : "bg-primary"
                    }`}
                    style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                  />
                </div>
                <span className="text-xs flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500" />
                  )}
                  {metric.percentage}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução Mensal</CardTitle>
            <CardDescription>Suas conversões nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {[18, 22, 19, 25, 28, 24].map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary/20 rounded-t"
                    style={{ height: `${(value / 30) * 100}%` }}
                  >
                    <div
                      className="w-full bg-primary rounded-t"
                      style={{ height: `${(value / 30) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {["Jul", "Ago", "Set", "Out", "Nov", "Dez"][idx]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking do Squad</CardTitle>
            <CardDescription>Sua posição no time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Ana Costa", value: "R$ 180k", position: 1 },
              { name: user.name, value: "R$ 125k", position: 2 },
              { name: "Carlos Lima", value: "R$ 98k", position: 3 },
              { name: "Julia Santos", value: "R$ 85k", position: 4 },
            ].map((person) => (
              <div
                key={person.position}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  person.name === user.name ? "bg-primary/10" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    #{person.position}
                  </span>
                  <span className="font-medium">{person.name}</span>
                </div>
                <span className="font-bold">{person.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
