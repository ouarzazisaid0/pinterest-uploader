// src/app/api/auth/[...nextauth]/route.ts
 
import GoogleProvider from "next-auth/providers/google";
import PinterestProvider from "next-auth/providers/pinterest";

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    provider?: string;
  }

  interface User extends DefaultUser {
    accessToken?: string;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    PinterestProvider({
      clientId: process.env.PINTEREST_APP_ID!,
      clientSecret: process.env.PINTEREST_APP_SECRET!,
      authorization: {
        params: {
          scope: "boards:read,pins:read,pins:write",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
});

export { handler as GET, handler as POST };