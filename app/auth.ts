
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
})