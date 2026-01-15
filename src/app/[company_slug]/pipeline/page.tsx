import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { DollarSign } from "lucide-react";
import type { SessionUser } from "@/types";

export default async function PipelinePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const stages = [
    {
      name: "Qualificação",
      deals: [
        { id: "1", name: "Tech Corp", value: 15000, days: 5 },
        { id: "2", name: "StartupXYZ", value: 8000, days: 3 },
      ],
    },
    {
      name: "Apresentação",
      deals: [
        { id: "3", name: "MegaCorp", value: 45000, days: 12 },
      ],
    },
    {
      name: "Proposta",
      deals: [
        { id: "4", name: "GlobalTech", value: 32000, days: 8 },
        { id: "5", name: "DataCo", value: 22000, days: 15 },
      ],
    },
    {
      name: "Negociação",
      deals: [
        { id: "6", name: "CloudSys", value: 55000, days: 20 },
      ],
    },
    {
      name: "Fechamento",
      deals: [
        { id: "7", name: "InnovateTech", value: 28000, days: 25 },
      ],
    },
  ];

  const format_currency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const total_pipeline = stages.reduce(
    (acc, stage) => acc + stage.deals.reduce((sum, deal) => sum + deal.value, 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pipeline</h1>
          <p className="text-muted-foreground">
            Gerencie suas oportunidades de vendas
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total no funil</p>
          <p className="text-2xl font-bold text-primary">
            {format_currency(total_pipeline)}
          </p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stage_total = stage.deals.reduce((sum, deal) => sum + deal.value, 0);
          return (
            <div key={stage.name} className="flex-shrink-0 w-72">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {stage.name}
                    </CardTitle>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {stage.deals.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format_currency(stage_total)}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2">
                  {stage.deals.map((deal) => (
                    <Card
                      key={deal.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <CardContent className="p-3">
                        <p className="font-medium text-sm">{deal.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <DollarSign className="h-3 w-3" />
                            {format_currency(deal.value)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {deal.days} dias
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
