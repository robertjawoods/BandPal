export const dynamic = 'force-dynamic' // defaults to auto

// import algoliasearch from "algoliasearch"
// import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"


export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    if (!params.id) {
        return Response.error()
    }

    console.log('id', params.id);

    const newBio = await request.json()

    await prisma?.profile.update({
        where: {
            userId: params.id,
        },
        data: {
            bio: newBio.bio,
        },
    });

    return Response.json({}, { status: 200 })
}   