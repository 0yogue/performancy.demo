import { LicenseType } from "@prisma/client";
import prisma from "@/lib/db";
import { BASE_FEATURES_BY_LICENSE } from "./types";

/**
 * Check if a license type has access to a specific feature
 * First checks database configuration, falls back to base features
 */
export async function license_has_feature(
  license_type: LicenseType,
  feature_code: string
): Promise<boolean> {
  // Check database configuration first
  const db_config = await prisma.licenseFeature.findUnique({
    where: {
      license_type_feature_id: {
        license_type,
        feature_id: feature_code,
      },
    },
    include: {
      feature: true,
    },
  });

  if (db_config) {
    return db_config.enabled && db_config.feature.is_active;
  }

  // Fallback to base features
  const base_features = BASE_FEATURES_BY_LICENSE[license_type] || [];
  return base_features.includes(feature_code);
}

/**
 * Get all features available for a license type
 */
export async function get_license_features(
  license_type: LicenseType
): Promise<string[]> {
  // Get from database
  const db_features = await prisma.licenseFeature.findMany({
    where: {
      license_type,
      enabled: true,
      feature: {
        is_active: true,
      },
    },
    include: {
      feature: true,
    },
  });

  if (db_features.length > 0) {
    return db_features.map((lf) => lf.feature.code);
  }

  // Fallback to base features
  return BASE_FEATURES_BY_LICENSE[license_type] || [];
}

/**
 * Check if user has access to a feature based on their license
 */
export async function user_has_feature(
  user_id: string,
  feature_code: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    select: { license_type: true },
  });

  if (!user) return false;

  return license_has_feature(user.license_type, feature_code);
}
