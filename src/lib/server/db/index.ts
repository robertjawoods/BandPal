import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { readReplicas } from '@prisma/extension-read-replicas'
import type { Hyperdrive } from '@cloudflare/workers-types';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };


// Helper to get connection string in both environments
function getConnectionString(env?: Env) {
    if (env?.HYPERDRIVE?.connectionString) {
        return env.HYPERDRIVE.connectionString;
    }
    return process.env.DATABASE_URL;
}

export interface Env {
    HYPERDRIVE: Hyperdrive;
}
const adapter = new PrismaPg({ connectionString: getConnectionString()});

export const prisma = globalForPrisma.prisma || new PrismaClient({adapter})
    .$extends(readReplicas({
        url: [process.env.DATABASE_READ_URL || '']
    }));



if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
