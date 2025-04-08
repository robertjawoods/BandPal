import { Prisma } from "@prisma/client";

export type BandWithMembers = Prisma.BandGetPayload<{
    include: {
        members: true,
        admin: true,
    }
}>;