export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma"
//import { createClient } from "@/app/lib/supabase/server";
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

    // const supabase = await createClient();

    // const { data: session } = await supabase.auth.getUser();

    // console.log(session)

    // if (!session || (session.user?.id !== params.id)) {
    //     return Response.json({ message: "Unauthorized" }, { status: 403 });
    // }

    const data: Prisma.UserUpdateArgs = {
        where: {
            id: params.id,
        },
        data: await request.json(),
    };

    try {
        const updated = await prisma?.user.update(data)

        return Response.json(updated, { status: 200 })
    } catch (error) {
        console.error(`An error occurred while updating user:`, error)

        return Response.json({ message: "Failed to update user" }, { status: 500 })
    }
}