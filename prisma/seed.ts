import { PrismaClient, UserRole, LicenseType, DataScope } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const FEATURES = [
  { code: "dashboard", name: "Dashboard", menu_path: "/dashboard", menu_icon: "LayoutDashboard", menu_order: 1 },
  { code: "conversations", name: "Conversas", menu_path: "/conversations", menu_icon: "MessageSquare", menu_order: 2 },
  { code: "playbooks", name: "Playbooks", menu_path: "/playbooks", menu_icon: "BookOpen", menu_order: 3 },
  { code: "roleplay", name: "Role Play", menu_path: "/roleplay", menu_icon: "Mic", menu_order: 4 },
  { code: "chat", name: "Chat IA", menu_path: "/chat", menu_icon: "Bot", menu_order: 5 },
  { code: "inbox", name: "Inbox", menu_path: "/inbox", menu_icon: "Inbox", menu_order: 6 },
  { code: "calendar", name: "Agenda", menu_path: "/calendar", menu_icon: "Calendar", menu_order: 7 },
  { code: "performance", name: "Performance", menu_path: "/performance", menu_icon: "TrendingUp", menu_order: 8 },
  { code: "pipeline", name: "Funil", menu_path: "/pipeline", menu_icon: "Filter", menu_order: 9 },
  { code: "insights", name: "Insights", menu_path: "/insights", menu_icon: "Lightbulb", menu_order: 10 },
  { code: "goals", name: "Metas & KPIs", menu_path: "/goals", menu_icon: "Target", menu_order: 11 },
  { code: "bots", name: "Bots", menu_path: "/bots", menu_icon: "Cpu", menu_order: 12 },
  { code: "settings", name: "Configurações", menu_path: "/settings", menu_icon: "Settings", menu_order: 98 },
  { code: "profile", name: "Perfil", menu_path: "/profile", menu_icon: "User", menu_order: 99 },
];

const LICENSE_FEATURES: Record<LicenseType, string[]> = {
  AUTO_CRM: ["dashboard", "conversations", "playbooks", "settings", "profile"],
  TREINAMENTO: ["dashboard", "conversations", "playbooks", "roleplay", "chat", "settings", "profile"],
  ATIVIDADES: ["dashboard", "conversations", "playbooks", "roleplay", "chat", "inbox", "calendar", "performance", "pipeline", "insights", "settings", "profile"],
  AREA_RECEITA: ["dashboard", "conversations", "playbooks", "roleplay", "chat", "inbox", "calendar", "performance", "pipeline", "insights", "goals", "bots", "settings", "profile"],
};

const DEFAULT_PERMISSIONS: Record<UserRole, { can_create: boolean; can_read: boolean; can_update: boolean; can_delete: boolean; visibility: DataScope }> = {
  ADMIN: { can_create: true, can_read: true, can_update: true, can_delete: true, visibility: "ALL" },
  DIRECTOR: { can_create: true, can_read: true, can_update: true, can_delete: true, visibility: "COMPANY" },
  MANAGER: { can_create: true, can_read: true, can_update: true, can_delete: false, visibility: "SQUAD" },
  AGENT: { can_create: true, can_read: true, can_update: true, can_delete: false, visibility: "OWN" },
};

async function main() {
  console.log("🌱 Seeding database...");

  // Create features
  console.log("📦 Creating features...");
  for (const feature of FEATURES) {
    await prisma.feature.upsert({
      where: { code: feature.code },
      update: feature,
      create: feature,
    });
  }

  // Create license features
  console.log("🔗 Creating license features...");
  const all_features = await prisma.feature.findMany();
  
  for (const [license_type, feature_codes] of Object.entries(LICENSE_FEATURES)) {
    for (const feature of all_features) {
      await prisma.licenseFeature.upsert({
        where: {
          license_type_feature_id: {
            license_type: license_type as LicenseType,
            feature_id: feature.id,
          },
        },
        update: {
          enabled: feature_codes.includes(feature.code),
        },
        create: {
          license_type: license_type as LicenseType,
          feature_id: feature.id,
          enabled: feature_codes.includes(feature.code),
        },
      });
    }
  }

  // Create role feature permissions
  console.log("🔐 Creating role permissions...");
  const roles: UserRole[] = ["ADMIN", "DIRECTOR", "MANAGER", "AGENT"];
  
  for (const feature of all_features) {
    for (const role of roles) {
      const perms = DEFAULT_PERMISSIONS[role];
      await prisma.roleFeaturePermission.upsert({
        where: {
          feature_id_role: {
            feature_id: feature.id,
            role,
          },
        },
        update: perms,
        create: {
          feature_id: feature.id,
          role,
          ...perms,
        },
      });
    }
  }

  // Create demo company
  console.log("🏢 Creating demo company...");
  const company = await prisma.company.upsert({
    where: { slug: "demo" },
    update: {},
    create: {
      name: "Demo Company",
      slug: "demo",
      is_active: true,
    },
  });

  // Create company licenses
  console.log("📄 Creating company licenses...");
  await prisma.companyLicense.upsert({
    where: {
      company_id_license_type: {
        company_id: company.id,
        license_type: "AREA_RECEITA",
      },
    },
    update: { quantity: 10 },
    create: {
      company_id: company.id,
      license_type: "AREA_RECEITA",
      quantity: 10,
    },
  });

  // Create demo squad
  console.log("👥 Creating demo squad...");
  const squad = await prisma.squad.upsert({
    where: { id: "demo-squad" },
    update: {},
    create: {
      id: "demo-squad",
      name: "Vendas",
      company_id: company.id,
    },
  });

  // Create admin user
  console.log("👤 Creating admin user...");
  const admin_password = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@performancy.com" },
    update: {},
    create: {
      email: "admin@performancy.com",
      name: "Admin Performancy",
      password_hash: admin_password,
      role: "ADMIN",
      status: "ACTIVE",
      license_type: "AREA_RECEITA",
    },
  });

  // Create director user
  console.log("👤 Creating director user...");
  const director_password = await bcrypt.hash("director123", 10);
  await prisma.user.upsert({
    where: { email: "director@demo.com" },
    update: {},
    create: {
      email: "director@demo.com",
      name: "Diretor Demo",
      password_hash: director_password,
      role: "DIRECTOR",
      status: "ACTIVE",
      license_type: "AREA_RECEITA",
      company_id: company.id,
    },
  });

  // Create manager user
  console.log("👤 Creating manager user...");
  const manager_password = await bcrypt.hash("manager123", 10);
  const manager = await prisma.user.upsert({
    where: { email: "manager@demo.com" },
    update: {},
    create: {
      email: "manager@demo.com",
      name: "Gerente Demo",
      password_hash: manager_password,
      role: "MANAGER",
      status: "ACTIVE",
      license_type: "ATIVIDADES",
      company_id: company.id,
      squad_id: squad.id,
    },
  });

  // Update squad manager
  await prisma.squad.update({
    where: { id: squad.id },
    data: { manager_id: manager.id },
  });

  // Create agent user
  console.log("👤 Creating agent user...");
  const agent_password = await bcrypt.hash("agent123", 10);
  await prisma.user.upsert({
    where: { email: "agent@demo.com" },
    update: {},
    create: {
      email: "agent@demo.com",
      name: "Agente Demo",
      password_hash: agent_password,
      role: "AGENT",
      status: "ACTIVE",
      license_type: "TREINAMENTO",
      company_id: company.id,
      squad_id: squad.id,
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log("\n📋 Demo Users:");
  console.log("  - Admin: admin@performancy.com / admin123");
  console.log("  - Director: director@demo.com / director123");
  console.log("  - Manager: manager@demo.com / manager123");
  console.log("  - Agent: agent@demo.com / agent123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
