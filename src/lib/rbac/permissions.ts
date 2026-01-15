import { UserRole, DataScope } from "@prisma/client";
import prisma from "@/lib/db";
import type { ActionType, FeaturePermission, SessionUser } from "@/types";
import { ROLE_HIERARCHY, ROLE_CAPABILITIES, DEFAULT_DATA_SCOPE } from "./types";

/**
 * Check if a role has at least the level of another role
 */
export function role_at_least(role: UserRole, minimum: UserRole): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minimum];
}

/**
 * Check if user can create other users
 */
export function can_create_user(role: UserRole): boolean {
  return ROLE_CAPABILITIES[role].can_create_users;
}

/**
 * Check if user can assign licenses
 */
export function can_assign_licenses(role: UserRole): boolean {
  return ROLE_CAPABILITIES[role].can_assign_licenses;
}

/**
 * Check if user can manage company settings
 */
export function can_manage_company_settings(role: UserRole): boolean {
  return ROLE_CAPABILITIES[role].can_manage_company_settings;
}

/**
 * Check if user can manage features (ADMIN only)
 */
export function can_manage_features(role: UserRole): boolean {
  return ROLE_CAPABILITIES[role].can_manage_features;
}

/**
 * Check if user can access all companies (ADMIN only)
 */
export function can_access_all_companies(role: UserRole): boolean {
  return ROLE_CAPABILITIES[role].can_access_all_companies;
}

/**
 * Get the data scope for a user's role
 */
export function get_default_data_scope(role: UserRole): DataScope {
  return DEFAULT_DATA_SCOPE[role];
}

/**
 * Get feature permission for a specific role
 */
export async function get_role_feature_permission(
  feature_code: string,
  role: UserRole
): Promise<FeaturePermission | null> {
  const feature = await prisma.feature.findUnique({
    where: { code: feature_code },
    include: {
      role_permissions: {
        where: { role },
      },
    },
  });

  if (!feature || !feature.is_active) return null;

  const permission = feature.role_permissions[0];

  if (!permission) {
    // Return default permissions based on role
    return {
      can_create: role_at_least(role, "MANAGER"),
      can_read: true,
      can_update: role_at_least(role, "MANAGER"),
      can_delete: role_at_least(role, "DIRECTOR"),
      visibility: DEFAULT_DATA_SCOPE[role],
    };
  }

  return {
    can_create: permission.can_create,
    can_read: permission.can_read,
    can_update: permission.can_update,
    can_delete: permission.can_delete,
    visibility: permission.visibility,
  };
}

/**
 * Check if user can perform an action on a feature
 */
export async function can_perform_action(
  user: SessionUser,
  feature_code: string,
  action: ActionType
): Promise<boolean> {
  const permission = await get_role_feature_permission(feature_code, user.role);

  if (!permission) return false;

  switch (action) {
    case "create":
      return permission.can_create;
    case "read":
      return permission.can_read;
    case "update":
      return permission.can_update;
    case "delete":
      return permission.can_delete;
    default:
      return false;
  }
}

/**
 * Get the data visibility scope for a user on a feature
 */
export async function get_user_data_scope(
  user: SessionUser,
  feature_code: string
): Promise<DataScope> {
  const permission = await get_role_feature_permission(feature_code, user.role);
  return permission?.visibility || DEFAULT_DATA_SCOPE[user.role];
}

/**
 * Build where clause for data filtering based on user's scope
 */
export function build_scope_filter(
  user: SessionUser,
  scope: DataScope
): Record<string, unknown> {
  switch (scope) {
    case "ALL":
      return {};
    case "COMPANY":
      return { company_id: user.company_id };
    case "SQUAD":
      return {
        OR: [
          { user_id: user.id },
          { squad_id: user.squad_id },
        ],
      };
    case "OWN":
      return { user_id: user.id };
    default:
      return { user_id: user.id };
  }
}
