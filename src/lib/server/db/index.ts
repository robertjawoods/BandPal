import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { readReplicas } from '@prisma/extension-read-replicas'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaNeon({ connectionString })

export const prisma = globalForPrisma.prisma || new PrismaClient()
    .$extends(withAccelerate())
    .$extends(readReplicas({
        url: [process.env.DATABASE_READ_URL || '']
    }));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
