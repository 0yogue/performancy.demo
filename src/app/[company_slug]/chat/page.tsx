import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Bot, Send, Sparkles } from "lucide-react";
import type { SessionUser } from "@/types";
import { Button, Input } from "@/components/ui";

export default async function ChatPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const suggestions = [
    "Como lidar com objeção de preço?",
    "Me ajude a qualificar este lead",
    "Qual a melhor abordagem para discovery?",
    "Analise minha última conversa",
  ];

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold">Chat IA</h1>
        <p className="text-muted-foreground">
          Seu assistente de vendas com inteligência artificial
        </p>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col justify-center items-center p-8">
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Como posso ajudar?</h2>
          <p className="text-muted-foreground text-center mb-6 max-w-md">
            Sou seu assistente de vendas. Posso ajudar com estratégias, 
            análise de conversas, técnicas de negociação e muito mais.
          </p>

          <div className="grid gap-2 md:grid-cols-2 w-full max-w-2xl">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                className="justify-start h-auto p-4 text-left"
              >
                <Sparkles className="h-4 w-4 mr-2 text-primary shrink-0" />
                <span className="text-sm">{suggestion}</span>
              </Button>
            ))}
          </div>
        </CardContent>

        <div className="border-t p-4">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <Input
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
