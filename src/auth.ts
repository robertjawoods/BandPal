import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import { prisma } from "./lib/server/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

// Extend the Session type to include profileId
declare module "@auth/core/types" {
    interface Session { 
        profileId?: string | null;
    }
}


export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    callbacks: {
        session: async ({ session, user }) => {
            session.user.id = user.id

            const profile = await prisma.profile.findFirst({
                where: {
                    userId: user.id
                }
            });

            session.profileId = profile?.id ?? null

            return session
        }
    }
})