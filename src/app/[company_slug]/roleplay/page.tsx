import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Mic, Trophy, Flame, Target, Play } from "lucide-react";
import type { SessionUser } from "@/types";
import { Button } from "@/components/ui";

export default async function RolePlayPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;

  const stats = [
    { label: "Sessões", value: "24", icon: Mic },
    { label: "Score Médio", value: "87", icon: Target },
    { label: "Streak", value: "5 dias", icon: Flame },
    { label: "Badges", value: "12", icon: Trophy },
  ];

  const recent_sessions = [
    { id: "1", playbook: "Discovery Call", score: 92, date: "Hoje" },
    { id: "2", playbook: "Demo de Produto", score: 85, date: "Ontem" },
    { id: "3", playbook: "Negociação", score: 78, date: "2 dias atrás" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Role Play</h1>
          <p className="text-muted-foreground">
            Treine suas habilidades de vendas com IA
          </p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Nova Sessão
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sessões Recentes</CardTitle>
            <CardDescription>Seus últimos treinos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recent_sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{session.playbook}</p>
                  <p className="text-sm text-muted-foreground">{session.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{session.score}</p>
                  <p className="text-xs text-muted-foreground">pontos</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking do Squad</CardTitle>
            <CardDescription>Top performers da semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Ana Costa", score: 95, position: 1 },
              { name: user.name, score: 87, position: 2 },
              { name: "Carlos Lima", score: 82, position: 3 },
            ].map((player) => (
              <div
                key={player.position}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  player.name === user.name ? "bg-primary/10" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground">
                    #{player.position}
                  </span>
                  <span className="font-medium">{player.name}</span>
                </div>
                <span className="font-bold">{player.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
