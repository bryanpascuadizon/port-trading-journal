import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./lib/utils";
import prisma from "./db/prisma";

export const config = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) return null;

        const credentials_username = credentials.username as string;
        const credentials_password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            username: credentials_username,
          },
        });

        if (!user) return null;

        const isVerified = await verifyPassword(
          credentials_password,
          user.hashedPassword!
        );

        if (!isVerified) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      //console.log("SESSION CALLBACK: ", session, token);
      session.user.id = token.sub;
      session.user.name = token.name;
      return session;
    },
    async jwt({ user, token }: any) {
      //console.log("JWT CALLBACK: ", token, user);
      if (user) {
        token.id = user.id;
        token.name = user.name || user.email?.split("@")[0] || "User";
        token.email = user.email;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
