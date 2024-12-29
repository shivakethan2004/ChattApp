// import type {NextAuthOptionsfrom "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { db } from "./app/lib/db";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: UpstashRedisAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // Forces the account selection screen to show
        },
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await db.get(`user:${token.id}`)) as User | null;
      //  console.log('helllo', token)
      if (!dbUser) {
        token.id = user!.id ?? "defaultId";

        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ session, token }) {
      if (token) {
        (session.user.id = token.id),
          (session.user.email = token!.email ?? "default"),
          (session.user.name = token.name),
          (session.user.image = token.picture);
      }

      return session;
    },

    redirect() {
      return "/dashbord";
    },
  },
});
