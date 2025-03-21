export const dynamic = 'force-dynamic' // defaults to auto

// import algoliasearch from "algoliasearch"
// import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"


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