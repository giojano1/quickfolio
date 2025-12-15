import prisma from "@/lib/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub ?? "";
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? "";
        session.user.image = token.picture ?? null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
