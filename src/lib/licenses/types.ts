import { LicenseType } from "@prisma/client";

export const LICENSE_HIERARCHY: Record<LicenseType, number> = {
  AUTO_CRM: 1,
  TREINAMENTO: 2,
  ATIVIDADES: 3,
  AREA_RECEITA: 4,
};

export const LICENSE_NAMES: Record<LicenseType, string> = {
  AUTO_CRM: "AutoCRM",
  TREINAMENTO: "Treinamento",
  ATIVIDADES: "Atividades",
  AREA_RECEITA: "Área de Receita",
};

export const LICENSE_DESCRIPTIONS: Record<LicenseType, string> = {
  AUTO_CRM: "Conversas, Configurações e Playbook",
  TREINAMENTO: "AutoCRM + Role Play e Chat IA",
  ATIVIDADES: "Treinamento + Inbox, Agenda, Performance, Funil e Insights",
  AREA_RECEITA: "Todas as features + Metas/KPIs, Bots e Dashboard Executivo",
};

export const BASE_FEATURES_BY_LICENSE: Record<LicenseType, string[]> = {
  AUTO_CRM: ["conversations", "settings", "playbooks"],
  TREINAMENTO: ["conversations", "settings", "playbooks", "roleplay", "chat"],
  ATIVIDADES: [
    "conversations",
    "settings",
    "playbooks",
    "roleplay",
    "chat",
    "inbox",
    "calendar",
    "performance",
    "pipeline",
    "insights",
  ],
  AREA_RECEITA: [
    "conversations",
    "settings",
    "playbooks",
    "roleplay",
    "chat",
    "inbox",
    "calendar",
    "performance",
    "pipeline",
    "insights",
    "goals",
    "bots",
    "dashboard",
  ],
};
