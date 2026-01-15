import { get_all_features } from "@/lib/licenses/menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { LicenseType, UserRole } from "@prisma/client";
import { LICENSE_NAMES } from "@/lib/licenses";
import { ROLE_NAMES } from "@/lib/rbac";
import { Check, X } from "lucide-react";

export default async function AdminFeaturesPage() {
  const features = await get_all_features();
  const license_types: LicenseType[] = ["AUTO_CRM", "TREINAMENTO", "ATIVIDADES", "AREA_RECEITA"];
  const roles: UserRole[] = ["ADMIN", "DIRECTOR", "MANAGER", "AGENT"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestão de Features</h1>
        <p className="text-muted-foreground">
          Configure features por licença e permissões por role
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Features por Licença</CardTitle>
          <CardDescription>
            Quais features estão disponíveis em cada tipo de licença
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Feature</th>
                  {license_types.map((lt) => (
                    <th key={lt} className="text-center py-3 px-2 font-medium">
                      {LICENSE_NAMES[lt]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-xs text-muted-foreground">{feature.code}</div>
                    </td>
                    {license_types.map((lt) => {
                      const lf = feature.license_features.find(
                        (x) => x.license_type === lt
                      );
                      const enabled = lf?.enabled ?? false;
                      return (
                        <td key={lt} className="text-center py-3 px-2">
                          {enabled ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-400 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permissões por Role</CardTitle>
          <CardDescription>
            Permissões CRUD e visibilidade de dados por função
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Feature</th>
                  <th className="text-left py-3 px-2 font-medium">Role</th>
                  <th className="text-center py-3 px-2 font-medium">Criar</th>
                  <th className="text-center py-3 px-2 font-medium">Ler</th>
                  <th className="text-center py-3 px-2 font-medium">Editar</th>
                  <th className="text-center py-3 px-2 font-medium">Deletar</th>
                  <th className="text-center py-3 px-2 font-medium">Visibilidade</th>
                </tr>
              </thead>
              <tbody>
                {features.slice(0, 5).map((feature) =>
                  roles.map((role, idx) => {
                    const perm = feature.role_permissions.find((x) => x.role === role);
                    return (
                      <tr
                        key={`${feature.id}-${role}`}
                        className={`border-b hover:bg-muted/50 ${idx === 0 ? "bg-muted/30" : ""}`}
                      >
                        {idx === 0 && (
                          <td rowSpan={4} className="py-3 px-2 font-medium align-top">
                            {feature.name}
                          </td>
                        )}
                        <td className="py-3 px-2">{ROLE_NAMES[role]}</td>
                        <td className="text-center py-3 px-2">
                          {perm?.can_create ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-400 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          {perm?.can_read ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-400 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          {perm?.can_update ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-400 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          {perm?.can_delete ? (
                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-red-400 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-2 text-xs">
                          {perm?.visibility || "OWN"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
