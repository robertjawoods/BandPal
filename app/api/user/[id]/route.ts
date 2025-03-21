export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma"
import { Prisma } from "@prisma/client";

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    if (!params.id) {
        return Response.error()
    }

    const user = await prisma?.user.findFirst({
        where: {
            id: params.id,
        },
        include: {
            profile: true,
            bands: true,
        },
    });


    return Response.json(user, { status: 200 })
}


export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const data: Prisma.UserUpdateArgs = {
        where: {
            id: params.id,
        },
        data: await request.json(),
    };


    try {
        const updated = await prisma?.user.update(data)

        console.log(updated)

        return Response.json({}, { status: 200 })
    } catch (error) {
        console.error(`An error occurred while updating user:`, error)

        return Response.json({ error }, { status: 500 })
    }
}