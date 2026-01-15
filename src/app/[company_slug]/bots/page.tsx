import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Cpu, Play, Pause, Settings, Zap, Mail, MessageSquare } from "lucide-react";
import type { SessionUser } from "@/types";
import { Button } from "@/components/ui";

export default async function BotsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bots = [
    {
      id: "1",
      name: "Follow-up Automático",
      description: "Envia lembretes automáticos para leads sem resposta há 3 dias",
      type: "email",
      status: "active",
      executions: 234,
      icon: Mail,
    },
    {
      id: "2",
      name: "Qualificação de Leads",
      description: "Analisa conversas e pontua leads automaticamente",
      type: "analysis",
      status: "active",
      executions: 156,
      icon: Zap,
    },
    {
      id: "3",
      name: "Notificação de Reunião",
      description: "Lembra participantes 1h antes da reunião",
      type: "notification",
      status: "paused",
      executions: 89,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bots & Automações</h1>
          <p className="text-muted-foreground">
            Configure automações inteligentes para seu fluxo de vendas
          </p>
        </div>
        <Button>
          <Cpu className="mr-2 h-4 w-4" />
          Novo Bot
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Play className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Bots Ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Pause className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Pausados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">479</p>
              <p className="text-sm text-muted-foreground">Execuções Este Mês</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {bots.map((bot) => (
          <Card key={bot.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <bot.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{bot.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      bot.status === "active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {bot.status === "active" ? "Ativo" : "Pausado"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{bot.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{bot.executions}</p>
                <p className="text-xs text-muted-foreground">execuções</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  {bot.status === "active" ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button size="icon" variant="ghost">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Cpu className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="mb-2">Crie sua automação</CardTitle>
          <CardDescription>
            Configure bots para automatizar tarefas repetitivas e aumentar sua produtividade
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
