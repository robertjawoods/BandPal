
import NextAuth from "next-auth"
import prisma from "./lib/prisma"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  })],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    createUser: async (message) => {
      const object = {
        id: message.user.id,
        name: message.user.name,
        email: message.user.email,
      }

      try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/webhooks/create/user`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object),
        });
      }
      catch (err) {
        console.error(`An error occurred while indexing user:`, err)
      }
    }
  }
})