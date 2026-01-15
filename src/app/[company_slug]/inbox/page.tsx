import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui";
import { Inbox, Phone, Mail, Calendar, Clock, AlertCircle } from "lucide-react";
import type { SessionUser } from "@/types";

export default async function InboxPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const activities = [
    {
      id: "1",
      type: "follow_up",
      title: "Follow-up com João Silva",
      description: "Retornar ligação sobre proposta comercial",
      priority: "high",
      due: "Hoje, 14:00",
      icon: Phone,
    },
    {
      id: "2",
      type: "email",
      title: "Responder Maria Santos",
      description: "Enviar detalhes do plano Enterprise",
      priority: "medium",
      due: "Hoje, 16:00",
      icon: Mail,
    },
    {
      id: "3",
      type: "meeting",
      title: "Demo com Tech Corp",
      description: "Apresentação de produto para equipe técnica",
      priority: "high",
      due: "Amanhã, 10:00",
      icon: Calendar,
    },
    {
      id: "4",
      type: "task",
      title: "Preparar proposta",
      description: "Finalizar proposta para cliente ABC",
      priority: "low",
      due: "Em 2 dias",
      icon: Clock,
    },
  ];

  const get_priority_color = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inbox</h1>
          <p className="text-muted-foreground">
            Suas atividades priorizadas por urgência e importância
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          {activities.filter((a) => a.priority === "high").length} urgentes
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <activity.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${get_priority_color(
                      activity.priority
                    )}`}
                  >
                    {activity.priority === "high"
                      ? "Urgente"
                      : activity.priority === "medium"
                      ? "Médio"
                      : "Baixo"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {activity.due}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
