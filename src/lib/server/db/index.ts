import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient()
    .$extends(readReplicas({
        url: [process.env.DATABASE_READ_URL || '']
     }));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
