import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import type { SessionUser } from "@/types";
import { LICENSE_NAMES } from "@/lib/licenses";
import { ROLE_NAMES } from "@/lib/rbac";
import { User, Mail, Shield, CreditCard, Building, Users } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as SessionUser;

  const profile_items = [
    { label: "Nome", value: user.name, icon: User },
    { label: "Email", value: user.email, icon: Mail },
    { label: "Função", value: ROLE_NAMES[user.role], icon: Shield },
    { label: "Licença", value: LICENSE_NAMES[user.license_type], icon: CreditCard },
    { label: "Empresa", value: user.company_slug || "Não vinculado", icon: Building },
    { label: "Squad", value: user.squad_id ? "Vinculado" : "Não vinculado", icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie suas informações pessoais
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Seus dados de cadastro no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile_items.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>
              Sua foto de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <p className="text-sm text-muted-foreground">
              {user.name}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
