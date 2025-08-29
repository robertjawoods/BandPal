import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import type { Handle } from '@sveltejs/kit';


// Extend the Session type to include profileId
declare module '@auth/core/types' {
    interface Session {
        profileId?: string | null;
    }
}

let authInstance: ReturnType<typeof SvelteKitAuth>;

function getAuth(prisma: PrismaClient) {
    return SvelteKitAuth({
        adapter: PrismaAdapter(prisma),
        trustHost: true,
        providers: [Google],
        callbacks: {
            session: async ({ session, user }) => {
                session.user.id = user.id;

                const profile = await prisma.profile.findFirst({
                    where: { userId: user.id }
                });

                session.profileId = profile?.id ?? null;
                return session;
            }
        }
    })
}

export const handle: Handle = async ({ event, resolve }) => {
    const connStr = event.platform?.env?.HYPERDRIVE?.connectionString;
    if (!connStr) throw new Error('Missing HYPERDRIVE binding');

    // attach Prisma per request
    const adapter = new PrismaPg({ connectionString: connStr });
    const prisma = new PrismaClient({ adapter });

    const auth = getAuth(prisma);

    event.locals.authHelpers = {
        signIn: auth.signIn,
        signOut: auth.signOut,
    }

    event.locals.prisma = prisma;

    return auth.handle({ event, resolve });
}