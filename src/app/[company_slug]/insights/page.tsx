import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import type { SessionUser } from "@/types";

export default async function InsightsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const insights = [
    {
      id: "1",
      type: "improvement",
      title: "Aumente suas perguntas abertas",
      description:
        "Suas conversas têm apenas 35% de perguntas abertas. O ideal é acima de 60% para melhor qualificação.",
      action: "Revisar técnicas de questionamento",
      impact: "high",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      id: "2",
      type: "strength",
      title: "Excelente taxa de resposta",
      description:
        "Você responde em média em 2 minutos. Isso é 40% mais rápido que a média do time.",
      action: null,
      impact: "positive",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: "3",
      type: "opportunity",
      title: "Oportunidade de upsell identificada",
      description:
        "3 clientes do seu pipeline mencionaram interesse em funcionalidades do plano Enterprise.",
      action: "Ver clientes",
      impact: "high",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      id: "4",
      type: "improvement",
      title: "Talk ratio alto",
      description:
        "Em suas últimas calls, você falou 65% do tempo. O ideal para discovery é 30-40%.",
      action: "Praticar escuta ativa",
      impact: "medium",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
  ];

  const summary = {
    strengths: 3,
    improvements: 4,
    opportunities: 2,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Insights</h1>
        <p className="text-muted-foreground">
          Análises inteligentes para melhorar sua performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-green-200 dark:border-green-900">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{summary.strengths}</p>
              <p className="text-sm text-muted-foreground">Pontos Fortes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 dark:border-yellow-900">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{summary.improvements}</p>
              <p className="text-sm text-muted-foreground">Melhorias</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 dark:border-blue-900">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{summary.opportunities}</p>
              <p className="text-sm text-muted-foreground">Oportunidades</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-start gap-4 p-4">
              <div className={`p-2 bg-muted rounded-lg ${insight.color}`}>
                <insight.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{insight.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {insight.description}
                </p>
              </div>
              {insight.action && (
                <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                  {insight.action}
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
