import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";
import type { SessionUser } from "@/types";

export default async function ConversationsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;

  const mock_conversations = [
    {
      id: "1",
      contact: "João Silva",
      channel: "phone",
      last_message: "Vamos agendar uma reunião para discutir a proposta",
      time: "10 min",
      status: "pending",
    },
    {
      id: "2",
      contact: "Maria Santos",
      channel: "email",
      last_message: "Obrigado pelo follow-up, vou analisar",
      time: "1h",
      status: "replied",
    },
    {
      id: "3",
      contact: "Pedro Costa",
      channel: "phone",
      last_message: "Interessante! Me envie mais detalhes",
      time: "2h",
      status: "pending",
    },
  ];

  const get_channel_icon = (channel: string) => {
    switch (channel) {
      case "phone":
        return Phone;
      case "email":
        return Mail;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conversas</h1>
          <p className="text-muted-foreground">
            Gerencie suas conversas com clientes
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {mock_conversations.map((conversation) => {
          const ChannelIcon = get_channel_icon(conversation.channel);
          return (
            <Card
              key={conversation.id}
              className="hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ChannelIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{conversation.contact}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {conversation.time}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.last_message}
                  </p>
                </div>
                {conversation.status === "pending" && (
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="mb-2">Integre suas conversas</CardTitle>
          <CardDescription>
            Conecte seu telefone ou email para importar conversas automaticamente
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
