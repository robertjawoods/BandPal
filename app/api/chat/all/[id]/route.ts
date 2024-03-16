export const dynamic = 'force-dynamic' // defaults to auto

// import algoliasearch from "algoliasearch"
// import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma"


export async function GET(request: Request, { params }: { params: { id: string } }) {
    if (!params.id) {
        return Response.error()
    }

    console.log('id', params.id);

    const chats = await prisma?.chat.findMany({
        where: {
            members: {
                some: {
                    id: params.id,
                },
            },
        },
        include: {
            members: true,
            messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            }
        },
    });

    console.log(chats);

    return Response.json(chats, { status: 200 })
}   