export const dynamic = 'force-dynamic' // defaults to auto

// import algoliasearch from "algoliasearch"
// import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"

interface UserUpdateArgs { 
    name: string;
    bio: string;
    location: string;
    influences: {
        name: string;
        id: string;
    }[];
    
}


export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    if (!params.id) {
        return Response.error()
    }

    const data = await req.json() as UserUpdateArgs;

    const user = await prisma?.user.update({
        where: {
            id: params.id,
        },
        data: {
            name: data.name,
            profile: {
                update: {
                    bio: data.bio,
                    location: data.location,
                    influences: {
                        connectOrCreate: data.influences.map(influence => ({
                            where: { name: influence.name, id: influence.id },
                            create: influence
                        }))
                    }
                }
            },
        },
    });


    return Response.json(user, { status: 200 })
}   