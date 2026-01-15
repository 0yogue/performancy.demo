import { PrismaClient } from "@prisma/client";

const global_for_prisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  global_for_prisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global_for_prisma.prisma = prisma;
}

export default prisma;
