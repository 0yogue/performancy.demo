import prisma from "@/lib/db";
import type { LicenseType, UserRole } from "@prisma/client";
import type { MenuItem, SessionUser } from "@/types";

/**
 * Get menu items for a user based on their license and role
 */
export async function get_user_menu(user: SessionUser): Promise<MenuItem[]> {
  // Get all features enabled for user's license
  const license_features = await prisma.licenseFeature.findMany({
    where: {
      license_type: user.license_type,
      enabled: true,
      feature: {
        is_active: true,
      },
    },
    include: {
      feature: true,
    },
    orderBy: {
      feature: {
        menu_order: "asc",
      },
    },
  });

  // Get role permissions for each feature
  const menu_items: MenuItem[] = [];

  for (const lf of license_features) {
    const permission = await prisma.roleFeaturePermission.findUnique({
      where: {
        feature_id_role: {
          feature_id: lf.feature.id,
          role: user.role,
        },
      },
    });

    // Only show menu item if user has read permission
    if (permission?.can_read !== false && lf.feature.menu_path) {
      menu_items.push({
        code: lf.feature.code,
        name: lf.feature.name,
        path: lf.feature.menu_path,
        icon: lf.feature.menu_icon || "Circle",
        order: lf.feature.menu_order,
      });
    }
  }

  return menu_items;
}

/**
 * Get all available features for admin panel
 */
export async function get_all_features() {
  return prisma.feature.findMany({
    orderBy: { menu_order: "asc" },
    include: {
      license_features: true,
      role_permissions: true,
    },
  });
}

/**
 * Update feature enabled status for a license type
 */
export async function update_license_feature(
  license_type: LicenseType,
  feature_id: string,
  enabled: boolean
) {
  return prisma.licenseFeature.upsert({
    where: {
      license_type_feature_id: {
        license_type,
        feature_id,
      },
    },
    update: { enabled },
    create: {
      license_type,
      feature_id,
      enabled,
    },
  });
}

/**
 * Update role permission for a feature
 */
export async function update_role_permission(
  feature_id: string,
  role: UserRole,
  data: {
    can_create?: boolean;
    can_read?: boolean;
    can_update?: boolean;
    can_delete?: boolean;
    visibility?: "ALL" | "COMPANY" | "SQUAD" | "OWN";
  }
) {
  return prisma.roleFeaturePermission.upsert({
    where: {
      feature_id_role: {
        feature_id,
        role,
      },
    },
    update: data,
    create: {
      feature_id,
      role,
      can_create: data.can_create ?? false,
      can_read: data.can_read ?? true,
      can_update: data.can_update ?? false,
      can_delete: data.can_delete ?? false,
      visibility: data.visibility ?? "OWN",
    },
  });
}
