import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/db";
import type { SessionUser } from "@/types";

const login_schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = login_schema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            company: {
              select: { slug: true },
            },
          },
        });

        if (!user || !user.password_hash) return null;

        const is_valid = await bcrypt.compare(password, user.password_hash);
        if (!is_valid) return null;

        if (user.status !== "ACTIVE") return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          license_type: user.license_type,
          company_id: user.company_id,
          company_slug: user.company?.slug,
          squad_id: user.squad_id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const db_user = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            company: {
              select: { slug: true },
            },
          },
        });

        if (db_user) {
          token.id = db_user.id;
          token.role = db_user.role;
          token.license_type = db_user.license_type;
          token.company_id = db_user.company_id;
          token.company_slug = db_user.company?.slug;
          token.squad_id = db_user.squad_id;
        }
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const user = session.user as unknown as SessionUser;
        user.id = token.id as string;
        user.role = token.role as SessionUser["role"];
        user.license_type = token.license_type as SessionUser["license_type"];
        user.company_id = token.company_id as string | null;
        user.company_slug = token.company_slug as string | null;
        user.squad_id = token.squad_id as string | null;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      // For OAuth providers, check if user exists or create
      if (user.email) {
        const existing_user = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existing_user) {
          // Create new user with default settings
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || user.email.split("@")[0],
              image: user.image,
              status: "ACTIVE",
              role: "AGENT",
              license_type: "AUTO_CRM",
            },
          });
        }
      }

      return true;
    },
  },
});

export async function get_session_user(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user) return null;
  return session.user as SessionUser;
}
