import type { UserRole, LicenseType, DataScope, UserStatus } from "@prisma/client";

export type { UserRole, LicenseType, DataScope, UserStatus };

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: UserRole;
  license_type: LicenseType;
  company_id?: string | null;
  company_slug?: string | null;
  squad_id?: string | null;
}

export interface FeaturePermission {
  can_create: boolean;
  can_read: boolean;
  can_update: boolean;
  can_delete: boolean;
  visibility: DataScope;
}

export interface MenuItem {
  code: string;
  name: string;
  path: string;
  icon: string;
  order: number;
}

export type ActionType = "create" | "read" | "update" | "delete";
