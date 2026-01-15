import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { LICENSE_NAMES, LICENSE_DESCRIPTIONS, BASE_FEATURES_BY_LICENSE } from "@/lib/licenses";
import { LicenseType } from "@prisma/client";
import { Check } from "lucide-react";

export default function AdminLicensesPage() {
  const license_types: LicenseType[] = ["AUTO_CRM", "TREINAMENTO", "ATIVIDADES", "AREA_RECEITA"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tipos de Licença</h1>
        <p className="text-muted-foreground">
          Visão geral dos tipos de licença disponíveis no sistema
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {license_types.map((lt, idx) => (
          <Card key={lt} className={idx === license_types.length - 1 ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{LICENSE_NAMES[lt]}</CardTitle>
                {idx === license_types.length - 1 && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Completa
                  </span>
                )}
              </div>
              <CardDescription>{LICENSE_DESCRIPTIONS[lt]}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-medium mb-2">Features incluídas:</h4>
              <ul className="grid grid-cols-2 gap-1">
                {BASE_FEATURES_BY_LICENSE[lt].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-3 w-3 text-green-500" />
                    <span className="capitalize">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparativo de Licenças</CardTitle>
          <CardDescription>
            Veja as diferenças entre cada tipo de licença
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Característica</th>
                  {license_types.map((lt) => (
                    <th key={lt} className="text-center py-3 px-2 font-medium">
                      {LICENSE_NAMES[lt]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-2">Conversas & CRM</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Playbooks</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Role Play & Treinamento</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Chat IA</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Inbox & Atividades</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Pipeline & Funil</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Performance & Insights</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Metas & KPIs</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Bots & Automações</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">Dashboard Executivo</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2">-</td>
                  <td className="text-center py-3 px-2"><Check className="h-4 w-4 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
