
import NextAuth from "next-auth"
import prisma from "./lib/prisma"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client/extension"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  debug: process.env.NODE_ENV === "development",
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  })],
  adapter: PrismaAdapter(prisma as PrismaClient),
  callbacks: {
    session: async ({ session, user }) => {
      console.log("session", session)
      console.log("user", user)

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
        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            id: message.user.id,
          },
        });

        if (user) {
          return;
        }

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