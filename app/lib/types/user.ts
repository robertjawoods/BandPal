import { Prisma } from "@prisma/client";

export type UserWithProfile = Prisma.UserGetPayload<{
    include: {
        profile: {
            include: {
                influences: true,
                role: true,
            },
        },
        bands: true,
    }
}>;