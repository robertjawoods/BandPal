export const dynamic = 'force-dynamic' // defaults to auto

import prisma from "@/app/lib/prisma"
//import { createClient } from "@/app/lib/supabase/server";
import { Prisma } from '@prisma/client';

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
            profile: {
                include: {
                    influences: true,
                    role: true,
                },
            },
            bands: true,
        },
    });


    return Response.json(user, { status: 200 })
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const data = (await request.json()) as Prisma.UserUpdateInput;

    if (!params.id) {
        return Response.json({ message: "User ID is required" }, { status: 400 });
    }

    const profile = await prisma.profile.findFirst({
        where: {
            userId: params.id,
        },
    });

    if (!profile) {
        return Response.json({message: "Profile not found"}, { status: 404 });
    }

    console.log("Updating user", params.id, data);  

    try {
        const updated = await prisma.user.update({
            where: { id: params.id },
            data,
        });

        return Response.json(updated, { status: 200 });
    } catch (error) {
        console.error("An error occurred while updating user:", error);
        return Response.json({ message: "Failed to update user" }, { status: 500 });
    }
}

