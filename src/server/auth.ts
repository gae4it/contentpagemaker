import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "@/server/db";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isGuest?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isGuest?: boolean;
  }
}

const GUEST_USER_ID = "guest-user-shared-account";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: {},
      async authorize() {
        // Guest user is created via database migration
        // Return the guest user object
        return {
          id: GUEST_USER_ID,
          email: "guest@contentpagemaker.local",
          name: "Guest User",
          isGuest: true,
        };
      },
    }),
    ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? [
          GitHub({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isGuest = user.isGuest ?? false;
      }
      return token;
    },
    session: ({ session, token, user }) => {
      const isGuest = (token?.isGuest as boolean | undefined) ?? false;
      return {
        ...session,
        user: {
          ...session.user,
          id: isGuest
            ? (token.id as string)
            : (user?.id ?? (token.id as string)),
          isGuest: isGuest,
        },
      } as typeof session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt" as const,
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
