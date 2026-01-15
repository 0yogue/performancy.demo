import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { BookOpen, Target, Users, TrendingUp } from "lucide-react";
import type { SessionUser } from "@/types";

export default async function PlaybooksPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const mock_playbooks = [
    {
      id: "1",
      title: "Discovery Call",
      description: "Roteiro para primeira ligação de qualificação",
      methodology: "SPICED",
      stages: 6,
      usage: 128,
    },
    {
      id: "2",
      title: "Demo de Produto",
      description: "Apresentação de features e benefícios",
      methodology: "SPIN",
      stages: 4,
      usage: 85,
    },
    {
      id: "3",
      title: "Negociação",
      description: "Técnicas para fechamento de vendas",
      methodology: "MEDDIC",
      stages: 5,
      usage: 42,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Playbooks</h1>
          <p className="text-muted-foreground">
            Roteiros e metodologias de vendas
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mock_playbooks.map((playbook) => (
          <Card
            key={playbook.id}
            className="hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  {playbook.methodology}
                </span>
              </div>
              <CardTitle className="mt-4">{playbook.title}</CardTitle>
              <CardDescription>{playbook.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {playbook.stages} etapas
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {playbook.usage} usos
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
