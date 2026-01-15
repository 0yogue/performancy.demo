import { UserRole, DataScope } from "@prisma/client";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  ADMIN: 4,
  DIRECTOR: 3,
  MANAGER: 2,
  AGENT: 1,
};

export const ROLE_NAMES: Record<UserRole, string> = {
  ADMIN: "Administrador",
  DIRECTOR: "Diretor",
  MANAGER: "Gerente",
  AGENT: "Agente",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  ADMIN: "Acesso total a todas as empresas (Performancy Staff)",
  DIRECTOR: "Acesso total à própria empresa",
  MANAGER: "Acesso aos squads que gerencia",
  AGENT: "Acesso apenas aos próprios dados",
};

export const DEFAULT_DATA_SCOPE: Record<UserRole, DataScope> = {
  ADMIN: "ALL",
  DIRECTOR: "COMPANY",
  MANAGER: "SQUAD",
  AGENT: "OWN",
};

export interface RoleCapabilities {
  can_access_all_companies: boolean;
  can_manage_company_settings: boolean;
  can_create_users: boolean;
  can_assign_licenses: boolean;
  can_manage_squads: boolean;
  can_view_all_company_data: boolean;
  can_view_squad_data: boolean;
  can_manage_features: boolean;
}

export const ROLE_CAPABILITIES: Record<UserRole, RoleCapabilities> = {
  ADMIN: {
    can_access_all_companies: true,
    can_manage_company_settings: true,
    can_create_users: true,
    can_assign_licenses: true,
    can_manage_squads: true,
    can_view_all_company_data: true,
    can_view_squad_data: true,
    can_manage_features: true,
  },
  DIRECTOR: {
    can_access_all_companies: false,
    can_manage_company_settings: true,
    can_create_users: true,
    can_assign_licenses: true,
    can_manage_squads: true,
    can_view_all_company_data: true,
    can_view_squad_data: true,
    can_manage_features: false,
  },
  MANAGER: {
    can_access_all_companies: false,
    can_manage_company_settings: false,
    can_create_users: true,
    can_assign_licenses: false,
    can_manage_squads: true,
    can_view_all_company_data: false,
    can_view_squad_data: true,
    can_manage_features: false,
  },
  AGENT: {
    can_access_all_companies: false,
    can_manage_company_settings: false,
    can_create_users: false,
    can_assign_licenses: false,
    can_manage_squads: false,
    can_view_all_company_data: false,
    can_view_squad_data: false,
    can_manage_features: false,
  },
};
