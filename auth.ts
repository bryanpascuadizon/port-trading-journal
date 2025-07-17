import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./lib/utils";

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
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials.email === null || credentials.password === null)
          return null;

        const credentials_email = credentials.email as string;
        const credentials_password = credentials.password as string;

        /**
         * query your database with your credentials here using credentials_email...
         * credentials should be saved in the database with hashed password.
         * do not forget to hash your password using hashedPassword() before saving credentials in the db.
         **/

        //This is a sample user object that represents the returned user from your database query
        const user = {
          email: "admin@gmail.com",
          password:
            "b151a43cce273df0aa8f651d6f6eeca9:97f7bce545f02c54056f49c6fda1d1afaa77f7b8c03607527a04f5ef0bc81e32b5b30e78b483311e58b4eaae904eaf28522b401e336834617937c00336ebce0a",
          //this hashed password equates to: qwerty
        };

        const isVerified = await verifyPassword(
          credentials_password,
          user.password
        );

        //vertify database password with credentials_password
        if (!isVerified) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      console.log("SESSION CALLBACK: ", session, token);
      session.user.id = token.sub;
      session.user.name = token.name;
      return session;
    },
    async jwt({ user, token }: any) {
      console.log("JWT CALLBACK: ", token, user);
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
