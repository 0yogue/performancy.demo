import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Target, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import type { SessionUser } from "@/types";

export default async function GoalsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const objectives = [
    {
      id: "1",
      title: "Aumentar receita recorrente",
      area: "Receita",
      progress: 75,
      key_results: [
        { title: "Fechar R$ 500k em novos contratos", current: 375000, target: 500000 },
        { title: "Aumentar ticket médio em 20%", current: 15, target: 20 },
        { title: "Reduzir churn para 3%", current: 4.2, target: 3 },
      ],
    },
    {
      id: "2",
      title: "Expandir base de clientes",
      area: "Vendas",
      progress: 60,
      key_results: [
        { title: "Conquistar 50 novos clientes", current: 30, target: 50 },
        { title: "Entrar em 3 novos segmentos", current: 2, target: 3 },
      ],
    },
    {
      id: "3",
      title: "Melhorar eficiência do time",
      area: "Operações",
      progress: 88,
      key_results: [
        { title: "Reduzir ciclo de vendas para 30 dias", current: 32, target: 30 },
        { title: "Aumentar conversão para 25%", current: 22, target: 25 },
      ],
    },
  ];

  const format_value = (value: number, target: number) => {
    if (target >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}k`;
    }
    if (target <= 100) {
      return `${value}%`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Metas & KPIs</h1>
          <p className="text-muted-foreground">
            Objetivos e resultados-chave do trimestre
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1 rounded-lg">
          <Calendar className="h-4 w-4" />
          Q1 2026
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Objetivos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">74%</p>
              <p className="text-sm text-muted-foreground">Progresso Geral</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <DollarSign className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ 375k</p>
              <p className="text-sm text-muted-foreground">Receita Atual</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">30</p>
              <p className="text-sm text-muted-foreground">Novos Clientes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {objectives.map((obj) => (
          <Card key={obj.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{obj.title}</CardTitle>
                  <CardDescription>{obj.area}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{obj.progress}%</p>
                  <p className="text-xs text-muted-foreground">progresso</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${obj.progress}%` }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {obj.key_results.map((kr, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">{kr.title}</span>
                    <div className="text-right">
                      <span className="font-medium">
                        {format_value(kr.current, kr.target)}
                      </span>
                      <span className="text-muted-foreground"> / {format_value(kr.target, kr.target)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
